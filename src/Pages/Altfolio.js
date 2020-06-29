import React, { Component } from 'react'
import { Picker, InputItem, Modal, List, Button, WhiteSpace } from 'antd-mobile'

import NoticeBar from '../Components/NoticeBar'
import CoinCardList from '../Components/CoinCardList'
import {possessionList, selectList} from '../config'
import {store, isSymbol} from '../Utils'

export default class Altfolio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            coinsList: store.get("possessionList") ? store.get("possessionList") : possessionList,
            crypto: ['BTC'],
            cryptoValue: possessionList.find(isSymbol.bind(null,'BTC')).possession,
            modal: false,
        }
    }
    handleremoveFromList = (symbol) => {
        const removedList = this.state.coinsList.filter(v=>v.symbol !== symbol)
        store.set("possessionList", removedList)
        this.setState({
            coinsList: removedList
        })
    }
    handleCryptoChange(crypto) {
        this.setState({
            crypto,
            cryptoValue: this.state.coinsList.find(isSymbol.bind(null,crypto[0])).possession,
         })
    }
    handleCryptoValueChange(cryptoValue) {
        this.setState({
            cryptoValue,
        })
    }
    handleSubmit() {
        const newList = store.get("possessionList") ? store.get("possessionList") : possessionList
        let crypto = newList.find(isSymbol.bind(null,this.state.crypto[0]))
        crypto.possession = this.state.cryptoValue
        store.set("possessionList", newList)
        this.setState({
            coinsList: newList,
            modal: false,
        })
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key]: true,
        })
    }
    onClose = key => () => {
        this.setState({
          [key]: false,
        })
    }
    render() {
        return (
            <div>
                <NoticeBar action={<a style={{ color: '#f76a24' }} rel="noopener noreferrer" target="_blank" href="https://www.binance.com/?ref=20768006">领奖励</a>}>
                    交易量大，充提款快，币种全，最好用的加密货币交易平台币安，现在注册领取奖励！
                </NoticeBar>
                <div className="page-title">
                    <img alt="altfolio-icon" src="https://img.icons8.com/dusk/50/000000/currency.png" />
                    <h2>资产</h2>
                </div>
                <div className="page-container">
                    <CoinCardList handleremoveFromList={this.handleremoveFromList} coinsList={this.state.coinsList} />
                    <WhiteSpace />
                    <Button onClick={this.showModal('modal')}>配置资产</Button>
                    <Modal
                    popup
                    visible={this.state.modal}
                    onClose={this.onClose('modal')}
                    animationType="slide-down"
                    >
                    <List renderHeader={() => <div>配置资产</div>}>
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
