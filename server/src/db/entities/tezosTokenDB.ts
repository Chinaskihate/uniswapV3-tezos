import {Column, Entity, JoinTable, OneToMany, PrimaryColumn} from "typeorm";
import {PriceStampDB} from "./priceStampDB";

@Entity({name: 'tezos_token'})
export class TezosTokenDB {
  @PrimaryColumn({type : 'varchar', name: 'id'})
  address: string

  @Column({name: 'full_name'})
  fullName: string

  @Column({name: 'short_name'})
  shortName: string

  @Column({name: 'price'})
  price: number

  @Column({name: 'change_for_day'})
  change_for_day: number

  @Column({name: 'total_value_locked'})
  totalValueLocked: number

  @Column({name: 'total_volume'})
  totalVolume: number

  @Column({name: 'volume_for_day'})
  volumeForDay: number

  @Column({name: 'icon'})
  icon: string

  @OneToMany(() => PriceStampDB, priceStamp => priceStamp.token, {
    lazy: true, nullable: true
  })
  @JoinTable({name: 'price_stamp'})
  priceStamps: Promise<PriceStampDB[]>;

  constructor(fullName?: string, shortName?: string,
              address?: string, price?: number, change?:number,
              totalValueLocked?: number, totalVolume?: number,
              volumeForDay?: number, icon?:string) {
    this.fullName = fullName
    this.shortName = shortName
    this.address = address
    this.price = price
    this.change_for_day = change
    this.totalValueLocked = totalValueLocked
    this.totalVolume = totalVolume
    this.volumeForDay = volumeForDay
    this.icon = icon
  }
}