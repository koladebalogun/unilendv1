import { useState, useEffect } from 'react'
import { ZERO_ADDRESS, web3BNToFloatString } from '../utils'
import {getErc20Contract} from '../context/TransactionContext'
import BigNumber from 'bignumber.js'
import BN from 'bn.js'
import { useWeb3React } from '@web3-react/core'

export default function useBalance(
  tokenAddress,
  decimals,
) {
  const [balance, setBalance] = useState('0') //state that will set the initial balance to 0

  const { account, library } = useWeb3React() //For getting connected wallet and web3 object

  useEffect(() => {
    let isCancelled = false

    function getBalance() {
      return new Promise((resolve) => { //Returns a new promise if theres no web3 object or token address
        if (!library || !tokenAddress) {
          resolve(new BN('0'))
          return
        }

        //This is where the smart contract will be called  
        try {
            //if the adress is equal to zero which means that it's the eth coin, a smart contract built into web3.eth called getBalance will be used to get the balance and it takes the connected account as a parameter
          if (tokenAddress === ZERO_ADDRESS) {
            library.eth
              .getBalance(account)
              .then((value) => {
                resolve(new BN(value))
              })
              .catch((error) => {
                console.log(error)
                resolve(new BN('0'))
              })
          } else {
              //if it's an erc token, i'll get the erc20 contract by passing the tokenAddress and the web3 object
              //so if the contract exists, call methods on the contract
            const contract = getErc20Contract(tokenAddress, library)
            contract?.methods
              .balanceOf(account) //get's the balance of the connected account
              .call()
              .then((value) => {
                resolve(new BN(value))
              })
              .catch((error) => {
                console.log(error)
                resolve(new BN('0'))
              })
          }
        } catch (error) {
          resolve(new BN('0'))
        }
      })
    }

    async function run() {
      const bn = await getBalance()
      if (!isCancelled) {
        const pow = new BigNumber('10').pow(new BigNumber(decimals))
        setBalance(web3BNToFloatString(bn, pow, 4, BigNumber.ROUND_DOWN))
      }
    }

    run()

    return () => {
      isCancelled = true
    }
  }, [tokenAddress, library, decimals, account])

  return [balance]
}