import { TPayment, IBuyer, ValidationResult, IValidation } from "../../types";

export class Customer {
  private _payment: TPayment;
  private _email: string;
  private _phone: string;
  private _address: string;

  constructor(buyer: IBuyer) {
    this._payment = buyer.payment;
    this._email = buyer.email;
    this._phone = buyer.phone;
    this._address = buyer.address;
  }

  setNewValue<T extends keyof IBuyer>(field: T, value: IBuyer[T]): void {
    switch (field) {
      case 'payment':
        this._payment = value as TPayment;
        break;
      case 'email':
        this._email = value as string;
        break;
      case 'phone':
        this._phone = value as string;
        break;
      case 'address':
        this._address = value as string;
        break;
    }
  }

  getInfo(): IBuyer {
    return {
      payment: this._payment, 
      email: this._email, 
      phone: this._phone, 
      address: this._address
    }
  }

  clearInfo(): void {
    this._payment = undefined;
    this._email = '';
    this._phone = '';
    this._address = '';
  };

  validate(rules: IValidation): Record<string, ValidationResult> {
    const errors: Record<string, ValidationResult> = {};

    errors.payment = rules.payment(this._payment);
    errors.email = rules.email(this._email);
    errors.phone = rules.phone(this._phone);
    errors.address = rules.address(this._address);

    return Object.entries(errors).reduce((obj: { [key: string]: string }, [field, value]) => {
      if (value) {
        obj[field] = value;
      }

      return obj;
    }, {});
  }
}