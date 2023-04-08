export class BaseStatistics {
  constructor(private _price: number, private _change_for_day: number) {
  }

  get price(): number {
    return this._price
  }

  get change(): number {
    return this._change_for_day
  }

  set price(price: number) {
    this._price = price
  }

  set change(change_for_day: number) {
    this._change_for_day = change_for_day
  }
}
