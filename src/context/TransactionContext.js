import React, { useState, useEffect } from "react"
import Web3 from "web3"
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"
import WalletLink from "walletlink"

//For Balance
import ERC20ABI from '../assets/abi-erc20.json'

export const getErc20Contract = (tokenAddress, web3) => {
  return web3
  ? new web3.eth.Contract(ERC20ABI, tokenAddress, {
    from: web3.eth.defaultAccount
  })
  : null
}

export const TransactionContext = React.createContext()

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState()
  const [currentNetwork, setCurrentNetwork] = useState()



  useEffect(() => {
    setCurrentNetwork(web3modal.providerController.network)
    console.log(web3modal)
  },[])


  const providerOptions = {
    binancechainwallet: {
      package: true,
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "1ca6592e08b5436792229d2ee9e4a14d",
      },
    },
    walletlink: {
      package: WalletLink,
      options: {
        appName: "Unilend",
        infuraId: "1ca6592e08b5436792229d2ee9e4a14d",
        rpc: "",
        chainId: 4,
        appLogoUrl: null,
        darkMode: true,
      },
    },
  }

  const web3modal = new Web3Modal({
    network: "rinkeby",
    theme: "dark",
    cacheProvider: true,
    providerOptions,
  })

  const connectWallet = async () => {
    let provider = await web3modal.connect()
    let web3 = new Web3(provider)
    await window.ethereum.send("eth_requestAccounts")
    let accounts = await web3.eth.getAccounts()
    setCurrentAccount(accounts[0])
    if(accounts) alert('Wallet connected')

  }

  return (
    <TransactionContext.Provider value={{ currentAccount, connectWallet, currentNetwork, getErc20Contract }}>
      {children}
    </TransactionContext.Provider>
  )
}
