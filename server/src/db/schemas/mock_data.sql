--DEV ONLY
insert into tezos_token (id, full_name, short_name, price, change_for_day, total_value_locked, total_volume, volume_for_day, icon)
values('KT1BxxxoQHayxdvtyLuFGYzWypfawARu7EHG', 'TestToken1', 'Test1', 0, 0, 0, 0, 0, 'base64string1');

insert into tezos_token (id, full_name, short_name, price, change_for_day, total_value_locked, total_volume, volume_for_day, icon)
values('TestAddress1', 'TestToken2', 'Test2', 101, 533, 0, 0, 0, 'base64string2');

insert into tezos_token (id, full_name, short_name, price, change_for_day, total_value_locked, total_volume, volume_for_day, icon)
values('TestAddress3', 'TestToken3', 'Test3', 666, 5, 0, 10, 0, 'base64string3');

insert into price_stamp (time_stamp, price, token_address)
values (now(), 81, 'TestAddress2');

insert into price_stamp (time_stamp, price, token_address)
values (now(), 33, 'TestAddress2');

insert into price_stamp (time_stamp, price, token_address)
values (now(), 58, 'TestAddress3');

insert into price_stamp (time_stamp, price, token_address)
values (now(), 567, 'TestAddress3');
insert into tezos_admin(login, hashed_password, salt)
values ('admin',
        '$2b$05$0VBgsgGjyC4GnxQAN5rLwuJJ0SJiU9Uz/ZSA8njf/HgV67eviiYJy',
        '$2b$05$0VBgsgGjyC4GnxQAN5rLwu')
