import { TPayment, IBuyer, ValidationErrors } from "../../types";

export class Customer {
  private _payment: TPayment = "";
  private _email: string = "";
  private _phone: string = "";
  private _address: string = "";

  setNewValue<T extends keyof IBuyer>(field: T, value: IBuyer[T]): void {
    switch (field) {
      case "payment":
        this._payment = value as TPayment;
        break;
      case "email":
        this._email = value as string;
        break;
      case "phone":
        this._phone = value as string;
        break;
      case "address":
        this._address = value as string;
        break;
    }
  }

  getInfo(): IBuyer {
    return {
      payment: this._payment,
      email: this._email,
      phone: this._phone,
      address: this._address,
    };
  }

  clearInfo(): void {
    this._payment = "";
    this._email = "";
    this._phone = "";
    this._address = "";
  }

  validate(): ValidationErrors | string {
    const errors: ValidationErrors = {};

    if (!this._payment) errors.payment = "Не выбран тип оплаты";

    if (!this._email) errors.email = "Укажите e-mail";

    if (!this._phone) errors.phone = "Укажите номер телефона";

    if (!this._address) errors.address = "Укажите адрес доставки";

    if (Object.keys(errors).length === 0) {
      return "ошибок нет";
    } else {
      return errors;
    }
  }
}
