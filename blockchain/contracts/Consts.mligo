#include "Errors.mligo"

let const_max_tick : nat = 200n

let impossible_tick : nat = const_max_tick + 1n

// log_1,05_(10)
let index_from_price_half_log_coef_const : nat = 94n

let index_from_price_log_coef_const : nat = index_from_price_half_log_coef_const * 2n

// index_from_price_half_log_coef_const * log_10_(2^14)
let index_from_price_minus_const : nat = 396n

let ladder = Big_map.literal
[ (-50, 5144n); 
(-49, 5265n); 
(-48, 5388n); 
(-47, 5514n); 
(-46, 5644n); 
(-45, 5776n); 
(-44, 5911n); 
(-43, 6050n); 
(-42, 6192n); 
(-41, 6337n); 
(-40, 6485n); 
(-39, 6637n); 
(-38, 6793n); 
(-37, 6952n); 
(-36, 7115n); 
(-35, 7282n); 
(-34, 7453n); 
(-33, 7627n); 
(-32, 7806n); 
(-31, 7989n); 
(-30, 8176n); 
(-29, 8368n); 
(-28, 8564n); 
(-27, 8765n); 
(-26, 8970n); 
(-25, 9180n); 
(-24, 9396n); 
(-23, 9616n); 
(-22, 9841n); 
(-21, 10072n); 
(-20, 10308n); 
(-19, 10550n); 
(-18, 10797n); 
(-17, 11050n); 
(-16, 11309n); 
(-15, 11574n); 
(-14, 11845n); 
(-13, 12123n); 
(-12, 12407n); 
(-11, 12698n); 
(-10, 12995n); 
(-9, 13300n); 
(-8, 13612n); 
(-7, 13931n); 
(-6, 14257n); 
(-5, 14591n); 
(-4, 14933n); 
(-3, 15283n); 
(-2, 15642n); 
(-1, 16008n); 
(0, 16384n); 
(1, 16768n); 
(2, 17161n); 
(3, 17563n); 
(4, 17974n); 
(5, 18396n); 
(6, 18827n); 
(7, 19268n); 
(8, 19720n); 
(9, 20182n); 
(10, 20655n); 
(11, 21139n); 
(12, 21634n); 
(13, 22142n); 
(14, 22660n); 
(15, 23192n); 
(16, 23735n); 
(17, 24291n); 
(18, 24861n); 
(19, 25443n); 
(20, 26040n); 
(21, 26650n); 
(22, 27275n); 
(23, 27914n); 
(24, 28568n); 
(25, 29238n); 
(26, 29923n); 
(27, 30624n); 
(28, 31342n); 
(29, 32077n); 
(30, 32829n); 
(31, 33598n); 
(32, 34386n); 
(33, 35191n); 
(34, 36016n); 
(35, 36860n); 
(36, 37724n); 
(37, 38609n); 
(38, 39513n); 
(39, 40440n); 
(40, 41387n); 
(41, 42357n); 
(42, 43350n); 
(43, 44366n); 
(44, 45406n); 
(45, 46470n); 
(46, 47559n); 
(47, 48674n); 
(48, 49815n); 
(49, 50982n); 
(50, 52177n); 
]


let get_sqrt_price_from_tick(tick_index : int) : nat =
    match Big_map.find_opt tick_index ladder with
        Some value -> value
    |   None -> failwith(error_tick_not_exist)

let rec get_tick_from_sqrt_price_rec(tick_price, tick_index : nat * int) : int =
    let price_temp: nat = get_sqrt_price_from_tick tick_index in
    if (price_temp > tick_price) then
        (tick_index - 1)
    else
        get_tick_from_sqrt_price_rec(tick_price, tick_index + 1)

let get_tick_from_sqrt_price(tick_price:nat): int = 
    get_tick_from_sqrt_price_rec(tick_price, -50)