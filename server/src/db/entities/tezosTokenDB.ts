import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PriceStampDB } from "./priceStampDB";
import { JoinTable } from "typeorm";

@Entity({name: 'tezos_token'})
export class TezosTokenDB {
  @PrimaryGeneratedColumn()
  id: number

  @Column({name: 'full_name'})
  fullName: string

  @Column({name: 'short_name'})
  shortName: string

  @Column({name: 'address'})
  address: string

  @Column({name: 'price'})
  price: number

  @Column({name: 'change'})
  change: number

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
}