import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, productName, category, keywords } = body

    if (type === 'description') {
      // Generate product description
      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: `Write a punchy, premium 2-3 sentence product description for a ${category} called "${productName}"${keywords ? ` with these features: ${keywords}` : ''}. Target university students in South Africa who want quality tech at fair prices. Use a confident, modern tone without clichés.`,
          },
        ],
      })

      const description = message.content[0].type === 'text' ? message.content[0].text : ''

      return NextResponse.json({
        success: true,
        description,
      })
    }

    return NextResponse.json(
      { error: 'Invalid request type' },
      { status: 400 }
    )
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
