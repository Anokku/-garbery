import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }

  const res = await fetch('https://api.thebase.in/1/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.BASE_CLIENT_ID!,
      client_secret: process.env.BASE_CLIENT_SECRET!,
      redirect_uri: process.env.BASE_REDIRECT_URI!,
      code,
    }),
  })

  const data = await res.json()

  if (!data.refresh_token) {
    return new NextResponse('認証に失敗しました。もう一度お試しください。', { status: 400 })
  }

  return new NextResponse(
    `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><title>BASE認証完了</title>
<style>body{font-family:sans-serif;max-width:600px;margin:40px auto;padding:20px}
code{display:block;background:#f0f0f0;padding:12px;word-break:break-all;margin:12px 0;border-radius:4px}</style>
</head>
<body>
<h2>✅ BASE認証完了</h2>
<p>以下の <strong>refresh_token</strong> をコピーして、Vercelの環境変数 <code>BASE_REFRESH_TOKEN</code> に設定してください。</p>
<code>${data.refresh_token}</code>
<p>設定後、Vercelで再デプロイすれば商品データが表示されます。</p>
</body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}
