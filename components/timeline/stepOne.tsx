import React, { use } from "react";
import { useState, useEffect } from "react";
import { useAccount, useEnsName } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useGetCountryByAddress from "../../utils/hooks/useGetCountryByAddress";

type WalletState = {};
const StepOne: React.FC = () => {
  // Your component logic here
  const account = useAccount();
  return (
    <>
      <li className="pt-20">
        <div className="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="timeline-start md:text-end mb-10">
          <time className="font-mono italic">Step 1</time>
          <div className="text-lg font-black">
            Verify your Nationality on Coinbase
          </div>
          The address you are connected with{" "}
          {account?.address ? (
            <CurrentlyConnectedWallet />
          ) : (
            <CustomConnectButton />
          )}{" "}
          is <WalletAffiliation /> with any nation. Nation State currently uses
          the Coinbase Country attestation powered by the Ethereum Attestation
          Service. Coinbase vouches that you are a Coinbase user and have
          submited the proper paperwork to prove your nationality. <br />
          <a href="https://www.coinbase.com/onchain-verify" target="_blank" rel="noopener noreferrer">
            <button className="btn btn-sm btn-primary mt-10">
              Visit Coinbase to Verify
            </button>
          </a>
        </div>
        <hr />
      </li>
    </>
  );
};

export default StepOne;

const WalletAffiliation: React.FC = () => {
  const account = useAccount();

  const [buttonText, setButtonText] = useState("Connect Wallet");
  const [buttonStyle, setButtonStyle ] = useState("btn btn-sm btn-warning mt-5");

  const country = useGetCountryByAddress(account?.address);

  useEffect(() => {
    if (country.data) {
      setButtonText(country.data);
      setButtonStyle("btn btn-sm btn-default mt-5");
    } else if (account.address) {
      setButtonText("Not affiliated");
      setButtonStyle("btn btn-sm btn-warning mt-5");
    }
  }, [country.data, account.address]);

  return (
    <button
      className={buttonStyle}
    >
      {buttonText}
    </button>
  );
};

const CurrentlyConnectedWallet: React.FC = () => {
  const account = useAccount();
  const ensName = useEnsName({
    address: account?.address,
  });

  const [buttonText, setButtonText] = useState("Connect Wallet");

  useEffect(() => {
    if (account.address) {
      setButtonText(account.address);
    }
    if (ensName.data) {
      setButtonText(ensName.data);
    }
  }, [account.address, ensName.data]);

  return <button className="btn btn-sm btn-info mt-5">{buttonText}</button>;
};

const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = ready && account && chain;
        return (
          <div className="inline-block"
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="btn btn-sm btn-primary mt-10 inline-block"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    className="btn btn-sm btn-default mt-5"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    className="btn btn-sm btn-info mt-5"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <button
                    className="btn btn-sm btn-default mt-5"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
