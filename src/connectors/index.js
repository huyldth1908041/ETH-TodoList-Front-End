import {InjectedConnector} from "@web3-react/injected-connector";
import {Web3Provider} from "@ethersproject/providers";
//injected connector = connect via metamask
export const injectedConnector = new InjectedConnector({
    supportedChainIds: [
        4, // Rinkeby
    ],
})

export function getLibrary(provider) {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
}