import {IContractService} from "./IContractService";
import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {TezosToolkit} from "@taquito/taquito";
import {SchedulerRegistry} from "@nestjs/schedule";
import {ITokenService} from "../token_service/ITokenService";
import {TokenService} from "../token_service/tokenService";
import {InMemorySigner} from "@taquito/signer";


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

    this.toolkit.setProvider({
      signer: new InMemorySigner(
        "edsk3S4ZXd2n11BS29PCmFE5QHbvjMdyBJeiB2JEA4WbR6BKgs3WeZ"
      ),
    });

    // this.toolkit
    //   .contract
    //   .at('KT1N3AsZXbdscjACqpgM1imzURd8fRXoFE8F')
    //   .then((contract) => {
    //     return contract.methods.getBalance(
    //       'tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx',
    //       'KT1KaRYv1d23GrTqdwWKPo66JMRTsHVb5prY'
    //     ).send()
    //   })
    //   .then(x => x.confirmation(5))
    // @ts-ignore
    this.toolkit.contract
      .at('KT1N3AsZXbdscjACqpgM1imzURd8fRXoFE8F')
      .then(contract => contract.storage())
      .then(x => {

        // @ts-ignore
        console.log(x.toNumber())
      })
  }

  getContractAddresses() {

  }
}