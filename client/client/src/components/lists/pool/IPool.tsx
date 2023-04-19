import React from 'react';

interface Position {
    id: number;
    firstToken: string;
    secondToken: string;
    firstTokenShort: string;
    secondTokenShort: string;
    firstTokenAddress: string;
    secondTokenAddress: string;
    firstTokenVal: number;
    secondTokenVal: number;
    minValue: number;
    maxValue: number;
    firstFeeEarned: number;
    secondFeeEarned: number;
}
export default Position;