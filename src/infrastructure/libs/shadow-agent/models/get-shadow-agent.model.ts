import { Lookup } from 'geoip-lite'
import { IResult } from 'ua-parser-js'

import { SupportLanguageEnum } from '../enums'

/**
 * @class GetShadowAgentModel
 *
 * @property {string} [ipClient = undefined] is used for whatever reason
 * @property {null | Lookup} [geolocationClient = undefined] is used for whatever reason
 * @property {IResult} [userAgentInfo = undefined] is used for whatever reason
 * @property {string} [userLanguage = undefined] is used for whatever reason
 * @property {string} userAgent is used for whatever reason
 */
export class GetShadowAgentModel {
  /** @description IP client. **/
  public ipClient?: string

  /** @description Geoposition client relative ip client. **/
  public geolocationClient?: null | Lookup

  /** @description User agent, example Google, Firefox, etc.
   * @example
   * {
   *     "ua": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
   *     "browser": {
   *       "name": "Firefox",
   *       "version": "120.0",
   *       "major": "120"
   *     },
   *     "engine": {
   *       "name": "Gecko",
   *       "version": "120.0"
   *     },
   *     "os": {
   *       "name": "Ubuntu"
   *     },
   *     "device": {},
   *     "cpu": {
   *       "architecture": "amd64"
   *     }
   *   }
   *
   **/
  public userAgentInfo?: IResult

  /**
   * @description Language on user client
   * @example "RU"
   */
  public userLanguage?: SupportLanguageEnum

  /**
   * @description Client user application
   * @example "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
   */
  public userAgent: string

  public constructor(data: GetShadowAgentModel) {
    this.ipClient = data.ipClient
    this.geolocationClient = data.geolocationClient
    this.userAgentInfo = data.userAgentInfo
    this.userLanguage = data.userLanguage
    this.userAgent = data.userAgent
  }
}
