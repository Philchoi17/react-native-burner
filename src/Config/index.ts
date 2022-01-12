import { version as appVersion } from '../../package.json'
import appConfig from './appConfig.json'
import Logger from '@/Utils/Logger'
import Translations from '@/Translations'

interface CHAT_EXTRA_PROPS {
  MEDIA_UPLOAD: boolean
  VIDEO: boolean
}

interface ENDPOINT_URLS {
  twilio: string
}

type EP_TYPES = 'twilio'

class Config {
  PRACTICE: boolean
  PAY_MODE: string
  STORYBOOK: boolean
  LANG: string
  CHAT: boolean
  JOURNAL: boolean
  CHAT_EXTRAS: CHAT_EXTRA_PROPS
  ENDPOINTS: ENDPOINT_URLS

  constructor() {
    const {
      PRACTICE,
      PAY_MODE,
      STORYBOOK,
      LANG,
      CHAT,
      JOURNAL,
      CHAT_EXTRAS,
      ENDPOINTS,
    } = appConfig
    this.PRACTICE = PRACTICE
    this.PAY_MODE = PAY_MODE
    this.STORYBOOK = STORYBOOK
    this.LANG = LANG
    this.CHAT = CHAT
    this.JOURNAL = JOURNAL
    this.CHAT_EXTRAS = CHAT_EXTRAS
    this.ENDPOINTS = ENDPOINTS
  }

  /**
   * initialize app with items in async storage
   */
  init() {
    // init function here for when app loads
  }
  /**
   * resets all of config set to be used on logout
   * or acct termination to reset async storage
   * and remove device tokens
   */
  resetConfig() {
    // reset all config here
  }
  /**
   *
   * @param screenId name of screen
   * @returns object of keys of text to use on screen
   */
  i18n(screenId: string) {
    return screenId // Translations
  }

  getEP(service: EP_TYPES) {
    return this.ENDPOINTS[service]
  }

  /**
   *
   * @returns practice screen to test components or libraries
   */
  practiceScreenOn() {
    return this.PRACTICE
  }

  /**
   *
   * @returns language set in config
   */
  getLang() {
    return this.LANG
  }

  /**
   *
   * @returns pay mode [ 'TEST' | 'PROD' ]
   */
  getPayMode() {
    return this.PAY_MODE
  }

  /**
   *
   * @returns if storybook is on [ true | false ]
   */
  storybookOn() {
    return this.STORYBOOK
  }

  /**
   *
   * @returns if chat feature is on or off
   */
  chatFeatureOn() {
    return this.CHAT
  }
  chatFeatureVideoChatOn() {
    return this.CHAT_EXTRAS.VIDEO
  }

  chatFeatureMediaUploadOn() {
    return this.CHAT_EXTRAS.MEDIA_UPLOAD
  }
  /**
   *
   * @returns if journal feature is in bottom tabs
   */
  journalFeatureOn() {
    return this.JOURNAL
  }
}

export default new Config()
