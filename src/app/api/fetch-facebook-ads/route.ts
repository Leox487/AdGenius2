import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { platform, product, category } = await req.json();

  const prompt = `
Write a ${platform} ad for a product called "${product}" in the category "${category}".
Then, analyze why this ad would be effective for its target audience.
Format your response as:
Ad: [ad text]
Analysis: [analysis]
`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an expert ad copywriter and analyst.' },
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
    const content = data.choices?.[0]?.message?.content || '';
    const [adText, analysis] = content.split('Analysis:');
    return NextResponse.json({
      ad: adText?.replace('Ad:', '').trim(),
      analysis: analysis?.trim(),
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate ad.' }, { status: 500 });
  }
}