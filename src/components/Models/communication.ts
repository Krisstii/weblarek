import { IApi } from "../../types/index";
import { IOrder, IOrderResult, IProductsResponse } from "../../types/index";

export class Communication {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getProductList(): Promise<IProductsResponse> {
    return this.api.get<IProductsResponse>("/product/");
  }

  async postProduct(order: IOrder): Promise<IOrderResult> {
    return this.api.post<IOrderResult>("/order/", order);
  }
}
