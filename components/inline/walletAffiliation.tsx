import React, { useState } from 'react';
import useGetCountry from '../../utils/hooks/useGetCountryByAddress';

const WalletAffiliation: React.FC = () => {
    const [buttonText, setButtonText] = useState('Connect Wallet');

    const handleClick = () => {
        setButtonText('Connected!');
    };

    return (
        <button className="btn btn-sm btn-default mt-5" onClick={handleClick}>
            {buttonText}
        </button>
    );
};

export default WalletAffiliation;
