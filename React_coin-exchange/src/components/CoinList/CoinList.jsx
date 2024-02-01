import React from "react";
import Coin from "../Coin/Coin";
import styled from 'styled-components'

const Table = styled.table`
  font-size: 1rem;
`

export default function CoinList(props){
        return(
        <Table className="table table-dark table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Ticker</th>
                <th>Price</th>
                <th>Balance</th>
                {/* {props.showBalance ? <th>Balance</th> : null} */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                props.coinData.map(({key, name, ticker, price, balance}) => 
                <Coin key={key} 
                      handleRefresh={props.handleRefresh} 
                      handleTransaction={props.handleTransaction}
                      showBalance={props.showBalance} 
                      name={name} 
                      ticker={ticker} 
                      price={price} 
                      balance={balance}
                      tickerId={key} 
                />
                )
              }
            </tbody>
          </Table>
        )
}