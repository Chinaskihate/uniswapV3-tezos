import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PriceStamp } from '../../entities/priceStamp';

interface Props {
  data: PriceStamp[];
}

const PriceChart: React.FC<Props> = ({ data }) => {
    const chartData = data?.map(({ timeStamp, price }) => ({ date: new Date(timeStamp), price }));

    return (
        <div style={{ width: '200%', height: '50%', backgroundColor: '#1e4149' }}>
        <ResponsiveContainer>
            <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
        </div>
    );
};

export default PriceChart;
