import { NextResponse } from 'next/server'
import { supabase } from '@/supabase/client'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('campaign_metrics')
      .select('*')
      .order('ts', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Errore Supabase campaign_metrics:', error)
      return NextResponse.json(
        {
          ok: false,
          error: 'Errore nel recupero delle metriche',
          detail: error.message,
          code: error.code,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ok: true,
      metrics: data ?? [],
    })
  } catch (err: any) {
    console.error('Errore generico API campaign-metrics:', err)
    return NextResponse.json(
      {
        ok: false,
        error: 'Errore generico API',
        detail: err?.message ?? 'unknown',
      },
      { status: 500 }
    )
  }
}
