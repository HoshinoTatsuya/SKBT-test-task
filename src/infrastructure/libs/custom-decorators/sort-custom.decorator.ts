import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export function SortCustomDecorator(sortRegExp: RegExp, validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string): void {
    registerDecorator({
      name: 'SortCustomDecorator',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          if (value.trim().length === 0) {
            return true
          }

          return sortRegExp.test(value)
        },
      },
    })
  }
}
