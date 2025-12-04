import { NextResponse } from 'next/server'
import { supabase } from '@/supabase/client'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Errore Supabase campaigns (GET):', error)
      // Non spezziamo il frontend: ritorniamo lista vuota ma con info errore
      return NextResponse.json(
        { ok: true, campaigns: [], warning: error.message },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { ok: true, campaigns: data ?? [] },
      { status: 200 }
    )
  } catch (err: any) {
    console.error('Errore generale API /api/campaigns (GET):', err)
    return NextResponse.json(
      { ok: true, campaigns: [], warning: String(err?.message ?? err) },
      { status: 200 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, channel, objective, daily_budget_eur } = body

    if (!name || !channel || !objective) {
      return NextResponse.json(
        { ok: false, error: 'Dati campagna incompleti' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('campaigns')
      .insert({
        name,
        channel,
        objective,
        daily_budget_eur: Number(daily_budget_eur ?? 0),
        status: 'active',
      })
      .select('*')
      .single()

    if (error) {
      console.error('Errore Supabase campaigns (POST):', error)
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, campaign: data }, { status: 200 })
  } catch (err: any) {
    console.error('Errore generale API /api/campaigns (POST):', err)
    return NextResponse.json(
      { ok: false, error: String(err?.message ?? err) },
      { status: 500 }
    )
  }
}
