import { IBuyer, TPayment } from "../../types";

type ValidationErrors = Partial<Record<keyof IBuyer, string>>;

export class Buyer {
  protected buyerData: IBuyer & { payment: TPayment | "" } = {
    payment: "",
    email: "",
    phone: "",
    address: "",
  };

  saveBuyerData(data: Partial<IBuyer>): void {
    Object.assign(this.buyerData, data);
  }

  getBuyerData(): IBuyer & { payment: TPayment | "" } {
    return this.buyerData;
  }

  clearBuyerData(): void {
    this.buyerData = {
      payment: "",
      email: "",
      phone: "",
      address: "",
    };
  }

  isValidData(): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!this.buyerData.payment) {
      errors.payment = "Не указан способ оплаты";
    }
    if (!this.buyerData.email) {
      errors.email = "Необходимо указать адрес электронной почты";
    }
    if (!this.buyerData.phone) {
      errors.phone = "Необходимо указать номер телефона";
    }
    if (!this.buyerData.address) {
      errors.address = "Необходимо указать адрес";
    }

    return errors;
  }
}
