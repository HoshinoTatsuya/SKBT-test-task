import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export function IsAlphaWithMultipleLocalesDecorator(
  locales: RegExp[],
  supportLanguages: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: NonNullable<unknown>, propertyName: string): void {
    registerDecorator({
      name: 'IsAlphaWithMultipleLocalesDecorator',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [supportLanguages.join(', ')],
      validator: {
        validate(value: string, args: ValidationArguments) {
          return locales.some((locale) => locale.test(value))
        },
      },
    })
  }
}
