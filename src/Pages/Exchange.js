import React, { Component } from 'react'

import ExchangeForm from '../Components/ExchangeForm'


export default class Exchange extends Component {
    render() {
        return (
            <div>
                <div className="page-title">
                    <img alt="market-icon" src="https://png.icons8.com/dusk/50/000000/bank-cards.png" />
                    <h2>Exchange</h2>
                </div>
                <div className="page-container">
                    <ExchangeForm />
                </div>
            </div>
        )
    }
}
