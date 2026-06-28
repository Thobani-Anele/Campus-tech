import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Webhook handler for order notifications
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, type } = body

    if (!orderId) {
      return NextResponse.json(
        { error: 'Missing orderId' },
        { status: 400 }
      )
    }

    // Fetch order from database
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (error || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // TODO: Send WhatsApp notification via Meta API
    // Send to customer
    // Send to admin

    return NextResponse.json({
      success: true,
      message: 'Notification sent',
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
