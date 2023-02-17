-- auto-generated definition
create table price_stamp
(
    id         serial
        constraint "PK_78573cf3ee27121b213f22910c5"
            primary key,
    time_stamp timestamp with time zone not null,
    price      integer                  not null,
    "tokenId"  integer
        constraint "FK_17a3c160e633f54cd502017692e"
            references tezos_token,
    constraint unique_price_stamp
        unique (time_stamp, "tokenId")
);

alter table price_stamp
    owner to postgres;
