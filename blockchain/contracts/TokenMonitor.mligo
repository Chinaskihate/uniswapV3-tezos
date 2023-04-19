type token_data = {
    price: nat;
    total_volume: nat;
    total_value_locked: nat;
}

type token_map = (address, token_data) big_map

type storage = {
    tokens: token_map;
    exchange_address: address;
}

type return = operation list * storage

type update_price_param = {
    token_address: address;
    new_price: nat;
}

type update_total_volume_param = {
    token_address: address;
    volume_change: nat
}

type update_total_value_locked_param = unit

type add_token_data_param = {
    token_address: address;
}

type parameter =
  UpdatePrice of update_price_param
| UpdateTotalVolume of update_total_volume_param
| UpdateTotalValueLocked of update_total_value_locked_param
| AddTokenData of add_token_data_param

let find_token_data(store, token_address: storage * address) : token_data option =
    Big_map.find_opt token_address store.tokens

let assert_token_data_exists(token_data: token_data option) : token_data =
    match token_data with
        Some value -> value
    |   None -> failwith("Token not found")

let getBalance(store, token_address : storage * address) : nat = 
    match Tezos.call_view "getBalanceView" store.exchange_address token_address with
        Some value -> value
    |   None -> 0n

let update_price(store, param: storage * update_price_param) : return =
    let token_data : token_data = assert_token_data_exists(find_token_data(store, param.token_address)) in
    let new_data : token_data = {token_data with price = param.new_price} in
    let updated_map = Big_map.update param.token_address (Some(new_data)) store.tokens
    in ([] : operation list), store

let update_total_volume(store, param: storage * update_total_volume_param) : return = let some = () in ([] : operation list), store

let update_total_value_locked(store, param: storage * update_total_value_locked_param) : return = let some = () in ([] : operation list), store

let add_token_data(store, param: storage * add_token_data_param) : return =
    let existing_data : token_data option = find_token_data(store, param.token_address) in
    if Option.is_none(existing_data) then
        let updated_map = Big_map.update param.token_address (Some(
            {
                price = 0n;
                total_volume = 0n;
                total_value_locked = 0n;
            } : token_data)) store.tokens
        in
        ([] : operation list), store 
    else
        ([] : operation list), store

let main (action, store : parameter * storage) : return =
 (match action with
    UpdatePrice (n) -> update_price (store, n)
  | UpdateTotalVolume(n) -> update_total_volume(store, n)
  | UpdateTotalValueLocked(n) -> update_total_value_locked(store, n)
  | AddTokenData(n) -> add_token_data(store, n))
