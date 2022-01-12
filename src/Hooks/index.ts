import Config from '@/Config'

export function useLang(screenId: string) {
  return Config.i18n(screenId)
}
