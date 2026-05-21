import { IApi, IProduct, IOrder, IResponse } from "../types";

export class ApiClient {
  private _api: IApi;

  constructor(api: IApi) {
      this._api = api;
  }

  async getData(uri: string): Promise<{total: number, items: IProduct[]}> {
      return this._api.get(uri);
  }

  async postData(uri: string, data: IOrder): Promise<IResponse> {
      return this._api.post(uri, data);
  }
}