export interface IToken {
    label: string
    address: string
}

const hdToken: IToken = {
    label: "HD",
    address: "0x64f002Ce2eaC118f3fFCb549bAfD7e7F0CD9bF7B",
}

const usdcToken: IToken = {
    label: "USDC",
    address: "0x46f2af63aF5866980214D73699a117011909357E",
}

export { hdToken, usdcToken }
