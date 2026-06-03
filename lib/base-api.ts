const BASE_API = 'https://api.thebase.in/1'

export type BaseItem = {
  item_id: string
  title: string
  detail: string
  price: number
  stock: number
  visible: number
  img1_origin: string
  img2_origin: string | null
}

async function getAccessToken(): Promise<string> {
  const res = await fetch(`${BASE_API}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.BASE_CLIENT_ID!,
      client_secret: process.env.BASE_CLIENT_SECRET!,
      refresh_token: process.env.BASE_REFRESH_TOKEN!,
    }),
    cache: 'no-store',
  })
  const data = await res.json()
  if (!data.access_token) throw new Error('Failed to get access token')
  return data.access_token
}

export async function getBaseItems(): Promise<BaseItem[]> {
  const token = await getAccessToken()
  const res = await fetch(`${BASE_API}/items?limit=20`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 },
  })
  const data = await res.json()
  return (data.items as BaseItem[]).filter((item) => item.visible === 1)
}

export function formatBasePrice(price: number): string {
  return `¥${price.toLocaleString('ja-JP')}`
}
