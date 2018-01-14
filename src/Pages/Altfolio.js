import React, { Component } from 'react'
import {possessionList} from '../config'

import { Picker, InputItem, Modal, List, Button, WhiteSpace } from 'antd-mobile';

import CoinCardList from '../Components/CoinCardList'
import {selectList} from '../config'

export default class Altfolio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            coinsList: localStorage.getItem("possessionList") ? JSON.parse(localStorage.getItem("possessionList")) : possessionList,
            crypto: ['BTC'],
            cryptoValue: possessionList.find(this.isSymbol.bind(null,'BTC')).possession,
            modal: false,
        }
    }
    handleCryptoChange(crypto) {
        this.setState({
            crypto,
            cryptoValue: this.state.coinsList.find(this.isSymbol.bind(null,crypto[0])).possession,
         })
    }
    handleCryptoValueChange(cryptoValue) {
        this.setState({
            cryptoValue,
        })
    }
    isSymbol(symbol, crypto) { 
        return crypto.symbol === symbol;
    }
    handleSubmit() {
        const newList = localStorage.getItem("possessionList") ? JSON.parse(localStorage.getItem("possessionList")) : possessionList
        let crypto = newList.find(this.isSymbol.bind(null,this.state.crypto[0]))
        crypto.possession = this.state.cryptoValue
        localStorage.setItem("possessionList", JSON.stringify(newList))
        this.setState({
            coinsList: newList,
            modal: false,
        })
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
          [key]: false,
        });
    }
    componentDidUpdate() {
        console.log(this.state.coinsList)
    }
    render() {
        return (
            <div>
                <div className="page-title">
                    <img alt="altfolio-icon" src="https://png.icons8.com/dusk/50/000000/currency.png" />
                    <h2>Altfolio</h2>
                </div>
                <div className="page-container">
                    <CoinCardList {...this.state} />
                    <WhiteSpace />
                    <Button onClick={this.showModal('modal')}>配置资产</Button>
                    <Modal
                    popup
                    visible={this.state.modal}
                    onClose={this.onClose('modal')}
                    animationType="slide-up"
                    >
                    <List renderHeader={() => <div>配置资产</div>} className="popup-list">
                        <Picker key="crypto" 
                        value={this.state.crypto} 
                        data={selectList} 
                        onChange={v => this.handleCryptoChange(v)}
                        onOk={v => this.handleCryptoChange(v)}
                        cols={1}>
                            <List.Item arrow="horizontal">代币类型</List.Item>
                        </Picker>
                        <InputItem
                            type="digit"
                            placeholder="how much"
                            value={this.state.cryptoValue}
                            onChange={v => this.handleCryptoValueChange(v)}
                            clear
                            updatePlaceholder
                        >代币金额</InputItem>
                        <List.Item>
                        <Button type="primary" onClick={() => this.handleSubmit()}>确认</Button>
                        </List.Item>
                    </List>
                    </Modal>
                </div>
            </div>
        )
    }
}