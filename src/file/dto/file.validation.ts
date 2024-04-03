import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsPdfFile(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isPdfFile',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value instanceof Array) {
            return value.every((file) => file?.mimetype === 'application/pdf');
          } else {
            return value?.mimetype === 'application/pdf';
          }
        },
        defaultMessage(args: ValidationArguments) {
          return 'The uploaded file must be a PDF.';
        },
      },
    });
  };
}
