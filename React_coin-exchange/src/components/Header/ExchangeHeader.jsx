import React, { Component } from 'react'
import styled from 'styled-components'
import logo from './logo.svg'

const Header = styled.header`
    background-color: #282c34;
    min-height: 10vh;
    widht: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: white;
`;

const Img = styled.img`
    height: 8rem;
    pointer-events: none;
`;

export default class ExchangeHeader extends Component {
  render() {
    return (
        <Header>
            <Img src={logo} alt="React logo" />
            <h1>Coin exchange</h1>
        </Header>
    )
  }
}
