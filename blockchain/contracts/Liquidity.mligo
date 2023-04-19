#include "Helpers.mligo"
#include "Errors.mligo"
#include "Math.mligo"
#include "Types.mligo"
#include "Consts.mligo"
#include "Transfers.mligo"
#include "Consts.mligo"

let add_pool(store, param : storage * add_pool_param) : return =
    let pool_already_exists : bool = pool_exists(store, param.addresses)
    in
    if pool_already_exists then
        failwith(error_duplicate_pools_for_one_pair)
    else
        let min_tick_data : tick_data = {
            previous = -impossible_tick;
            next = int(const_max_tick);
            liquidity_net = 0;
            sqrt_price = {
                x14 = 0n;
            }
        } in
        let max_tick_data : tick_data = {
            previous = -impossible_tick;
            next = int(const_max_tick);
            liquidity_net = 0;
            sqrt_price = {
                x14 = 0n;
            }
        } in
        let pool : pool_data = {
            sqrt_price = {
                x14 = 0n;
            };
            liquidity = 0n;
            current_tick_index = 0;
            current_tick_witness = -const_max_tick;
            new_position_id = 0n;
        } in
        let updated_pools : pool_map = Big_map.update param.addresses (Some(pool)) store.pools in
        let updated_ticks : tick_map = Big_map.update {
            pool_tokens = param.addresses;
            tick_index = -const_max_tick
        } (Some(min_tick_data)) store.ticks in
        let updated_ticks_2 : tick_map = Big_map.update {
            pool_tokens = param.addresses;
            tick_index = int(const_max_tick)
        } (Some(max_tick_data)) updated_ticks in
    ([] : operation list), {store with pools = updated_pools; ticks = updated_ticks_2}

let init_tick(store, liquidity_per_tick, pool_tokens, tick_index : storage * int * address_pair * tick_index) : storage =
    let tick_map_id : tick_map_id = {
        pool_tokens = pool_tokens;
        tick_index = tick_index;
    } in
    if tick_exists(store.ticks, tick_map_id) then
        let tick_data : tick_data = get_tick(store.ticks, tick_map_id) in
        let updated_tick_data : tick_data = {tick_data with liquidity_net = tick_data.liquidity_net + liquidity_per_tick} in
        let updated_ticks = Big_map.update tick_map_id (Some(updated_tick_data)) store.ticks in
        {store with ticks = updated_ticks}
    else
        let tick_data : tick_data = {
            previous = tick_index - store.constants.tick_spacing;
            next = tick_index + store.constants.tick_spacing;
            liquidity_net = liquidity_per_tick;
            sqrt_price = {
                x14 = get_sqrt_price_from_tick(tick_index)
            };
        } in
        let updated_ticks : tick_map = Big_map.update tick_map_id (Some(tick_data)) store.ticks in
        {store with ticks = updated_ticks}

let rec init_ticks_rec(store, liquidity_per_tick, pool_tokens, current_tick_index, upper_tick_index
    : storage * int * address_pair * tick_index * tick_index) : storage =
    if current_tick_index = upper_tick_index + 1 then
        store
    else
        let updated_store : storage = init_tick(store, liquidity_per_tick, pool_tokens, current_tick_index) in
        init_ticks_rec(updated_store, liquidity_per_tick, pool_tokens, current_tick_index + 1, upper_tick_index)

