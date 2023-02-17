export class BaseStatistics {
  constructor(private _price: number, private _change: number) {
  }

  get price(): number {
    return this._price
  }

  get change(): number {
    return this._change
  }

  set price(price: number) {
    this._price = price
  }

  set change(change: number) {
    this._change = change
  }
}
