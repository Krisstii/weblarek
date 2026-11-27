import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface Ibasket {
  basket: HTMLElement[];
  total: number;
}

export class Basket extends Component<Ibasket> {
  protected basketButton: HTMLButtonElement;
  protected basketContent: HTMLElement;
  protected totalPrice: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.basketButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container,
    );
    this.basketContent = ensureElement<HTMLElement>(
      ".basket__list",
      this.container,
    );
    this.totalPrice = ensureElement<HTMLElement>(
      ".basket__price",
      this.container,
    );

    this.basketButton.addEventListener("click", () => {
      this.events.emit("basket:success");
    });
  }

  set total(value: number) {
    this.totalPrice.textContent = `${value} синапсов`;
  }

  set basket(items: HTMLElement[]) {
    if (items.length === 0) {
      const description = document.createElement("P");
      description.textContent = "Корзина пуста";
      this.basketContent.replaceChildren(description);
      this.basketButton.disabled = true;
    } else {
      this.basketContent.replaceChildren(...items);
      this.basketButton.disabled = false;
    }
  }

  set buttonStatus(value: boolean) {
    this.basketButton.disabled = value;
  }
}
