import validator from 'validator';

export class UserValidator {
  //constructor(parameters) {}
  static validate(body, toValidate: string[]) {
    const errors = [];

    if (toValidate.includes('name') && validator.isEmpty(body.name)) {
      errors.push('Name cannot be empty');
    }
    if (toValidate.includes('email') && !validator.isEmail(body.email)) {
      errors.push('Invalid email');
    }
    if (toValidate.includes('password') && validator.isEmpty(body.password)) {
      errors.push('Password cannot be empty');
    }

    return errors;
  }
}
