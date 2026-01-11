import Panel from "@/components/dashboard-meta/Panel";
import CampaignsTable from "@/components/dashboard-meta/CampaignsTable";

export default function CampaignsPage() {
  return (
    <main style={{ display:"grid", gap: 14 }}>
      <Panel
        title="Campagne"
        subtitle="Gestisci campagne, gruppi e annunci con UI stile Ads Manager (Meta-like)."
      >
        <CampaignsTable />
      </Panel>
    </main>
  );
}
