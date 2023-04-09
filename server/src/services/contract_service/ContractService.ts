import {IContractService} from "./IContractService";
import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {TezosToolkit} from "@taquito/taquito";
import {SchedulerRegistry} from "@nestjs/schedule";
import {ITokenService} from "../token_service/ITokenService";
import {TokenService} from "../token_service/tokenService";
import {InMemorySigner} from "@taquito/signer";
import fetch from "node-fetch"
import {PriceStamp} from "../../entities/priceStamp";
import {ExtendedToken} from "../../entities/extendedToken";

@Injectable()
export class ContractService implements IContractService, OnModuleInit {
  private readonly RPC_ADDRESS: string
  private readonly CONTRACT_ADDRESS: string
  private readonly toolkit: TezosToolkit

  constructor(@Inject(SchedulerRegistry)
              private readonly _schedulerRegistry: SchedulerRegistry,
              @Inject(TokenService)
              private readonly _tokenService: ITokenService) {
    this.RPC_ADDRESS = process.env.RPC_ADDRESS
    this.CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
    this.toolkit = new TezosToolkit(this.RPC_ADDRESS);
  }

  onModuleInit() {
    this._schedulerRegistry.addInterval('fetchContractDataInterval',
      setInterval(() => this.updateTokenData(), +process.env.CONTRACT_TIMEOUT_MS));
  }

  async updateTokenData(): Promise<void> {
    this.toolkit.setProvider({
      signer: new InMemorySigner(
        "edsk3S4ZXd2n11BS29PCmFE5QHbvjMdyBJeiB2JEA4WbR6BKgs3WeZ"
      ),
    });

    console.log(`[CONTRACT SERVICE] : ${new Date()} : TOKEN UPDATE STARTED...`)

    let response, tokens, hashes, tokensInfo
    try {
      response = await fetch('https://api.better-call.dev/v1/bigmap/ghostnet/282294/keys');
      tokens = await response.json();
      hashes = tokens.map(token => token.data['key_hash']);
    } catch (error) {
      console.log('[CONTRACT SERVICE ERROR] : BCD keys API error. Tokens info update aborted.')
      return
    }

    try {
      tokensInfo = await Promise.all(hashes.map(async hash => {
        try {
          const resp = await fetch(`https://api.better-call.dev/v1/bigmap/ghostnet/282294/keys/${hash}/state`);
          return resp.json();
        } catch (err) {
          console.log('[CONTRACT SERVICE ERROR] : BCD token details API. Tokens info update aborted.')
          return
        }
      }));
    } catch (error) {
      console.log('[CONTRACT SERVICE ERROR] : BCD token details API. Tokens info update aborted.')
      return
    }

    console.log('[CONTRACT SERVICE] : TOKEN INFO FETCHED FROM BCD. UPDATE CONTINUED...')
    const updated_tokens: ExtendedToken[] = [];
    let parsing_error_count: number = 0
    try {
      for (const token_info of tokensInfo) {
        try {
          const token = await this._tokenService.getTokenByAddress(token_info['key_string']);
          token.clearPriceStampsAllTime();
          token.priceStampsAllTime.push(
            new PriceStamp(
              token_info['value']['value'],
              token_info['last_update_time']
            )
          );
          updated_tokens.push(token);
        } catch (err) {
          parsing_error_count += 1
        }
      }
    } catch (err) { }


    if (updated_tokens.length == 0) {
      console.log('[CONTRACT SERVICE ERROR] : NO NEW INFO. Tokens info update aborted.')
      return
    }

    console.log('[CONTRACT SERVICE] : TOKEN INFO UPDATED LOCALLY. WRITING CHANGES TO THE DATABASE...')
    const total_count: number = updated_tokens.length
    let db_errors_count: number = 0
    for (const updated_token of updated_tokens) {
      try {
        await this._tokenService.saveToken(updated_token);
      } catch (err) {
        db_errors_count += 1
      }
    }
    console.log(`[CONTRACT SERVICE] : ${total_count - db_errors_count} from ${total_count} TOKENS UPDATED WITHOUT ERRORS`)
  }
}