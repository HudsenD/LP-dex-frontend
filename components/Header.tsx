import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useIsMounted } from "../hooks/useIsMounted"

const Header = () => {
    const mounted = useIsMounted()
    const { address } = useAccount() //this is how you get user connected address
    // use mounted for showing things only after mounted is true. prevents hydration error.
    return (
        <div className="w-full">
            <div className="max-w-screen-lg mx-auto justify-center w-full h-auto border-b-4 border-slate-400">
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-2xl font-mono font-bold text-gray-700 mt-3">SolventSwap</div>
                    <Link href={"/"}>
                        <p className="m-4 py-3 text-lg font-bold font-mono text-center text-gray-700 bg-slate-400 rounded-lg cursor-pointer">
                            Swaps
                        </p>
                    </Link>
                    <Link href={"/pools"}>
                        <p className=" m-4 py-3 text-lg font-bold font-mono text-center text-gray-700 bg-slate-400 rounded-lg cursor-pointer">
                            Pools
                        </p>
                    </Link>

                    <div className="m-4">
                        <ConnectButton />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
