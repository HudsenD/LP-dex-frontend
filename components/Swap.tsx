import React, { useState } from "react"
import { usePrepareContractWrite, useContractWrite } from "wagmi"

const Swap = () => {
    const [newFromToken, setNewFromToken] = useState<string>("Link")
    const [newToToken, setNewToToken] = useState<string>("USDC")
    const [newFromAmount, setNewFromAmount] = useState<number>(0)

    // gonna have to call calculate token swap so we can display it
    // gonna have to call swap function
    // gonna have to display available coins to swap to using The graph or firebase
    // gonna need to switch decimal before putting into solidity/contract

    return (
        <div className="w-full">
            <div className="justify-center w-full h-auto max-w-screen-lg mx-auto">
                <div className="items-center justify-center w-3/6 p-4 mt-16 shadow-xl h-1/2 shadow-gray-400 rounded-xl">
                    <div className="text-xl font-bold">Swap</div>
                    <div className="grid gap-8 md:grid-cols-1">
                        <div>
                            From:
                            <select
                                className="p-2"
                                onChange={(event) => {
                                    setNewFromToken(event.target.value)
                                }}
                            >
                                <option value="Link">Link</option>
                                <option value="USDC">USDC</option>
                            </select>
                            Amount:
                            <input
                                type="number"
                                placeholder="0"
                                onChange={(event) => {
                                    setNewFromAmount(Number(event.target.value))
                                }}
                            />
                        </div>
                        <h1>
                            To:
                            <select
                                className="p-2"
                                onChange={(event) => {
                                    setNewToToken(event.target.value)
                                }}
                            >
                                <option value="USDC">USDC</option>
                                <option value="Link">Link</option>
                            </select>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Swap
