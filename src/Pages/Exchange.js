import React, { Component } from 'react'
import { NoticeBar } from 'antd-mobile'
import ExchangeForm from '../Components/ExchangeForm'
import Wallet from '../Components/Wallet'

export default class Exchange extends Component {
    render() {
        return (
            <div>
                <NoticeBar mode="link" action={<a style={{ color: '#f76a24' }} rel="noopener noreferrer" target="_blank" href="https://changelly.com/?ref_id=7105b2a34cc8">去交换</a>}>
                    任意交换加密货币，尽在 Changelly~
                </NoticeBar>
                <div className="page-title">
                    <img alt="market-icon" src="https://png.icons8.com/dusk/50/000000/bank-cards.png" />
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
