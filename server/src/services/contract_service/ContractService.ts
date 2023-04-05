import {IContractService} from "./IContractService";
import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {TezosToolkit} from "@taquito/taquito";
import {SchedulerRegistry} from "@nestjs/schedule";
import {ITokenService} from "../token_service/ITokenService";
import {TokenService} from "../token_service/tokenService";


@Injectable()
export class ContractService implements IContractService, OnModuleInit {
  private readonly RPC_ADDRESS: string
  private readonly CONTRACT_ADDRESS: string
  private readonly toolkit: TezosToolkit

  constructor(@Inject(SchedulerRegistry)
              private readonly _schedulerRegistry: SchedulerRegistry,
              @Inject(TokenService)
              private readonly _tokenConverter: ITokenService) {
    this.RPC_ADDRESS = process.env.RPC_ADDRESS
    this.CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
    this.toolkit = new TezosToolkit(this.RPC_ADDRESS);
  }

  onModuleInit() {
    this._schedulerRegistry.addInterval('fetchContractDataInterval',
      setInterval(() => this.fetchContractData(), +process.env.CONTRACT_TIMEOUT_MS));
  }

  fetchContractData(): void {
    // this.toolkit
    //   .contract.at(this.CONTRACT_ADDRESS)
    //   .then(async contract => {
    //     let x = await contract.storage()
    //     console.log(x)
    //     // @ts-ignore
    //     let y = await x.allowances.get('tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx')
    //     console.log(y)
    //   })
    this.toolkit.contract
      .at('KT1Ccr6ZMeB1mp9yJAqJTHK7F4xoFV9uc11T')
      .then((contract) => {
        return contract.views
          .balance_of([{ owner: 'tz1c1X8vD4pKV9TgV1cyosR7qdnkc8FTEyM1', token_id: '0' }])
          .read();
      })
      .then((response) => {
        console.log(JSON.stringify(response, null, 2));
      })
  }

  getContractAddresses() {

  }
}