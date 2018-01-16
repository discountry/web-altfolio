import React, { Component } from 'react'
import { NoticeBar } from 'antd-mobile'
import ExchangeForm from '../Components/ExchangeForm'
import Wallet from '../Components/Wallet'
import Web3 from 'web3'

export default class Exchange extends Component {
    async componentDidMount() {
        var web3 = new Web3("https://api.myetherapi.com/eth");

        console.log(web3)

        const newAccount = web3.eth.accounts.create();

        console.log('account',newAccount)

        web3.eth.getBalance(newAccount.address).then(console.log);

        const transation = await newAccount.signTransaction({
            to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
            value: '1000000000',
            gas: 2000000
        }, newAccount.privateKey)

        console.log(transation.rawTransaction)

        web3.eth.sendSignedTransaction(transation.rawTransaction)
                .on('receipt', console.log)
                .on('error',console.log);

    }
    render() {
        return (
            <div>
                <NoticeBar marqueeProps={{ loop: true }} mode="link" action={<a style={{ color: '#f76a24' }} rel="noopener noreferrer" target="_blank" href="https://changelly.com/?ref_id=7105b2a34cc8">去交换</a>}>
                    全球最安全、快速、便利的交换加密货币的方式，尽在 Changelly~
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
