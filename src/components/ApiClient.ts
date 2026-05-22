import { IApi, IProduct, IOrder, IResponse } from "../types";

export class ApiClient {
  private _api: IApi;

  constructor(api: IApi) {
    this._api = api;
  }

  async getProducts(uri: string): { total: number; items: IProduct[] } {
    const result = await this._api.get(uri);

    return result;
  }

  async postOrder(uri: string, data: IOrder): IResponse {
    const result = await this._api.post(uri, data);

    return result;
  }
}
