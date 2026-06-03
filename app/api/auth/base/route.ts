import { NextResponse } from 'next/server'

export async function GET() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.BASE_CLIENT_ID!,
    redirect_uri: process.env.BASE_REDIRECT_URI!,
    scope: 'read_items',
  })
  return NextResponse.redirect(
    `https://api.thebase.in/1/oauth/authorize?${params.toString()}`
  )
}
