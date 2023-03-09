export class DomainObject {
  constructor(private _address: string) { }

  get address(): string {
    return this._address
  }
}