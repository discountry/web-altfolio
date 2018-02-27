import React, { Component } from 'react'
import axios from 'axios'
import { Toast, Picker, InputItem, List, WhiteSpace } from 'antd-mobile'

import {selectList, legalList} from '../config'

export default class ExchangeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            crypto: ['BTC'],
            cryptoValue: 1,
            legal: ['CNY'],
            legalValue: 100000,
            rate: 100000,
        }
    }
    handleCryptoChange(crypto) {
        Toast.loading('载入中...', 0)
        axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${crypto[0]}&tsyms=${this.state.legal[0]}`)
        .then(res => {
            Toast.hide()
            this.setState({
                crypto,
                legalValue: (this.state.cryptoValue*res.data[this.state.legal[0]]).toFixed(2),
                rate: res.data[this.state.legal[0]],
             })
        })
    }
    handleLegalChange(legal) {
        Toast.loading('载入中...', 0)
        axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${this.state.crypto}&tsyms=${legal[0]}`)
        .then(res => {
            Toast.hide()
            this.setState({ 
                legal,
                cryptoValue: (this.state.legalValue/res.data[legal]).toFixed(4),
                rate: res.data[legal],
             })
        })
    }
    handleCryptoValueChange(cryptoValue) {
        this.setState({
            cryptoValue,
            legalValue: (cryptoValue*this.state.rate).toFixed(2),
        })
    }
    handleLegalValueChange(legalValue) {
        this.setState({
            legalValue,
            cryptoValue: (legalValue/this.state.rate).toFixed(4),
        })
    }
    componentDidMount() {
        //this.handleCryptoChange(this.state.crypto)
    }
    render() {
        return (
            <div>
                <WhiteSpace size="lg" />
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <Picker key="crypto" 
                    value={this.state.crypto} 
                    data={selectList} 
                    onChange={v => this.handleCryptoChange(v)}
                    onOk={v => this.handleCryptoChange(v)}
                    cols={1}>
                        <List.Item arrow="horizontal">代币类型</List.Item>
                    </Picker>
                    <InputItem
                        type="money"
                        placeholder="how much"
                        value={this.state.cryptoValue}
                        onChange={v => this.handleCryptoValueChange(v)}
                        clear
                        updatePlaceholder
                    >代币金额</InputItem>
                    <Picker key="legal" 
                    value={this.state.legal} 
                    data={legalList} 
                    onChange={v => this.handleLegalChange(v)}
                    onOk={v => this.handleLegalChange(v)}
                    cols={1}>
                        <List.Item arrow="horizontal">法币类型</List.Item>
                    </Picker>
                    <InputItem
                        type="money"
                        placeholder="how much"
                        value={this.state.legalValue}
                        onChange={v => this.handleLegalValueChange(v)}
                        clear
                        updatePlaceholder
                    >法币金额</InputItem>
                </List>
                <WhiteSpace size="lg" />
            </div>
        )
    }
}
