--DEV ONLY
insert into tezos_token values(1, 'TestToken1', 'Test1', 'TestAddress1', 10, 5, 0, 0, 0, 'base64string1');
insert into tezos_token values(2, 'TestToken2', 'Test2', 'TestAddress2', 228, 356, 4, 0, 0, 'base64string2');
insert into tezos_token values(3, 'TestToken3', 'Test3', 'TestAddress3', 1288, 15, 0, 1, 0, 'base64string3');

insert into price_stamp (time_stamp, price, "tokenId")
values (now(), 1, 1);

insert into price_stamp (time_stamp, price, "tokenId")
values (now(), 3, 2);

insert into price_stamp (time_stamp, price, "tokenId")
values (now(), 81, 3);

insert into price_stamp (time_stamp, price, "tokenId")
values (now(), 33, 1);

insert into price_stamp (time_stamp, price, "tokenId")
values (now(), 58, 2);

insert into price_stamp (time_stamp, price, "tokenId")
values (now(), 567, 3);
