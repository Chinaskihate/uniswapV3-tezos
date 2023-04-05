import {Body, Controller, Delete, Get, Inject, Param, Patch, Put, UseGuards, UseInterceptors} from "@nestjs/common";
import {ITokenService} from "../services/token_service/ITokenService";
import {TokenService} from "../services/token_service/tokenService";
import {LoggerInterceptor} from "../proxy_logic/interceptors/loggerInterceptor";
import {ResponseFormatterInterceptor} from "../proxy_logic/interceptors/responseFormatterInterceptor";
import {UnitOfTime} from "../utils/time_converter/unitOfTime";
import {UnitOfTimeValidationPipe} from "../proxy_logic/validators/unifOfTimeValidator";
import {ExtendedToken} from "../entities/extendedToken";
import {NewTokenValidator} from "../proxy_logic/validators/newTokenValidator";
import {AuthGuard} from "../proxy_logic/auth/authGuard";
import {ExistingTokenValidator} from "../proxy_logic/validators/existingTokenValidator";

@UseInterceptors(LoggerInterceptor, ResponseFormatterInterceptor)
@Controller('api/Token/v1')
export class TokenController {
  constructor(@Inject(TokenService)
              private _tokenService: ITokenService) { }

  @Get('names')
  async getAllTokensNames(): Promise<string> {
    return this._tokenService.getAllTokens()
      .then(result => JSON.stringify(result))
  }

  @Get(':address')
  async getTokenByAddress(@Param('address')
                          address: string): Promise<string> {
    return this._tokenService.getTokenByAddress(address)
      .then(result => JSON.stringify(result))
  }

  @Get('names/:name_pattern')
  async getTokensByNamePattern(@Param('name_pattern')
                               name_pattern: string): Promise<string> {
    return this._tokenService
      .getAllTokensByNamePattern(name_pattern)
      .then(result => JSON.stringify(result))
  }

  @Get(':address/stamps/:unitOfTime')
  async getPriceStamps(@Param('address') address: string,
                       @Param('unitOfTime', UnitOfTimeValidationPipe)
                         unitOfTime: string): Promise<string> {
    return this._tokenService
      .getAllPriceStampsInRange(address, UnitOfTime[unitOfTime.toUpperCase()])
      .then(result => JSON.stringify(result))
  }

  @Put('add')
  @UseGuards(AuthGuard)
  async addNewToken(@Body(NewTokenValidator)
                    newToken: ExtendedToken): Promise<string> {
    return this._tokenService
        .saveToken(newToken)
        .then(result => JSON.stringify(result))
  }

  @Patch('update')
  @UseGuards(AuthGuard)
  async updateExistingToken(@Body(ExistingTokenValidator)
                            extendedToken: ExtendedToken): Promise<string> {
    return this._tokenService
      .saveToken(extendedToken)
      .then(result => JSON.stringify(result))
  }

  @Delete('delete/:address')
  @UseGuards(AuthGuard)
  async deleteToken(@Param('address')
                        address: string): Promise<string> {
    return this._tokenService
      .deleteToken(address)
      .then(result => JSON.stringify(result))
  }
}
