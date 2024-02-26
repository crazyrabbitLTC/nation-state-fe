import React, { useEffect, useState } from 'react';
import { useAccount , useEnsName} from 'wagmi'

const CurrentlyConnectedWallet: React.FC = () => {
    const account = useAccount()
    const ensName = useEnsName({
        address: account?.address,
      })

      console.log("🚀 ~ ensName:", ensName)

    const [buttonText, setButtonText] = useState('Connect Wallet');

    const handleClick = () => {
        setButtonText('Connected!');
    };

    useEffect(() => {
        if (account.address) {
            setButtonText(account.address)
        }
        if (ensName.data) {
            setButtonText(ensName.data)
        }
    }, [])

    return (
        <button className="btn btn-sm btn-default mt-5" onClick={handleClick}>
            {buttonText}
        </button>
    );
};

export default CurrentlyConnectedWallet;
