import React from "react"

//Will display current stats on a pool, option to add liquidity to the pool.
// this will be the individual pool component, the pools.tsx page will call the graph, loop through and add this pool component for each.

const Pool: React.FC<{ pairName: string; tvl: number }> = ({ pairName, tvl }) => {
    return (
        <div className="w-full max-w-sm mx-auto my-8 rounded-lg shadow-lg">
            <div className="p-4">
                <div className="text-lg font-medium">{pairName}</div>
                <div className="text-sm font-medium">TVL: {tvl}</div>
            </div>
            <div className="flex justify-between p-4 bg-gray-200">
                <button className="btn-green">Add Liquidity</button>
                <button className="btn-blue">Trade</button>
            </div>
        </div>
    )
}

export default Pool
