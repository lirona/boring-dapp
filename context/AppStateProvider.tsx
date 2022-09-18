import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { Contract, ethers } from "ethers";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";
import SeedsOnEarthContractService from "../utils/SeedsOnEarthContractService";

type Props = { children: React.ReactNode };

type AppStateContextType = {
  web3Auth: Web3Auth | null;
  provider: SafeEventEmitterProvider | null;
  ethersProvider: ethers.providers.Web3Provider | null;
  contractService: SeedsOnEarthContractService | null;
  login: () => void;
  logout: () => void;
  signMessage: () => void;
  user: any | null;
  contract: Contract;
};

const AppStateContext = createContext<AppStateContextType>({
  web3Auth: null,
  provider: null,
  ethersProvider: null,
  contractService: null,
  login: () => {},
  logout: () => {},
  signMessage: () => {},
  user: null,
  contract: new Contract(CONTRACT_ADDRESS, CONTRACT_ABI),
});

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID; // get from https://dashboard.web3auth.io

const AppStateProvider = ({ children }: Props) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [
    ethersProvider,
    setEthersProvider,
  ] = useState<ethers.providers.Web3Provider | null>(null);
  const [
    contractService,
    setContractService,
  ] = useState<SeedsOnEarthContractService | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [contract, setContract] = useState<Contract>(
    new Contract(CONTRACT_ADDRESS, CONTRACT_ABI)
  );

  useEffect(() => {
    const init = async () => {
      try {
        const web3Auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
            rpcTarget: process.env.NEXT_PUBLIC_NETWORK_RPC_URL, // This is the public RPC we have added, please pass on your own endpoint while creating an Login
            displayName: process.env.NEXT_PUBLIC_NETWORK_NAME,
            blockExplorer: "https://alfajores-blockscout.celo-testnet.org",
            ticker: "CELO",
            tickerName: "CELO",
          },
          uiConfig: {
            appLogo: "/logo.png",
            loginMethodsOrder: [
              "google",
              "facebook",
              "discord",
              "twitch",
              "email_passwordless",
            ],
          },
        });

        setWeb3auth(web3Auth);

        await web3Auth.initModal({
          modalConfig: {
            openlogin: {
              label: "openlogin",
              loginMethods: {
                twitter: { showOnModal: false, name: "" },
                reddit: { showOnModal: false, name: "" },
                apple: { showOnModal: false, name: "" },
                line: { showOnModal: false, name: "" },
                github: { showOnModal: false, name: "" },
                kakao: { showOnModal: false, name: "" },
                linkedin: { showOnModal: false, name: "" },
                weibo: { showOnModal: false, name: "" },
                wechat: { showOnModal: false, name: "" },
              },
            },
          },
        });
        if (web3Auth.provider) {
          setProvider(web3Auth.provider);
        } else {
          toast.error("Sign in to continue");
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (provider) {
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      setEthersProvider(ethersProvider);
    }
  }, [provider]);

  useEffect(() => {
    if (ethersProvider) {
      setContractService(new SeedsOnEarthContractService(ethersProvider));
    }
    if (web3auth && ethersProvider) {
      const signer = ethersProvider.getSigner();

      // Get user's Ethereum public address
      signer.getAddress().then((address) =>
        setUser((user) => ({
          ...user,
          address: address,
        }))
      );

      web3auth.getUserInfo().then(async (u) => {
        setUser((user) => ({
          ...user,
          email: u.email,
          name: u.name,
        }));
      });
    } else {
      setUser(null);
    }
  }, [ethersProvider, web3auth]);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setUser(null);
  };

  const signMessage = async () => {
    if (!ethersProvider) {
      console.log("provider not initialized yet");
      return;
    }
    // const rpc = new RPC(provider);
    // const signedMessage = await rpc.signMessage();
    const signer = ethersProvider.getSigner();
    const signedMessage = await signer.signMessage("message");
    console.log(signedMessage);
  };

  return (
    <AppStateContext.Provider
      value={{
        web3Auth: web3auth,
        provider,
        ethersProvider: ethersProvider,
        contractService: contractService,
        login,
        logout,
        signMessage,
        user,
        contract,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);

export default AppStateProvider;
