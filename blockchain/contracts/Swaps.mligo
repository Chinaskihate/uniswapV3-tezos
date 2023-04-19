#include "Helpers.mligo"
#include "Math.mligo"
#include "Transfers.mligo"
#include "Errors.mligo"
#include "Consts.mligo"

let calculate_new_current_tick_index(p : calculate_new_current_tick_index_params) : int =
   let xtot: nat = floordiv (p.liquidity, p.sqrt_price_old) in
   let ytot: nat = p.liquidity * p.sqrt_price_old in
   let d_second: nat = (abs(p.sqrt_price_new - p.sqrt_price_old)) * p.liquidity in
   let numroot: nat = nsqrt ((xtot + p.d_first) * (ytot + d_second)) in
   let logparam = p.sqrt_price_old + floordiv (numroot, p.d_first) in
   let return_val: int = 1 * index_from_price_half_log_coef_const * log_10 logparam in
   return_val


let rec swap_rec(p: swap_rec_param) : swap_rec_param =
   let pool = get_pool(p.store, p.addresses) 
   in
   if pool.liquidity = 0n then
      failwith(error_empty_liquidity)
   else
      let fee : nat = ceildiv(p.d_first, p.store.constants.fee_bps)
      in
      let sqrt_price_new = sqrt_price_move_first(
         pool.liquidity,
         pool.sqrt_price,
         assert_nat(
            p.d_first - fee,
            error_too_high_fee
         )
      )
      in
      let cur_tick_index_new = calculate_new_current_tick_index (
         {
            sqrt_price_old = pool.sqrt_price.x14;
            sqrt_price_new = sqrt_price_new.x14; 
            d_first = p.d_first;
            liquidity = pool.liquidity
          }) in

      if cur_tick_index_new >= pool.current_tick_witness then
         let dy : nat = assert_nat (pool.sqrt_price.x14 - sqrt_price_new.x14, error_not_nat) * pool.liquidity in
         let new_pool : pool_data = {
            pool with
               sqrt_price = sqrt_price_new;
               current_tick_index = cur_tick_index_new;
            } in
         let new_pools : pool_map = Big_map.update p.addresses (Some(new_pool)) p.store.pools in
         let new_store : storage = {p.store with
            pools = new_pools;
         } in
         {p with store = new_store; d_first = 0n; d_second = p.d_second + dy}
      else 
         let current_tick_map_id : tick_map_id = {
            pool_tokens = p.addresses;
            tick_index = pool.current_tick_witness;
         } in
         let tick = get_tick(p.store.ticks, current_tick_map_id) in
         let lo_new = tick.previous in
         let sqrt_price_new = {
            x14 = assert_nat (tick.sqrt_price.x14 - 1n, error_not_nat)
         } in
         let dy : nat = assert_nat (pool.sqrt_price.x14 - sqrt_price_new.x14, error_not_nat) * pool.liquidity in
         let dx_for_dy = ceildiv (dy, pool.sqrt_price.x14 * sqrt_price_new.x14) in
         let dx_numerator: nat = assert_nat (10000n - p.store.constants.fee_bps, error_not_nat) in
         let dx_consumed = ceildiv ((dx_for_dy * 10000n), dx_numerator) in
         let fee = assert_nat (dx_consumed - dx_for_dy, error_internal_fee) in
         let new_pool : pool_data = {
            pool with
               sqrt_price = sqrt_price_new;
               current_tick_index = cur_tick_index_new;
            } in
         let new_pools : pool_map = Big_map.update p.addresses (Some(new_pool)) p.store.pools in
         let new_store : storage = {p.store with
            pools = new_pools;
         } in
         let p_new = {p with store = new_store; d_first = assert_nat (p.d_first - dx_consumed, error_not_nat); d_second = p.d_second + dy} in
         swap_rec p_new

let update_storage_swap(store, swap_param: storage * swap_param) : (nat * nat * storage) =
   let r = swap_rec(
      {
         store = store;
         addresses = {
            first_address = swap_param.sell.token_address;
            second_address = swap_param.receive.token_address;
         };
         d_second = swap_param.receive.min_amount;
         d_first = swap_param.sell.amount;
      }
   ) in
   let first_spent = assert_nat(swap_param.sell.amount - r.d_first, error_not_nat) in
   let second_spent = floordiv(r.d_second, 10000n) in
   (r.d_first, r.d_second, r.store)

let swap(store, param : storage * swap_param) : return =
   let (d_first, d_second, s_new) = update_storage_swap(store, param) in
   let second_transfer : operation = transfer(
      param.sell.token_address,
      Tezos.get_self_address(),
      d_second
   ) in
   let first_transfer : operation = transfer(
      param.receive.token_address,
      Tezos.get_sender(),
      d_first
   ) in
   ([first_transfer; second_transfer] : operation list), s_new