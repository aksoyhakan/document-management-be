import {
  ValidationOptions,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';

export function IsPasswordCheck(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPasswordCheck',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value?.length > 5 && value?.length < 12;
        },
      },
    });
  };
}
