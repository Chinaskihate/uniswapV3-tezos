export class BaseStatistics {
  constructor(private _price: number, private _changeForDay: number) {
  }

  get price(): number {
    return this._price
  }

  get changeForDay(): number {
    return this._changeForDay
  }

  set price(price: number) {
    this._price = price
  }

  set changeForDay(changeForDay: number) {
    this._changeForDay = changeForDay
  }
}
