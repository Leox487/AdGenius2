import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const {
      adTitle,
      adCopy,
      adSnippet,
      platform,
      industry,
      successFactors,
      whySuccessful,
      ctr,
      conversionRate,
      costPerClick
    } = await req.json();

    if (!adTitle || !adCopy) {
      return NextResponse.json({ error: 'Ad title and copy are required.' }, { status: 400 });
    }

    // Generate AI analysis based on the ad data
    const analysis = await generateAdAnalysis({
      adTitle,
      adCopy,
      adSnippet,
      platform,
      industry,
      successFactors,
      whySuccessful,
      ctr,
      conversionRate,
      costPerClick
    });

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Ad analysis error:', error);
    return NextResponse.json({
      error: 'Failed to analyze ad. Please try again.'
    }, { status: 500 });
  }
}

async function generateAdAnalysis(adData: any): Promise<string> {
  // This would typically call an AI service like OpenAI
  // For now, we'll generate a comprehensive analysis based on the data
  
  const {
    adTitle,
    adCopy,
    adSnippet,
    platform,
    industry,
    successFactors,
    whySuccessful,
    ctr,
    conversionRate,
    costPerClick
  } = adData;

  let analysis = `## Ad Performance Analysis\n\n`;

  // Performance Assessment
  analysis += `### Performance Metrics\n`;
  analysis += `- **Click-Through Rate (CTR):** ${ctr.toFixed(1)}% - ${getCTRAssessment(ctr)}\n`;
  analysis += `- **Conversion Rate:** ${conversionRate.toFixed(1)}% - ${getConversionAssessment(conversionRate)}\n`;
  analysis += `- **Cost Per Click (CPC):** $${costPerClick.toFixed(2)} - ${getCPCAssessment(costPerClick)}\n\n`;

  // Content Analysis
  analysis += `### Content Analysis\n`;
  analysis += `**Headline:** "${adTitle}"\n`;
  analysis += `${analyzeHeadline(adTitle)}\n\n`;
  
  analysis += `**Ad Copy:** "${adCopy}"\n`;
  analysis += `${analyzeAdCopy(adCopy)}\n\n`;

  // Success Factors
  analysis += `### Key Success Factors\n`;
  successFactors.forEach((factor: string, index: number) => {
    analysis += `${index + 1}. **${factor}** - ${explainSuccessFactor(factor, platform)}\n`;
  });
  analysis += `\n`;

  // Why It Works
  analysis += `### Why This Ad Works\n`;
  analysis += `${whySuccessful}\n\n`;

  // Platform-Specific Insights
  analysis += `### ${platform.charAt(0).toUpperCase() + platform.slice(1)} Platform Insights\n`;
  analysis += `${getPlatformInsights(platform, industry)}\n\n`;

  // Recommendations
  analysis += `### Recommendations for Similar Ads\n`;
  analysis += `${generateRecommendations(adData)}\n\n`;

  // Competitive Analysis
  analysis += `### Competitive Positioning\n`;
  analysis += `${analyzeCompetitivePosition(adData)}\n`;

  return analysis;
}

function getCTRAssessment(ctr: number): string {
  if (ctr >= 5) return "Excellent - Above industry average";
  if (ctr >= 3) return "Good - Competitive performance";
  if (ctr >= 1) return "Average - Room for improvement";
  return "Below average - Needs optimization";
}

function getConversionAssessment(rate: number): string {
  if (rate >= 5) return "Outstanding - High converting";
  if (rate >= 2) return "Good - Above average";
  if (rate >= 1) return "Average - Typical performance";
  return "Below average - Optimization needed";
}

function getCPCAssessment(cpc: number): string {
  if (cpc <= 1) return "Very efficient - Low cost";
  if (cpc <= 3) return "Reasonable - Competitive";
  if (cpc <= 5) return "Moderate - Acceptable";
  return "High - Consider optimization";
}

function analyzeHeadline(headline: string): string {
  const words = headline.split(' ').length;
  const hasNumber = /\d/.test(headline);
  const hasQuestion = headline.includes('?');
  const hasUrgency = /(now|today|limited|urgent|quick|fast)/i.test(headline);
  
  let analysis = "";
  if (words <= 5) analysis += "Concise and impactful. ";
  else if (words <= 8) analysis += "Good length for engagement. ";
  else analysis += "Consider shortening for better impact. ";
  
  if (hasNumber) analysis += "Numbers add credibility. ";
  if (hasQuestion) analysis += "Question format increases engagement. ";
  if (hasUrgency) analysis += "Urgency creates action motivation. ";
  
  return analysis;
}

