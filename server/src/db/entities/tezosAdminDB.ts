import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: 'tezos_admin'})
export class TezosAdminDB {
  @PrimaryColumn({type: 'varchar', name: 'login'})
  login: string

  @Column({name: 'hashed_password'})
  hashedPassword: string

  @Column( {name: 'salt'})
  salt: string
}