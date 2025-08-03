import { NextRequest, NextResponse } from 'next/server';

console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

export async function POST(req: NextRequest) {
  const { adText } = await req.json();
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey) {
    return NextResponse.json({ error: 'OpenAI API key not set.' }, { status: 500 });
  }
  if (!adText) {
    return NextResponse.json({ error: 'No ad text provided.' }, { status: 400 });
  }

  const prompt = `You are an expert ad analyst. Here is the text content of an advertisement. Analyze what works well in this ad, why it is effective, and provide specific insights for marketers. Be detailed and actionable.\n\nAd Text:\n${adText}\n\nAnalysis:`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an expert ad analyst.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 350,
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