function analyzeAdCopy(copy: string): string {
  const hasCTA = /(buy|shop|get|order|click|learn|sign|start)/i.test(copy);
  const hasBenefit = /(save|earn|gain|improve|better|best|quality)/i.test(copy);
  const hasSocialProof = /(customers|users|people|reviews|testimonials)/i.test(copy);
  
  let analysis = "";
  if (hasCTA) analysis += "Clear call-to-action present. ";
  else analysis += "Consider adding a stronger CTA. ";
  
  if (hasBenefit) analysis += "Benefits clearly communicated. ";
  if (hasSocialProof) analysis += "Social proof elements included. ";
  
  return analysis;
}

function explainSuccessFactor(factor: string, platform: string): string {
  const explanations: { [key: string]: string } = {
    "Search intent optimization": "Matches what users are actively searching for",
    "Clear value proposition": "Communicates unique benefits clearly",
    "Relevant keywords": "Uses terms your audience actually searches",
    "Strong call-to-action": "Drives immediate user action",
    "Emotional storytelling": "Creates emotional connection with audience",
    "Visual appeal": "Attractive imagery that captures attention",
    "Community engagement": "Encourages social interaction and sharing",
    "Targeted audience": "Reaches the right people at the right time",
    "Competitive positioning": "Differentiates from competitors effectively",
    "Market analysis": "Based on real market data and trends",
    "Keyword optimization": "Optimized for search engine visibility",
    "Performance tracking": "Data-driven optimization approach",
    "Data-driven insights": "Leverages analytics for better performance",
    "Performance optimization": "Continuously improved based on results",
    "Market intelligence": "Uses competitive and market data",
    "Strategic positioning": "Positioned for maximum impact"
  };
  
  return explanations[factor] || "Contributes to overall ad success";
}

function getPlatformInsights(platform: string, industry: string): string {
  const insights: { [key: string]: string } = {
    "google": "Google Ads excels with search intent and keyword optimization. This ad likely performs well due to strong keyword relevance and clear value proposition.",
    "facebook": "Facebook's strength lies in audience targeting and visual storytelling. This ad succeeds through emotional connection and community engagement.",
    "instagram": "Instagram prioritizes visual appeal and influencer-style content. Success comes from aesthetic quality and authentic storytelling.",
    "tiktok": "TikTok thrives on creative, entertaining content. Viral potential comes from trend alignment and user-generated content style."
  };
  
  return insights[platform] || "Platform-specific optimization contributes to performance.";
}

function generateRecommendations(adData: any): string {
  const { platform, industry, ctr, conversionRate } = adData;
  
  let recommendations = "";
  
  if (ctr < 3) {
    recommendations += "• Test different headlines with stronger emotional triggers\n";
    recommendations += "• Improve ad relevance to search intent\n";
  }
  
  if (conversionRate < 2) {
    recommendations += "• Optimize landing page experience\n";
    recommendations += "• Add more social proof elements\n";
  }
  
  recommendations += "• A/B test different ad formats\n";
  recommendations += "• Refine audience targeting parameters\n";
  recommendations += "• Monitor competitor strategies\n";
  
  return recommendations;
}

function analyzeCompetitivePosition(adData: any): string {
  const { platform, industry, ctr, conversionRate, costPerClick } = adData;
  
  let analysis = "";
  
  if (ctr > 4 && conversionRate > 3) {
    analysis += "This ad is performing above industry standards, indicating strong competitive positioning. ";
  } else if (ctr > 2 && conversionRate > 1) {
    analysis += "Competitive performance with room for optimization. ";
  } else {
    analysis += "Below competitive benchmarks - consider strategic improvements. ";
  }
  
  analysis += `In the ${industry} industry on ${platform}, this represents ${getCompetitiveLevel(ctr, conversionRate)} performance.`;
  
  return analysis;
}

function getCompetitiveLevel(ctr: number, conversionRate: number): string {
  if (ctr > 5 && conversionRate > 4) return "top-tier";
  if (ctr > 3 && conversionRate > 2) return "above-average";
  if (ctr > 1 && conversionRate > 1) return "average";
  return "below-average";
} 