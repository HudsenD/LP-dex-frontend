import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useIsMounted } from "../hooks/useIsMounted"

const Header = () => {
    const mounted = useIsMounted()
    const { address } = useAccount() //this is how you get user connected address
    // use mounted for showing things only after mounted is true. prevents hydration error.
    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between max-w-screen-lg mx-auto">
                <div className="flex items-center">
                    <a href="/">
                        <div
                            className="text-4xl font-bold "
                            style={{
                                backgroundImage: "linear-gradient(to right, #8de4af, #00c1de)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            SolventSwap
                        </div>
                    </a>
                </div>
                <div className="flex items-center justify-center">
                    <Link href={"/"} passHref>
                        <div className="mx-12 text-lg font-medium text-cyan-400 hover:text-gray-300">Swaps</div>
                    </Link>
                    <Link href={"/pools"} passHref>
                        <div className="mx-12 text-lg font-medium text-cyan-400 hover:text-gray-300">Pools</div>
                    </Link>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-grow"></div>
                    <div className="flex items-center ">
                        <ConnectButton />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
