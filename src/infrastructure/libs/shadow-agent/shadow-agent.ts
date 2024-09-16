import { IncomingHttpHeaders } from 'http'

import { getClientIp } from '@supercharge/request-ip'
import { Request } from 'express'
import { Lookup, lookup } from 'geoip-lite'
// eslint-disable-next-line import/no-unresolved
import { IResult, UAParser as UserAgentParser } from 'ua-parser-js'

import { SupportLanguageEnum } from './enums'
import { GetShadowAgentModel } from './models'

function convertHeadersKeysToLowerCase(obj: IncomingHttpHeaders): IncomingHttpHeaders {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key]
    return acc
  }, {})
}

function getLanguageEnum(language: string): SupportLanguageEnum {
  switch (language) {
    case 'RU':
      return SupportLanguageEnum.RU
    case 'EN':
      return SupportLanguageEnum.EN
    default:
      return SupportLanguageEnum.EN
  }
}

/**
 * @description This code removes extra characters from ip
 * @param {string} data - IP is transmitted with extra characters
 * @return {string} line - line with ip without extra characters
 *
 * @example
 * input: '::ffff:127.0.0.1'
 * output: '127.0.0.1'
 */
function ipDeleteColon(data: string): string {
  let newIp = data

  const colonInIp = newIp.split(':')
  const numberOfColonInIp = colonInIp.length - 1

  if (numberOfColonInIp !== 0) {
    newIp = colonInIp[numberOfColonInIp]

    return newIp
  }

  return newIp
}

/**
 * @description This code for obtaining client ip
 * @param {Request} data - the pure request body is transmitted with type is {@link Request}
 * @return {string} line - this method returns the client ip with type is string
 *
 * @example "172.18.0.1"
 */
function getIp(data: Request): string {
  let clientIp = getClientIp(data)

  clientIp = ipDeleteColon(clientIp)

  return clientIp
}

/**
 * @description This code is for obtaining the geoposition relative to the client's IP
 * @param {string} ip - client IP without extra characters
 *
 * @return {Lookup | null} - this method returns full data on geoposition with type is {@link Lookup}
 */
function getGeolocationByIp(ip: string): null | Lookup {
  const geolocationClient = lookup(ip)
  return geolocationClient
}

/**
 * @description This code is for obtaining the user agent relative to the request body
 * @param {Request} data - request data with type {@link Request}
 *
 * @return {IResult} - return user agent with type is {@link IResult}
 *
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
 */
function getUserAgent(data: Request): IResult {
  return UserAgentParser(data.headers['user-agent'])
}

/**
 * @description This code is released to determine the user's language that is used on his system
 * from where the request originates.
 * @param {Request} data - request data with type {@link Request}
 *
 * @return {String} - return user's language'
 *
 * @example 'RU'
 */
export function getUserLanguage(data: Request): SupportLanguageEnum {
  const headers = data.headers

  const headersKeysToLowerCase = convertHeadersKeysToLowerCase(headers)

  const userLanguageData: string | undefined = headersKeysToLowerCase['accept-language']

  if (userLanguageData && userLanguageData.length != 0) {
    const userLanguage = userLanguageData.split(',')[0]

    return getLanguageEnum(userLanguage.split('-')[1])
  }

  return SupportLanguageEnum.EN
}

/**
 * @description This method is implemented to obtain the following data from the client:
 * ip, user agent and geolocation relative to the client’s ip.
 * @param {Request} data - request data with type {@link Request}
 * @return {GetShadowAgentModel} - return shadow data with type is {@link GetShadowAgentModel}
 *
 * @example
 * {
 *   "ipClient": "172.18.0.1",
 *   "geolocationClient": null,
 *   "userAgentInfo": {
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
 *   },
 *   "userLanguage": "RU"
 * }
 */
export function getShadowData(data: Request): GetShadowAgentModel {
  const ipClient = getIp(data)

  const geolocationClient = getGeolocationByIp(ipClient)
  const userAgentInfo = getUserAgent(data)
  const userAgent = userAgentInfo?.ua
  const userLanguage = getUserLanguage(data)

  return new GetShadowAgentModel({ ipClient, geolocationClient, userAgentInfo, userLanguage, userAgent })
}
