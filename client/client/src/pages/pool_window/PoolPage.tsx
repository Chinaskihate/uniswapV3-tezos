import React, { useState, useEffect } from 'react';
import './PoolPage.module.css';

interface Pool {
  id: number;
  tokenPair: string;
  minValue: number;
  maxValue: number;
  percentage: number;
}

const PoolPage: React.FC = () => {
  const [Pools, setPools] = useState<Pool[]>([]);

  useEffect(() => {
    // Fetch liquidity pools from API or other data source
    const fetchedPools: Pool[] = [
      {
        id: 1,
        tokenPair: 'ETH/BTC',
        minValue: 10,
        maxValue: 100,
        percentage: 1,
      },
      {
        id: 2,
        tokenPair: 'Token 2 / Token 3',
        minValue: 50,
        maxValue: 500,
        percentage: 1,
      },
      {
        id: 3,
        tokenPair: 'Token 1 / Token 3',
        minValue: 100,
        maxValue: 1000,
        percentage: 1,
      },
    ];

    setPools(fetchedPools);
  }, []);

  return (
    <div className="pools-container">
      <h1>Liquidity Pools</h1>
      <div className="pools-list">
        {Pools.map((pool) => (
          <div className="pool-card" key={pool.id}>
            <h2>{pool.tokenPair}</h2>
            <div className="pool-info">
              <p>Min Value: {pool.minValue}</p>
              <p>Max Value: {pool.maxValue}</p>
              <p>Percentage: {pool.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoolPage;
