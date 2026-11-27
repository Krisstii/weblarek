import { Iform, Form } from "./Entity/Form";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export interface Icontact extends Iform {
  email: string;
  phone: string;
}

export class Contact extends Form<Icontact> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.emailInput = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container,
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container,
    );

    this.emailInput.addEventListener("input", () => {
      this.inputChange("email", this.emailInput.value);
    });

    this.phoneInput.addEventListener("input", () => {
      this.inputChange("phone", this.phoneInput.value);
    });
  }

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }
}
