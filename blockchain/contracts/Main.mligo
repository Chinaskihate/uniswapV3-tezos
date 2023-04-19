#include "Types.mligo"
#include "Swaps.mligo"
#include "Liquidity.mligo"
#include "Types.mligo"
#include "Errors.mligo"

(* Main access point that dispatches to the entrypoints according to
   the smart contract parameter. *)

let main (action, store : parameter * storage) : return =
 (match action with
    Swap (n) -> swap (store, n)
  | AddLiquidity(n) -> add_liquidity(store, n)
  | AddPool(n) -> add_pool(store, n)
  | CollectFees(n) -> collect_fees(store, n)
  | RemoveLiquidity(n) -> remove_liquidity(store, n))