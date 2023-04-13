import React, {FC} from 'react';
import './Pool.css';
import PoolElement from './Pool';
import Pool from "./IPool";

interface Props {
    pools: Pool[];
    onClick: (pool: Pool) => void;
}

const PoolList: FC<Props> = ({pools, onClick}) => {
    return (
        <div className="pool-list-container">
            <ul className="pool-list">
            {pools.map((pool) => (
                <div className='mb-3' key={pool.id} onClick={() => onClick(pool)}>
                    <PoolElement {...pool} />
                </div>
            ))}
            </ul>
        </div>
    );
};

export default PoolList;