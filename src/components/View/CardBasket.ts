import { Card } from "./Entity/Card";
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class CardBasket extends Card<IProduct> {
  protected cardButton: HTMLButtonElement;
  protected cardIndex: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.cardButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container,
    );
    this.cardIndex = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container,
    );

    this.cardButton.addEventListener("click", () => {
      this.events.emit("basket:remove", { id: this.cardId });
    });
  }
  set index(value: number) {
    this.cardIndex.textContent = String(value);
  }
}
