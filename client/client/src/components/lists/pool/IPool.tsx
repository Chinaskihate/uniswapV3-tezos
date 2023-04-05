import React from 'react';

interface Pool {
    id: number;
    tokenPair: string;
    minValue: number;
    maxValue: number;
    percentage: number;
}
export default Pool;