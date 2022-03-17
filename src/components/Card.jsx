import React, { useState, useContext, useEffect } from "react"
import { AiFillCloseCircle } from "react-icons/ai"
import { TransactionContext } from "../context/TransactionContext"
import TokenList from '../assets/token-list.json'
import useBalance from "../hooks/useBalance"



const Card = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext)
  const [modal, setModal] = useState(false)
  const [max, setMax] = useState(true)
  const [number, setNumber] = useState("0.000000000000")
  const [digits, setDigits] = useState("")
  const [selectedCoin, setSelectedCoin] = useState(TokenList[0])
  const [isLoading, setIsLoading] = useState(false)
  const [bal, setBal] = useState()
  const [image, setImage] = useState();

  const [balance] = useBalance(
    selectedCoin.address,
    selectedCoin.decimals
  )

  console.log(TokenList)

  const handleSubmit = e => {
    e.preventDefault()
    setDigits(number)
    console.log(digits)
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  const getBalance = () => {
    setBal(balance)
    setModal(!modal)
  }


  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="container-header">
            <div className="header">Lend</div>
          </div>
          <div className="card">
            <div>
              <div className="amount">
                <p className="amount-txt">Amount</p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder={!max ? digits : "0.0"}
                    value={digits}
                    onChange={e => setDigits(e.target.value)}
                  />
                  <input type="submit" value="MAX" className="max-btn" />
                </form>
              </div>
            </div>
            { !currentAccount ? '' : <p className="balance-field">Balance: {bal}</p>}
            <div className="dropdown">
              <button className="select-btn" onClick={toggleModal}>
                Select Token
              </button>
            </div>
            {modal && (
              <div className="modal">
                <div className="overlay" onClick={toggleModal}></div>
                <AiFillCloseCircle
                  fontSize={35}
                  color="#fff"
                  onClick={toggleModal}
                  className="close-modal"
                />
                <div className="modal-content">
                  <h2>Select a token</h2>
                  {isLoading ? (<h4>Data Fetching</h4>) : ''}
                  {TokenList.map((token)  => (
                    <div className="tokens" key={token.address}>
                      <div className="tokenlist" onClick={getBalance}>
                        <div className="tokenimage">
                          <img src={token.logoURI} alt="" />
                        </div>
                        <div className="tokendetails">
                          <h4 className="tokensymbol">{token.symbol}</h4>
                          <p>{token.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button className="connect-btn" onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      </div>
    </>
  )
}

export default Card
