import { IApi } from "../../../types/index";
import { IOrder, IOrderResult, IProduct } from "../../../types/index";

export class Communication {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getProductList(): Promise<IProduct> {
    return this.api.get<IProduct>("/product/");
  }

  async postProduct(order: IOrder): Promise<IOrderResult> {
    return this.api.post<IOrderResult>("/order/", order);
  }
}
