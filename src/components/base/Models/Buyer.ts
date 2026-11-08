import { IBuyer } from "../../../types";
export class Buyer {
  protected buyerData: IBuyer = {
    payment: null,
    email: "",
    phone: "",
    address: "",
  };

  saveBuyerData(data: Partial<IBuyer>): void {
    this.buyerData = {
      ...this.buyerData,
      ...data,
    };
  }

  getBuyerData(): IBuyer {
    return this.buyerData;
  }

  clearBuyerData(): void {
    this.buyerData = {
      payment: null,
      email: "",
      phone: "",
      address: "",
    };
  }

  isValidData(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!this.buyerData) {
      errors.payment = "Не указан способ оплаты";
      errors.email = "Необходимо указать адресс электронной почты";
      errors.phone = "Необходимо указать номер телефона";
      errors.address = "Необходимо указать адрес";
      return errors;
    }
    if (!this.buyerData.payment) {
      errors.payment = "Не указан способ оплаты";
    }
    if (!this.buyerData.email) {
      errors.email = "Необходимо указать адресс электронной почты";
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
