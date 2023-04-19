#include "Errors.mligo"
#include "Math.mligo"
#include "Types.mligo"

let assert_nat(x, error: int * string) : nat =
    match is_nat x with
        Some n -> n
    |   None -> (failwith error : nat)

let reverse_address_pair(addresses: address_pair) : address_pair = {
    first_address = addresses.second_address;
    second_address = addresses.first_address;
}

let get_pool(store, addresses: storage * address_pair) : pool_data =
    let first_pool : pool_data option = match Big_map.find_opt addresses store.pools with
        Some value -> Some(value)
    |   None -> None
    in
    let reversed_pair : address_pair = reverse_address_pair(addresses)
    in
    let second_pool : pool_data option = match Big_map.find_opt reversed_pair store.pools with
        Some value -> Some(value)
    |   None -> None
    in
    if Option.is_none(first_pool) then
        match second_pool with
            Some value -> value
        |   None -> failwith(error_no_such_pool)
    else if Option.is_none(second_pool) then
        Option.unopt(first_pool)
    else
        failwith(error_duplicate_pools_for_one_pair)
    
let get_position(store, position_map_id: storage * position_map_id) : position_data =
    let addresses : address_pair = position_map_id.pool_tokens in
    let position_id : position_id = position_map_id.position_id in
    let first_position : position_data option = match Big_map.find_opt position_map_id store.positions with
        Some value -> Some(value)
    |   None -> None in
    let reversed_pair : address_pair = reverse_address_pair(addresses) in
    let second_positon : position_data option = match Big_map.find_opt {
        pool_tokens = reversed_pair;
        position_id = position_id
    } store.positions with
        Some value -> Some(value)
    |   None -> None
    in
    if Option.is_none(first_position) then
        match second_positon with
            Some value -> value
        |   None -> failwith(error_no_such_position)
    else if Option.is_none(second_positon) then
        Option.unopt(first_position)
    else
        failwith(error_no_such_position)

let pool_exists(store, addresses: storage * address_pair) : bool =
    let first_pool : pool_data option = match Big_map.find_opt addresses store.pools with
        Some value -> Some(value)
    |   None -> None
    in
    let reversed_pair : address_pair = reverse_address_pair(addresses)
    in
    let second_pool : pool_data option = match Big_map.find_opt reversed_pair store.pools with
        Some value -> Some(value)
    |   None -> None
    in
    if Option.is_none(first_pool) then
        match second_pool with
            Some value -> true
        |   None -> false
    else if Option.is_none(second_pool) then
        true
    else
        failwith(error_duplicate_pools_for_one_pair)

let assert_owner(owner: address) : unit =
    if Tezos.get_sender() = owner then
        ()
    else
        failwith(error_invalid_owner)


let get_tick (ticks, index : tick_map * tick_map_id) : tick_data =
    match Big_map.find_opt index ticks with
    | None -> failwith error_tick_not_exist
    | Some state -> state

let tick_exists (ticks, tick_map_id : tick_map * tick_map_id) : bool =
    match Big_map.find_opt tick_map_id ticks with
    | None -> false
    | Some state -> true

let sqrt_price_move_first(liquidity, sqrt_price_old, d_first: nat * x14n * nat) : x14n =
    let numerator : nat = nat_after_x14n(liquidity * sqrt_price_old.x14) in
    let denominator : nat = nat_after_x14n(liquidity) + d_first * sqrt_price_old.x14 in
    let sqrt_price_new : x14n = {
        x14 = floordiv(
            numerator,
            denominator
        )
    }
    in
    sqrt_price_new