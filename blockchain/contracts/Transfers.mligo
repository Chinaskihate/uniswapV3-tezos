#include "Errors.mligo"

type contract_transfer = address * (address * nat)

let transfer(token_address, receiver, amount: address * address * nat) : operation =
    let token_contract: contract_transfer contract =
        match (Tezos.get_entrypoint_opt "%transfer" token_address : contract_transfer contract option) with
        | None -> (failwith error_no_such_contract : contract_transfer contract)
        | Some contract -> contract in
    Tezos.transaction (Tezos.get_self_address(), (receiver, amount)) 0mutez token_contract

let getTokens(token_address, sender, amount: address * address * nat) : operation =
    let token_contract: contract_transfer contract =
        match (Tezos.get_entrypoint_opt "%transfer" token_address : contract_transfer contract option) with
        | None -> (failwith error_no_such_contract : contract_transfer contract)
        | Some contract -> contract in
    Tezos.transaction (sender, (Tezos.get_self_address(), amount)) 0mutez token_contract