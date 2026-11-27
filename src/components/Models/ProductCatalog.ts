import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ProductCatalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor(protected events: IEvents) {
    this.products = [];
    this.selectedProduct = null;
  }

  setProduct(products: IProduct[]): void {
    this.products = products;
    this.events.emit("catalog:change");
  }

  getProduct(): IProduct[] {
    return this.products;
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find((product) => product.id === id);
  }

  setSelectProduct(product: IProduct | null): void {
    this.selectedProduct = product;
    this.events.emit("card:open");
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
