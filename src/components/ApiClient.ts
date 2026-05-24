import { IApi, IProduct, IOrder, IResponse } from "../types";

export class ApiClient {
  private _api: IApi;

  constructor(api: IApi) {
    this._api = api;
  }

  getProducts(): Promise<{ total: number; items: IProduct[] }> {
    return this._api.get("/product/");
  }

  postOrder(orderData: IOrder): Promise<IResponse> {
    return this._api.post("/order/", orderData);
  }
}
