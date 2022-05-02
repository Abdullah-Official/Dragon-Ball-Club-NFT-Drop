import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";


export const constantsFunc = () => {
    const address = useAddress();
    const connectMetamask = useMetamask();
    const contract_address = '0xB5Ca91326227A207a7dA22554BB3498055ca29C1'
    return {
        address,
        connectMetamask,
        contract_address
    }
}