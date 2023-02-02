import { PriceStamp } from "../entities/tokens/priceStamp";
import { ExtendedToken } from "../entities/tokens/extendedToken";
import { ExtendedStatistics } from "../entities/tokens/extendedStatistics";
import { BaseToken } from "../entities/tokens/baseToken";
import { TokenWithBaseStatistics } from "../entities/tokens/tokenWithBaseStatistics";
import { TokenWithExtendedStatistics } from "../entities/tokens/tokenWithExtendedStatistics";
import { ITokenProvider } from "./ITokenProvider";
import { BaseStatistics } from "../entities/tokens/baseStatistics";

// dev-only
export class MockTokenProvider implements ITokenProvider {
  public readonly _tokens: ExtendedToken[] = []

  constructor() {
   this._tokens.push(
     new ExtendedToken(1, 'FullTestName1', 'ShortTestName1', 'testAddress1',
       new ExtendedStatistics(1, 11)),
     new ExtendedToken(2, 'FullTestName2', 'ShortTestName2', 'testAddress2',
       new ExtendedStatistics(2, 22)),
     new ExtendedToken(3, 'FullTestName3', 'ShortTestName3', 'testAddress3',
       new ExtendedStatistics(3, 33))
   )

    this._tokens.map(token =>
      token.addPriceStamp(new PriceStamp(100, (Date.now() - 1000 * 60 * 5)))
    )

    this._tokens.map(token =>
      token.addPriceStamp(new PriceStamp(100, (Date.now() - 1000 * 60 * 60 * 5)))
    )

    this._tokens.map(token =>
      token.addPriceStamp(new PriceStamp(100, (Date.now() - 1000 * 60 * 60 * 24 * 3)))
    )

    this._tokens.map(token =>
      token.addPriceStamp(new PriceStamp(100, (Date.now() - 1000 * 60 * 60 * 24 * 10)))
    )
  }

  get baseTokensList(): BaseToken[] {
    return this._tokens
  }

  get extendedTokensList(): ExtendedToken[] {
    return this._tokens
  }

  get tokensWithBaseStatistics(): TokenWithBaseStatistics[] {
    return this._tokens.map(extendedToken => new TokenWithBaseStatistics(
      extendedToken.id,
      extendedToken.fullName,
      extendedToken.shortName,
      extendedToken.address,
      new BaseStatistics(extendedToken.statistics.price, extendedToken.statistics.change)
    ))
  }

  get tokensWithExtendedStatistics(): TokenWithExtendedStatistics[] {
    return this._tokens
  }
}
