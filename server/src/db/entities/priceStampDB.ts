import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { TezosTokenDB } from "./tezosTokenDB";

@Entity({name: 'price_stamp'})
@Unique('unique_price_stamp', ['time_stamp', 'token'])
export class PriceStampDB {
  @PrimaryGeneratedColumn()
  id: number

  @Column({name: 'time_stamp', type: 'timestamptz'})
  time_stamp: Date

  @Column({name: 'price'})
  price: number

  @ManyToOne(() => TezosTokenDB, token => token.priceStamps)
  token: TezosTokenDB
}