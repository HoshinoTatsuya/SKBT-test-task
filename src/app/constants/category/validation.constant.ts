import { SupportLanguageEnum } from '../../enums/support-language.enum'

export const isAlphaLanguage: Record<keyof typeof SupportLanguageEnum, RegExp> = {
  [SupportLanguageEnum.RU]: /^[А-Яа-яЁё\s]+$/,
  [SupportLanguageEnum.EN]: /^[A-Za-z\s]+$/,
}

export const maxStringLength = 50

export const sortRegExp = /^[A-Za-z-][A-Za-z]{0,50}$/ // /^(-?[A-Za-z])([A-Za-z]{0,50})$/ - это если просто тире или дефис нельзя передавать, так как из тз не особо ясно

export const uuidV4 = 4
