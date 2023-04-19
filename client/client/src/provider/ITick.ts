import React from 'react';

interface Tick {
    id: number;
    firstToken: string;
    secondToken: string;
    liquidity_net: number;
    next: number;
    previous: number;   
    sqrt_price: number;
}
export default Tick;