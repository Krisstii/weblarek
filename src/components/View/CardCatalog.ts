import { Card } from "../View/Entity/Card";
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { categoryMap, CDN_URL } from "../../utils/constants";

export type CategoryKey = keyof typeof categoryMap;

export class CardCatalog extends Card<IProduct> {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.cardCategory = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );
    this.cardImage = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );

    this.container.addEventListener("click", () => {
      this.events.emit("card:click", { id: this.cardId });
    });
  }

  set image(value: string) {
    this.cardImage.src = `${CDN_URL}/${value} `;
  }

  set category(value: string) {
    this.cardCategory.textContent = value;
    for (const key in categoryMap) {
      this.cardCategory.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value,
      );
    }
  }
}
