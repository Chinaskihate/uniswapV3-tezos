import { BaseStatistics } from "./baseStatistics";

export class ExtendedStatistics extends BaseStatistics {
  constructor(price: number, changeForDay: number,
              private _totalValueLocked: number = 0,
              private _totalVolume: number = 0,
              private _volumeForDay: number = 0,
              private _icon: string = '') {
    super(price, changeForDay);
  }

  get totalValueLocked(): number {
    return this._totalValueLocked
  }

  get totalVolume(): number {
    return this._totalVolume
  }

  get volumeForDay(): number {
    return this._volumeForDay
  }

  get icon(): string {
    return this._icon
  }

  set volumeForDay(volumeForDay: number) {
    this._volumeForDay = volumeForDay
  }

  set totalValueLocked(totalValueLocked: number) {
    this._totalValueLocked = totalValueLocked
  }

  set totalVolume(totalVolume: number) {
    this._totalVolume = totalVolume
  }

  set icon(icon: string) {
    this._icon = icon
  }
}