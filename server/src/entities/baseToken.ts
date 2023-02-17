import { DomainObject } from "./domainObject";

export class BaseToken extends DomainObject {
  constructor(id: number,
              private readonly _fullName: string,
              private readonly _shortName: string,
              private _address: string) {
    super(id);
  }

  get address(): string {
    return this._address
  }

  get fullName(): string {
    return this._fullName
  }

  get shortName(): string {
    return this._shortName
  }
}