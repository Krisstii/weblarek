import { Iform } from "./Entity/Form";
import { Form } from "./Entity/Form";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { TPayment } from "../../types";

interface Ipayment extends Iform {
  payment: TPayment;
  address: string;
}

export class Payment extends Form<Ipayment> {
  protected buttonOnlinePayment: HTMLButtonElement;
  protected buttonOfflinePayment: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container, events);

    this.buttonOnlinePayment = ensureElement<HTMLButtonElement>(
      'button[name="card"]',
      this.container,
    );
    this.buttonOfflinePayment = ensureElement<HTMLButtonElement>(
      'button[name="cash"]',
      this.container,
    );
    this.addressInput = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container,
    );

    this.buttonOnlinePayment.addEventListener("click", () => {
      this.inputChange("payment", "card");
    });

    this.buttonOfflinePayment.addEventListener("click", () => {
      this.inputChange("payment", "cash");
    });

    this.addressInput.addEventListener("input", () => {
      this.inputChange("address", this.addressInput.value);
    });
  }

  set address(value: string) {
    this.addressInput.value = value;
  }

  set payment(value: TPayment) {
    this.buttonOfflinePayment.classList.toggle(
      "button_alt-active",
      value === "card",
    );
    this.buttonOnlinePayment.classList.toggle(
      "button_alt-active",
      value === "card",
    );
  }
}
