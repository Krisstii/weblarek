import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

interface Isuccess {
  total: number;
}

export class Success extends Component<Isuccess> {
  protected buttonContinue: HTMLButtonElement;
  protected description: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.description = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container,
    );
    this.buttonContinue = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container,
    );

    this.buttonContinue.addEventListener("click", () => {
      this.events.emit("success:close");
    });
  }

  set total(value: number) {
    this.description.textContent = `списано ${value} синапсов`;
  }
}
