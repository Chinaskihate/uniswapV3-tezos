export class PriceStamp {
  constructor(private readonly _price: number,
              private readonly _timeStamp:Date = new Date(Date.now())) {
  }

  get price(): number {
    return this._price
  }

  get timeStamp(): Date {
    return this._timeStamp
  }
}