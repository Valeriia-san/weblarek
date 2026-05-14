import { IProduct } from "../../types";

export class Catalog {
  private _products: IProduct[] = [];
  private _selectedProduct: IProduct | null = null;

  set products(items: IProduct[]) {
    this._products = items;
  }

  get products() {
    return [...this._products];
  }

  getProductById(id: string): IProduct | undefined {
    return this._products.find(item => item.id === id);
  }

  set selectedProduct(item: IProduct | null) {
    this._selectedProduct = item;
  }

  get selectedProduct(): IProduct | null {
    return this._selectedProduct;
  }
}
