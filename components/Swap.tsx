import React, { useState, useEffect } from "react"
import { usePrepareContractWrite, useContractWrite, useContractRead, useWaitForTransaction } from "wagmi"
import { dexAbi, erc20abi } from "../constants/constants"
import { IToken, hdToken, usdcToken } from "../Interfaces/IToken"
import BigNumber from "bignumber.js"
import TxAlert from "./TxAlert"

const Swap = () => {
    const [newFromToken, setNewFromToken] = useState<string>(hdToken.address)
    const [newToToken, setNewToToken] = useState<string>(usdcToken.address)
    const [newFromAmount, setNewFromAmount] = useState<number>(0)
    const [newToAmount, setNewToAmount] = useState<string>("0")
    const [poolString, setPoolString] = useState<string>(`${usdcToken.label}/${hdToken.label}`) //idk
    const [showSuccess, setShowSuccess] = useState<boolean>(false)
    const [txMessage, setTxMessage] = useState<string>("")

    let fromAmountInput = BigNumber(newFromAmount).toFixed(18).replace(".", "")
    let dataHex

    //gonna have to call calculate token swap so we can display it
    const { data } = useContractRead({
        address: "0x4aB0629c899E37828Fab6A386D6A1BFA46750C6b",
        abi: dexAbi,
        functionName: "calculateTokenSwap",
        args: [poolString, newFromToken, fromAmountInput, newToToken],
        watch: true,

        onSuccess(data) {
            let regularNumber = parseInt(data._hex, 16)
            let formattedNumber = (regularNumber / 1e18).toFixed(18)
            setNewToAmount(formattedNumber.toString())
        },
    }) as { data: any }

    // call swap function
    const { config, error } = usePrepareContractWrite({
        address: "0x4aB0629c899E37828Fab6A386D6A1BFA46750C6b",
        abi: dexAbi,
        functionName: "swap",
        //args: ["USDC/HD", newFromToken, `${newFromAmount * Math.pow(10, 18)}`], // both work, check which is more accurate
        args: ["USDC/HD", newFromToken, fromAmountInput],
    })
    const swap = useContractWrite({
        ...config,
        onSuccess(data) {
            showSuccessMessage("Tx sent")
        },
    })
    const waitForSwapTx = useWaitForTransaction({
        hash: swap?.data?.hash,
        onSuccess(data) {
            showSuccessMessage("Tx confirmed")
        },
    })

    const { config: approveConfig } = usePrepareContractWrite({
        address: newFromToken,
        abi: erc20abi,
        functionName: "approve",
        args: ["0x4aB0629c899E37828Fab6A386D6A1BFA46750C6b", fromAmountInput],
    })

    const approveToken = useContractWrite({
        ...approveConfig,
        onSuccess(data) {
            showSuccessMessage("Tx sent")
        },
    })

    const waitForApproveTx = useWaitForTransaction({
        hash: swap?.data?.hash,
        onSuccess(data) {
            showSuccessMessage("Tx confirmed")
        },
    })

    function showSuccessMessage(message: string) {
        setShowSuccess(true)
        setTxMessage(message)
        setTimeout(() => {
            setShowSuccess(false)
        }, 5000)
    }

    // gonna have to display available coins to swap to using The graph or firebase

    useEffect(() => {}, [])
    return (
        <div className="w-full">
            <div className="flex justify-center w-full h-auto max-w-screen-lg mx-auto">
                <div className="items-center justify-center w-3/6 p-4 mt-16 bg-white shadow-xl h-1/2 rounded-xl">
                    <div className="text-2xl font-semibold text-center">Swap</div>
                    <div className="grid gap-8 md:grid-cols-1">
                        <div className="flex flex-col">
                            <label className="mt-4 text-lg font-medium text-center">Sell</label>
                            <div className="relative rounded-md shadow-sm ">
                                <select
                                    className="block w-full px-3 py-2 leading-5 transition duration-150 ease-in-out rounded-md form-control"
                                    onChange={(event) => {
                                        setNewFromToken(event.target.value)
                                    }}
                                >
                                    <option value={hdToken.address}>HD</option>
                                    <option value={usdcToken.address}>USDC</option>
                                </select>
                            </div>

                            <div className="relative mt-3 rounded-md shadow-sm">
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="block w-full px-3 py-2 leading-5 transition duration-150 ease-in-out rounded-md form-input sm:text-sm sm:leading-5"
                                    onChange={(event) => {
                                        setNewFromAmount(Number(event.target.value))
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg font-medium text-center">Buy</label>
                            <div className="relative rounded-md shadow-sm">
                                <select
                                    className="block w-full px-3 py-2 leading-5 transition duration-150 ease-in-out rounded-md form-control"
                                    onChange={(event) => {
                                        setNewToToken(event.target.value)
                                    }}
                                >
                                    <option value={usdcToken.address}>USDC</option>
                                    <option value={hdToken.address}>HD</option>
                                </select>
                            </div>
                            <div className="relative mt-3 rounded-md shadow-sm">
                                <div
                                    style={{
                                        padding: "0.375rem 0.75rem",
                                        fontSize: "0.9375rem",
                                        lineHeight: "1.5",
                                        backgroundColor: "white",
                                        border: "1px solid #d2d6dc",
                                        borderRadius: "0.375rem",
                                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                                    }}
                                >
                                    <div>{newFromToken == newToToken ? "Change Tokens" : newToAmount}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        {error && error.message && error.message.includes("ERC20: insufficient allowance") ? (
                            <button
                                disabled={newFromToken == newToToken}
                                onClick={() => approveToken.write?.()}
                                className="px-8 py-3 text-white bg-yellow-500 rounded-lg disabled:bg-gray-500"
                            >
                                Approve Tokens
                            </button>
                        ) : (
                            <button
                                disabled={newFromToken == newToToken}
                                onClick={() => swap.write?.()}
                                className="px-8 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:bg-gray-500"
                            >
                                Swap
                            </button>
                        )}
                        {error && error.message && !error.message.includes("ERC20: insufficient allowance") && (
                            <div>An error occurred preparing the transaction: {error.message}</div>
                        )}
                    </div>
                </div>
                {showSuccess && <TxAlert message={txMessage} />}
            </div>
        </div>
    )
}

export default Swap
