import React from 'react'
import PropTypes from 'prop-types' 
import styled from 'styled-components'

const Td = styled.td`
  border: 1px solid #cccccc;
  width: 20vh;
`;

const TDControls = styled(Td)`
  width: 34vw
`

const ButtonStyle = styled.button`
  font-size: 11px;
  width: 64px;
  margin: 3px 5px 0;
`

const TdName = styled(Td)`
  width: 20vw;
  `

export default function Coin(props) {

  const handleClick = (event) => {
    event.preventDefault(); // prevent default action - prevent site refreshing

    props.handleRefresh(props.tickerId) 
  }

  const handleBuy = (event) => {
    event.preventDefault(); 
    props.handleTransaction(true, props.tickerId) 
  }

  const handleSell = (event) => {
    event.preventDefault(); 
    props.handleTransaction(false, props.tickerId) 
  }

    return (
      <tr>
        <TdName>{props.name}</TdName>
        <Td>{props.ticker}</Td>
        <Td>${props.price}</Td>
        <Td>{props.showBalance ? props.balance : '-'}</Td>
        <TDControls>
          <form action="#" method="POST"> 
            <ButtonStyle className="btn btn-info" onClick={handleClick}>Refresh</ButtonStyle> 
            <ButtonStyle className="btn btn-success" onClick={handleBuy}>BUY</ButtonStyle> 
            <ButtonStyle className="btn btn-danger" onClick={handleSell}>SELL</ButtonStyle> 
          </form>
        </TDControls>
      </tr>
    );
}

Coin.propTypes={
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string,
    price: PropTypes.number
}

