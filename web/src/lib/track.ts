type TrackPayload = Record<string, any>;

function getParam(name: string) {
  if (typeof window === "undefined") return null;
  const u = new URL(window.location.href);
  return u.searchParams.get(name);
}

function getUtm(name: string) {
  const v = getParam(name);
  return v ? v : null;
}

export async function track(event_name: string, payload: TrackPayload = {}) {
  if (typeof window === "undefined") return;

  const session_id =
    window.localStorage.getItem("aar_session_id") ||
    (() => {
      const id = crypto.randomUUID();
      window.localStorage.setItem("aar_session_id", id);
      return id;
    })();

  const body = {
    event_name,
    session_id,
    page: window.location.pathname,
    referrer: document.referrer || null,
    utm_source: getUtm("utm_source"),
    utm_medium: getUtm("utm_medium"),
    utm_campaign: getUtm("utm_campaign"),
    gclid: getParam("gclid"),
    payload,
  };

  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // silenzioso
  }
}
