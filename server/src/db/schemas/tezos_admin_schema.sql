drop table if exists tezos_admin;

-- auto-generated definition
create table tezos_admin
(
    login           varchar not null
        constraint "PK_0f237576c8dcaaf2bdc0ad568e9"
            primary key,
    hashed_password varchar not null,
    salt            varchar not null
);

alter table tezos_admin
    owner to postgres