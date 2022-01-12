import Config from '@/Config'

let baseHeader = { 'Content-Type': 'application/json' }

export async function fetchVideoToken() {
  // 'https://video-3999-lluvsb.twil.io/video-token'
  const videoTokenData = await fetch(Config.getEP('twilio'), {
    method: 'POST',
    body: JSON.stringify({ passcode: 'gideb' }),
    headers: baseHeader,
  })
  const jsonVideoToken: any = videoTokenData.json()
  return jsonVideoToken
}
