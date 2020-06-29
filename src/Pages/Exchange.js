import React, { Component } from 'react'
import ExchangeForm from '../Components/ExchangeForm'
import Wallet from '../Components/Wallet'
import NoticeBar from '../Components/NoticeBar'

export default class Exchange extends Component {
    render() {
        return (
            <div>
                <NoticeBar action={<a style={{ color: '#f76a24' }} rel="noopener noreferrer" target="_blank" href="https://changelly.com/?ref_id=7105b2a34cc8">去交换</a>}>
                    全球最安全、快速、便利的换取加密货币的方式，尽在 Changelly~
                </NoticeBar>
                <div className="page-title">
                    <img alt="market-icon" src="https://img.icons8.com/dusk/50/000000/bank-cards.png" />
                    <h2>汇率</h2>
                </div>
                <div className="page-container">
                    <ExchangeForm />
                    <Wallet />
                </div>
            </div>
        )
    }
}
