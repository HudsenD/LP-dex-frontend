import React, { useEffect } from "react"
import { useState } from "react"
import { usdcToken, hdToken } from "../Interfaces/IToken"
import { usePrepareContractWrite, useContractWrite, useContractRead, useAccount, useWaitForTransaction } from "wagmi"
import { erc20abi } from "../constants/constants"
import TxAlert from "./TxAlert"

export const MintTokens = () => {
    const { address, isConnecting, isDisconnected } = useAccount()
    const [tokenAddress, setTokenAddress] = useState<string>(hdToken.address)
    const [showSuccess, setShowSuccess] = useState<boolean>(false)
    const [txMessage, setTxMessage] = useState<string>("")

    const { config } = usePrepareContractWrite({
        address: tokenAddress,
        abi: erc20abi,
        functionName: "mint",
        args: [address, "100000000000000000000"],
    })

    const mint = useContractWrite({
        ...config,
        onSuccess(data) {
            showSuccessMessage("Tx sent")
        },
    })
    const waitForMintTx = useWaitForTransaction({
        hash: mint?.data?.hash,
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
    useEffect(() => {
        console.log("Token address changed to", tokenAddress)
    }, [tokenAddress])
    return (
        <div className="w-full">
            <div className="flex justify-center w-full h-auto max-w-screen-lg mx-auto">
                <div className="items-center justify-center w-3/6 p-4 mt-16 bg-white shadow-xl h-1/2 rounded-xl">
                    <div className="text-xl font-bold text-center">Mint Tokens</div>
                    <div className="text-center">Get 100 tokens to trade with</div>
                    <div className="grid gap-3 md:grid-cols-2">
                        <select
                            className="w-full max-w-xs select select-primary"
                            onChange={(event) => {
                                setTokenAddress(event.target.value)
                            }}
                        >
                            <option value={hdToken.address}>HD</option>
                            <option value={usdcToken.address}>USDC</option>
                        </select>
                        <div className="btn" onClick={() => mint.write?.()}>
                            Mint
                        </div>
                    </div>
                </div>
                {showSuccess && <TxAlert message={txMessage} />}
            </div>
        </div>
    )
}
