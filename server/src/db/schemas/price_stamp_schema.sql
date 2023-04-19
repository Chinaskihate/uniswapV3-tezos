drop table if exists price_stamp;

-- auto-generated definition
create table price_stamp
(
    id             serial
        constraint "PK_78573cf3ee27121b213f22910c5"
            primary key,
    time_stamp     timestamp with time zone not null,
    price          integer                  not null,
    token_address varchar
        constraint "FK_32170ce7300425c5c2e30e69d4c"
            references tezos_token
            on update cascade on delete cascade,
    constraint unique_price_stamp
        unique (time_stamp, token_address)
);

alter table price_stamp
    owner to postgres;