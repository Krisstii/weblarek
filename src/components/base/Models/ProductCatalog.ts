import { IProduct } from "";

export class ProductCatalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor() {
    this.products = [];
    this.selectedProduct = null;
  }

  setProduct(products: IProduct[]): void {
    this.products = products;
  }

  getProduct(): IProduct[] {
    return this.products;
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find((product) => product.id === id);
  }

  setSelectProduct(product: IProduct | null): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
