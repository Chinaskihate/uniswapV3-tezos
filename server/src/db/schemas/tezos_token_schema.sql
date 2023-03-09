drop table if exists tezos_token;

-- auto-generated definition
create table tezos_token
(
    id                 varchar not null
        constraint "PK_a738bf0c992558f6cfee4273492"
            primary key,
    full_name          varchar not null,
    short_name         varchar not null,
    price              integer not null,
    change             integer not null,
    total_value_locked integer not null,
    total_volume       integer not null,
    volume_for_day     integer not null,
    icon               varchar not null
);

alter table tezos_token
    owner to postgres;