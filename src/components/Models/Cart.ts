import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
export class Cart {
  private items: IProduct[] = [];

  constructor(protected events: IEvents) {
    this.items = [];
  }

  getItems(): IProduct[] {
    return this.items;
  }

  addProduct(product: IProduct): void {
    if (!this.hasProductInCart(product.id)) {
      this.items.push(product);
    }
    this.events.emit("basket:change");
  }

  removeProduct(product: IProduct): void {
    this.items = this.items.filter((item) => item.id != product.id);
    this.events.emit("basket:change");
  }

  clearCart(): void {
    this.items = [];
  }

  getTotalPrice(): number {
    return this.items.reduce((acc, item) => acc + (item.price || 0), 0);
  }

  getCountProduct(): number {
    return this.items.length;
  }

  hasProductInCart(id: string): boolean {
    return this.items.some((item) => item.id === id);
  }
}
