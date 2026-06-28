import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Vercel Cron Job - runs daily to check for low stock
export async function GET(req: NextRequest) {
  // Verify it's a Cron call from Vercel
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    // Get site settings for low stock threshold
    const { data: settings } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'low_stock_threshold')
      .single()

    const threshold = parseInt(settings?.value || '5')

    // Find products below threshold
    const { data: lowStockProducts, error } = await supabase
      .from('products')
      .select('*')
      .lt('stock_quantity', threshold)
      .eq('is_out_of_stock', false)

    if (error) throw error

    if (lowStockProducts && lowStockProducts.length > 0) {
      // TODO: Send email notification via Resend
      // TODO: Send WhatsApp notification to admin

      return NextResponse.json({
        success: true,
        message: `Found ${lowStockProducts.length} low stock items`,
        products: lowStockProducts,
      })
    }

    return NextResponse.json({
      success: true,
      message: 'No low stock items',
    })
  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      { error: 'Failed to run cron job' },
      { status: 500 }
    )
  }
}
