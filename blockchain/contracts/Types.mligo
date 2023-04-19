type x14n = { x14 : nat }

type fees_nat_x14 = {
    first: x14n;
    second: x14n
}

type tick_index = int
type position_id = nat

type token_data = {
    name: string;
}

type address_pair = {
    first_address: address;
    second_address: address;
}

type tick_data = {
    previous: tick_index;
    next: tick_index;
    liquidity_net: int;
    sqrt_price: x14n;
}

type position_data = {
    owner: address;
    lower_tick_index: tick_index;
    upper_tick_index: tick_index;
    liquidity: nat;
    fees: fees_nat_x14;
}

type tick_map_id = {
  pool_tokens: address_pair;
  tick_index: tick_index;
}

type calculate_new_current_tick_index_params = {
    sqrt_price_old: nat;
    sqrt_price_new: nat;
    d_first: nat;
    liquidity: nat;
}

type position_map_id = {
  pool_tokens: address_pair;
  position_id: position_id;
}

type pool_data = {
    sqrt_price: x14n;
    liquidity: nat;
    current_tick_index: tick_index;
    current_tick_witness: tick_index;
    new_position_id: position_id;
}

type constants = {
    fee_bps: nat;
    tick_spacing: nat;
}

type tick_map = (tick_map_id, tick_data) big_map
type position_map = (position_map_id, position_data) big_map
type token_map = (address, token_data) big_map
type pool_map = (address_pair, pool_data) big_map

type storage = {
    available_tokens: token_map;
    pools: pool_map;
    ticks: tick_map;
    positions: position_map;
    constants: constants;
}

type return = operation list * storage

// Method parameters
type swap_rec_param = {
    store: storage;
    addresses: address_pair;
    d_first: nat;
    d_second: nat;
}

// Entrypoint Parameters

type sell_token_param = {
    token_address: address;
    amount: nat;
}

type receive_token_param = {
    token_address: address;
    min_amount: nat;
}

type swap_param = {
    receive: receive_token_param;
    sell: sell_token_param;
}

type token_liquidity = {
  token_address: address;
  amount: nat;
}

type price_ratio = {
  min_price: x14n;
  max_price: x14n;
}

type add_liquidity_param = {
    first_token: token_liquidity;
    second_token: token_liquidity;
    price_ratio: price_ratio;
}

type add_pool_param = {
    addresses: address_pair
}

type collect_fees_param = {
    position_id: position_map_id
}

type remove_liquidity_param = {
    position_id: position_map_id
}

type parameter =
  Swap of swap_param
| AddLiquidity of add_liquidity_param
| AddPool of add_pool_param
| CollectFees of collect_fees_param
| RemoveLiquidity of remove_liquidity_param