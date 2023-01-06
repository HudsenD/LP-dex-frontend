import "@rainbow-me/rainbowkit/styles.css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"

const alchemyApiKey: any = process.env.ALCHEMY_API_KEY

//Chains we are going to support
// "Connectors" for these clients
// WagmiClient

const { chains, provider } = configureChains(
    [chain.goerli, chain.polygon],
    [alchemyProvider({ apiKey: alchemyApiKey })]
)

const { connectors } = getDefaultWallets({
    appName: "SolventSwap",
    chains,
})

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <Component {...pageProps} />
            </RainbowKitProvider>
        </WagmiConfig>
    )
}
