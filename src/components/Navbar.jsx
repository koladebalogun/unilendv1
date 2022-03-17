import React, { useState, useContext } from "react"
import logo from "../static/icon.jpg"
import { useEffect } from "react"
import { FaWallet } from "react-icons/fa"
import { shortenAddress } from "../utils/shortenAddress"
import { TransactionContext } from "../context/TransactionContext"


const Navbar = () => {
  const {connectWallet, currentAccount, currentNetwork} = useContext(TransactionContext)

  console.log({connectWallet, currentAccount})

  
  return (
    <>
      <nav>
        <ul className="left">
          <img src={logo} alt="" />
          <li>Lend</li>
          <li>Redeem</li>
          <li>Reward</li>
          <li>Airdrop</li>
          {currentAccount && <h4 className="network">{currentNetwork}</h4>}

          {!currentAccount ? (
            <button className="wallet-btn" onClick={connectWallet}>
              {" "}
              <FaWallet fontSize={20} color="#fff" className="wallet-icon" />
              Connect Wallet
            </button>
          ) : (
            <h4 className="address">{shortenAddress(currentAccount)}</h4>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
