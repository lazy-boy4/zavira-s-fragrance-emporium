import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { orderId, status, transactionId } = body;

        if (!orderId || !status) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const supabase = createAdminClient();

        // Update order status
        // Note: 'orders' table must exist from our migration
        const { error } = await supabase
            .from('orders')
            .update({
                payment_status: status === 'success' ? 'paid' : 'failed',
                payment_intent_id: transactionId,
                status: status === 'success' ? 'processing' : 'pending',
                updated_at: new Date().toISOString()
            })
            .eq('id', orderId);

        if (error) {
            console.error('Error updating order:', error);
            // In a real webhook, we might verify signature and retry logic.
            // For now, return 500 so client knows it failed.
            return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
