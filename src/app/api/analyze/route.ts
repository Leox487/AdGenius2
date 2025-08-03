import { NextRequest, NextResponse } from 'next/server';

console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

export async function POST(req: NextRequest) {
  const { product, platform, campaign } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API key not set.' }, { status: 500 });
  }

  const prompt = `You are an expert ad analyst. Analyze the following ad campaign for a product and provide suggestions for improvement.\n\nProduct: ${product}\nPlatform: ${platform}\nCampaign Details: ${campaign}\n\nAnalysis:`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an expert ad analyst.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 300,
      }),
    });

    if (!openaiRes.ok) {
      const error = await openaiRes.text();
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await openaiRes.json();
    const aiMessage = data.choices?.[0]?.message?.content || 'No analysis generated.';
    return NextResponse.json({ analysis: aiMessage });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch analysis.' }, { status: 500 });
  }
} 