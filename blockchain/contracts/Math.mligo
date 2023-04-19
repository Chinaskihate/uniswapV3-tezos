#include "Types.mligo"

let ceildiv(numerator, denominator: nat * nat) : nat = abs((- numerator) / (int denominator))

let floordiv(numerator, denominator: nat * nat) : nat = numerator / denominator

let rec fast_power : nat -> nat -> nat -> nat = fun a b result ->
    if b = 0n then result
    else 
        let result = if (b land 1n) = 1n then result * a else result in
        let b = b lsr 1n in
        let a = a * a in
        fast_power a b result

(** Nat power 'x ^ y' *)
let power (x, y : nat * nat) : nat = fast_power x y 1n

(** Nat log_10 *)
let log_10 (x : nat) : nat =
    let rec check_power(x, i : nat * nat) : nat =
        if (x mod power(10n, i) > 0n && x / power(10n, i) = 0n) then
            abs(i - 1n)
        else
            check_power(x, i + 1n)
    in 
    check_power(x, 1n)


(** Nat square root *)
let nsqrt (y: nat) : nat =
    if y > 3n then
        let z = y in
        let x = y / 2n + 1n in
        let rec iter (x, y, z: nat * nat * nat): nat =
            if x < z then
                iter ((y / x + x) / 2n, y, x)
            else
                z
        in
        iter (x, y, z)
    else if y <> 0n then
        1n
    else
        0n

let new_x14n(x : nat) : x14n = {
    x14 = Bitwise.shift_left x 14n
}

let nat_after_x14n(x: nat) : nat =
    let x14n : x14n = {x14 = Bitwise.shift_left x 14n} in
    x14n.x14

// let calc_sqrt_price_from_tick_index(tick_index : tick_index) : x80n = 