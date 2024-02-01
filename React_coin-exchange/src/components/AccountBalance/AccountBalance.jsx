import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Section = styled.section` 
  font-size: 2rem;
  margin: 0 auto 2rem auto;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 3rem;
  display: inline-block;
`

const Button = styled.button`
  margin: 0 8px
`

const BalanceButton = styled(Button)`
  width: 150px
`

const Balance = styled.div`
  mid-width: 250px;
  margin: 0.5rem 0 0 2.5rem;
  font-size: 1.5rem;
  vertical-align:middle;
`

var formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export default function AccountBalance(props){
    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance'
    let content = '\u00A0'
    if(props.showBalance) {
      content = <> {formatter.format(props.amount)} </>
    }
    const buttonClass = 'btn ' + (props.showBalance ? 'btn-warning' : 'btn-info')
    
    return (
      <>
        <Balance>{content}</Balance>
        <Section className='acc-balance'>
          <BalanceButton 
            onClick={props.handleBalanceVisibilityChange}
            className={buttonClass}>
            {buttonText}
          </BalanceButton>
        </Section>
      </>
    )
}

AccountBalance.propTypes={
    amount: PropTypes.number.isRequired
}