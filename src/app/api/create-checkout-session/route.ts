import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-06-30.basil',
    })
  : null;

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  try {
    const { quantity, price } = await req.json();
    // Validate input
    if (!quantity || !price) {
      return NextResponse.json({ error: 'Missing quantity or price.' }, { status: 400 });
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `AdGenius Analyses (${quantity})`,
              description: `Unlock ${quantity} more ad analyses`,
            },
            unit_amount: price, // price in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/thank-you`,
      cancel_url: `${req.nextUrl.origin}/upgrade`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create checkout session.' }, { status: 500 });
  }
} 