let add_liquidity(store, param : storage * add_liquidity_param) : return =
    let lower_tick_index : tick_index = get_tick_from_sqrt_price(param.price_ratio.min_price.x14) in
    let upper_tick_index : tick_index = get_tick_from_sqrt_price(param.price_ratio.max_price.x14) in
    let tick_delta : nat = assert_nat(upper_tick_index - lower_tick_index, error_invalid_price_ratio) in
    let liquidity_per_tick : int = int(floordiv(
        nsqrt(param.first_token.amount * param.second_token.amount),
        tick_delta
    )) in
    let position_liquidity : nat = assert_nat(liquidity_per_tick * tick_delta, error_not_nat) in
    let pool_tokens : address_pair = {
        first_address = param.first_token.token_address;
        second_address = param.second_token.token_address;
    } in
    let updated_ticks_store : storage = init_ticks_rec(store, liquidity_per_tick, pool_tokens, lower_tick_index, upper_tick_index) in
    let pool_data : pool_data = get_pool(updated_ticks_store, pool_tokens) in
    let new_position_map_id : position_map_id = {
        pool_tokens = pool_tokens;
        position_id = pool_data.new_position_id
    } in
    let new_position : position_data = {
        owner = Tezos.get_sender();
        lower_tick_index = lower_tick_index;
        upper_tick_index = upper_tick_index;
        liquidity = position_liquidity;
        fees = {
            first = {
                x14 = 0n;
            };
            second = {
                x14 = 0n;
            }
        };
    } in
    let updated_positions_map : position_map = Big_map.update new_position_map_id (Some(new_position)) updated_ticks_store.positions in
    let new_liquidity = pool_data.liquidity + position_liquidity in
    let updated_pool_data : pool_data = {pool_data with
        new_position_id = abs(pool_data.new_position_id + 1);
        liquidity = new_liquidity} in
    let updated_pool_map : pool_map = Big_map.update pool_tokens (Some(updated_pool_data)) updated_ticks_store.pools in
    let first_transfer : operation = getTokens(
        pool_tokens.first_address,
        Tezos.get_sender(), 
        param.first_token.amount
    ) in
    let second_transfer : operation = getTokens(
        pool_tokens.second_address,
        Tezos.get_sender(),
        param.second_token.amount
    ) in
    ([first_transfer; second_transfer]), {updated_ticks_store with
        positions = updated_positions_map;
        pools = updated_pool_map
    }

let collect_fees(store, param : storage * collect_fees_param) : return =
    let position_data : position_data = get_position(store, param.position_id) in
    let _ : unit = assert_owner(position_data.owner) in
    let new_position_data : position_data = {position_data with fees = {
        first = {
            x14 = 0n;
        };
        second = {
            x14 = 0n;
        }
    }} in
    let updated_positions : position_map = Big_map.update param.position_id (Some(new_position_data)) store.positions in
    let pair : address_pair = param.position_id.pool_tokens in
    let first_transfer : operation = transfer(
        pair.first_address,
        Tezos.get_sender(), 
        position_data.fees.first.x14
    ) in
    let second_transfer : operation = transfer(
        pair.second_address,
        Tezos.get_sender(),
        position_data.fees.second.x14
    )
    in ([first_transfer; second_transfer] : operation list), {store with positions = updated_positions}

let remove_liquidity_from_tick(store, pool_tokens, tick_index, amount : storage * address_pair * tick_index * nat) : storage =
    let tick_map_id : tick_map_id = {
        pool_tokens = pool_tokens;
        tick_index = tick_index
    } in 
    let tick_data : tick_data = get_tick(store.ticks, tick_map_id) in
    let updated_tick_data : tick_data = {tick_data with
        liquidity_net = tick_data.liquidity_net - amount
    } in
    let updated_ticks : tick_map = Big_map.update tick_map_id (Some(updated_tick_data)) store.ticks in
    {store with ticks = updated_ticks}

let rec remove_liquidity_from_tick_rec(store, pool_tokens, amount, current_tick_index, upper_tick_index
    : storage * address_pair * nat * tick_index * tick_index) : storage =
    let updated_store : storage = remove_liquidity_from_tick(store, pool_tokens, current_tick_index, amount) in
    if current_tick_index = upper_tick_index then
        updated_store
    else
        remove_liquidity_from_tick_rec(updated_store, pool_tokens, amount, current_tick_index + 1, upper_tick_index)

let remove_liquidity(store, param : storage * remove_liquidity_param) : return =
    let (list, new_store) : return = collect_fees(store, {position_id = param.position_id}) in
    let position_data : position_data = get_position(new_store, param.position_id) in
    let tick_delta : nat = assert_nat(position_data.upper_tick_index - position_data.lower_tick_index, error_invalid_price_ratio) in
    let liquidity_per_tick : nat = floordiv(
        position_data.liquidity,
        tick_delta
    ) in
    let updated_store : storage = remove_liquidity_from_tick_rec(
        new_store, param.position_id.pool_tokens, liquidity_per_tick, position_data.lower_tick_index, position_data.upper_tick_index) in
    let new_positions: position_map = Big_map.remove param.position_id  updated_store.positions
    in (list), {updated_store with positions = new_positions}