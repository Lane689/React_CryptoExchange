import './App.css';
import CoinList from "./components/CoinList/CoinList" 
import AccountBalance from "./components/AccountBalance/AccountBalance" 
import React, { useState, useEffect } from 'react';
import ExchangeHeader from './components/Header/ExchangeHeader';
import axios from 'axios'

//import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/lumen/bootstrap.min.css'
import '@fortawesome/fontawesome-free/js/all'

const COIN_COUNT = 10

const formatPrice = price => parseFloat(Number(price).toFixed(4))

function App(props) {
  const [balance, setBalance] = useState(10000)
  const [showBalance, setShowBalance] = useState(false)
  const [coinData, setCoinData] = useState([])

  const componentDidMount = async () => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins') 
    const coinIDs = response.data.slice(0, COIN_COUNT).map(coin => coin.id) 
    
    //Retrieve the prices
    const tokenURL = 'https://api.coinpaprika.com/v1/tickers/'
    const promises = coinIDs.map(key => axios.get(tokenURL + key))
    const coinData = await Promise.all(promises)
    const coinPriceData = coinData.map(function(response){
      const coin = response.data // extracting coin from respose 
      return{
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: formatPrice(coin.quotes['USD'].price) 
      }
    })
    setCoinData(coinPriceData)
  }

  useEffect(function() {
    if(coinData.length === 0){
      componentDidMount()
    }
  })

  const handleBalanceVisibilityChange = () => { 
    setShowBalance(oldValue => !oldValue)
  }

  const handleTransaction= (isBuy, valueChangedId) => {
    var balanceChange = isBuy ? 1 : -1
    const newCoinData = coinData.map(function(values){
      let newValues = {...values}
      if(valueChangedId == values.key) {
        newValues.balance += balanceChange
        setBalance(oldBalance => oldBalance - balanceChange*newValues.price)
      }
      return newValues
    })
    setCoinData(newCoinData)
  }

  const handleRefresh = async (valueChangeTicker) => { 
    const tokenURL = `https://api.coinpaprika.com/v1/tickers/${valueChangeTicker}`
    const response = await axios.get(tokenURL)
    const newPrice = formatPrice(response.data.quotes['USD'].price)
    const newCoinData = coinData.map((values) => {
    let newValues = {...values} // go througt each coin from coinData and cloning their props
    if(valueChangeTicker === values.key){
      newValues.price =  newPrice
    }
    return newValues
    })
    setCoinData(newCoinData)
    console.log(newCoinData)
  } 

    return (
      <div className="App">
        <ExchangeHeader />
        <AccountBalance amount={balance} 
                        showBalance={showBalance} 
                        handleBalanceVisibilityChange={handleBalanceVisibilityChange}/> 
        <CoinList coinData={coinData} 
                  showBalance={showBalance}
                  handleTransaction={handleTransaction}
                  handleRefresh={handleRefresh} /> 
      </div>
    );
}

export default App;




