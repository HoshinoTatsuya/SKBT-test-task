import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export function IsArgumentBooleanDecorator(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string): void {
    registerDecorator({
      name: 'IsArgumentBooleanDecorator',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          if (value === false || String(value).toLowerCase() === 'false' || value === '0' || value === 0) {
            return true
          } else if (value === true || String(value).toLowerCase() === 'true' || value === '1' || value === 1) {
            return true
          }

          return false
        },
      },
    })
  }
}
