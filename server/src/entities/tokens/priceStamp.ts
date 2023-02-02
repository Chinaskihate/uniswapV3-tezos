export class PriceStamp {
  constructor(private readonly _price: number,
              // TODO: timeStamp param in constructor is a dev-only feature
              private readonly _timeStamp:number = Date.now()) {
  }

  get price(): number {
    return this._price
  }

  get timeStamp(): number {
    return this._timeStamp
  }
}