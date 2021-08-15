import {useWeb3React} from "@web3-react/core";
import {injectedConnector} from "../connectors";

const Wallet = () => {
    const {  account, activate, active } = useWeb3React()

    const onClick = () => {
        activate(injectedConnector)
    }

    return (
        <div>
            {active ? (
                <div>{account}</div>
            ) : (
                <button type="button" onClick={onClick} className="connect-wallet-btn">
                    Connect to wallet
                </button>
            )}
        </div>
    )
}

export default Wallet