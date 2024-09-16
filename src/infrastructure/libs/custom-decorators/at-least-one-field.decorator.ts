import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export function AtLeastOneFieldDecorator(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string): void {
    registerDecorator({
      name: 'AtLeastOneFieldDecorator',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const objectData = args.object
          return Object.keys(objectData).some(
            (key) => objectData[key] !== undefined && objectData[key] !== null && objectData[key] !== '',
          )
        },
      },
    })
  }
}
