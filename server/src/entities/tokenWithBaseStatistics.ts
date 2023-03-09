import { BaseToken } from "./baseToken";
import { BaseStatistics } from "./baseStatistics";

export class TokenWithBaseStatistics extends BaseToken {
  constructor(fullName: string, shortName: string, address: string,
              private _statistics: BaseStatistics) {
    super(address, fullName, shortName);
  }

  get statistics(): BaseStatistics {
    return this._statistics
  }

  set statistics(statistics: BaseStatistics) {
    this._statistics = statistics;
  }
}