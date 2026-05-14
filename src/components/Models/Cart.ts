import { IProduct } from "../../types";

export class Cart {
  private _items: IProduct[] = [];

  getItems(): IProduct[] {
    return [...this._items];
  }

  getTotalPrice(): number {
    return this._items.reduce((sum: number, item) => {
      return sum + Number(item.price);
    }, 0)
  }

  getItemsCount(): number {
    return this._items.length;
  }

  addItem(item: IProduct): void {
    if (!this.checkItem(item.id)) {
      this._items.push(item);
    }
  }

  deleteItem(itemToDelete: IProduct): void {
    this._items = this._items.filter(item => item.id !== itemToDelete.id);
  }

  clearCart(): void {
    this._items = [];
  }

  checkItem(id: string): boolean {
    return this._items.some(item => item.id === id);
  }
}
