import React, { Component } from 'react'
import { Icon, Button, InputItem, Modal, List, Toast } from 'antd-mobile'
import axios from 'axios'
import {watchList} from '../config'
import {store} from '../Utils'

import NoticeBar from '../Components/NoticeBar'
import CoinCardList from '../Components/CoinCardList'
// import CryptoIndex from '../Components/CryptoIndex'

export default class Market extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coinsList: store.get("customizedList") ? store.get("customizedList") : watchList,
            symbol: '',
            modal: false,
        }
    }
    handleSymbolChange(symbol) {
        this.setState({
            symbol,
        })
    }
    handleremoveFromList = (symbol) => {
        const removedList = this.state.coinsList.filter(v=>v.symbol !== symbol)
        store.set("customizedList", removedList)
        this.setState({
            coinsList: removedList
        })
    }
    addSymbol() {
        Toast.loading('查询中...',0)
        axios.get(`coinlist.json`)
        .then(res => {
            if (res.data.Data.hasOwnProperty(this.state.symbol)) {
                const info = res.data.Data[this.state.symbol]
                const customizedList = [...this.state.coinsList, {
                    symbol: info.Symbol,
                    coinName: info.CoinName,
                    ImageUrl: `${info.Symbol.toLowerCase()}.png`,
                }]
                store.set("customizedList", customizedList)
                this.setState(prevState => ({
                    coinsList: [...prevState.coinsList, {
                        symbol: info.Symbol,
                        coinName: info.CoinName,
                        ImageUrl: `${info.Symbol.toLowerCase()}@2x.png`,
                    }],
                    modal: false,
                  }))
                Toast.hide()
                //window.location.reload()
            } else {
                Toast.fail('未找到代币', 1)
            }
        })
    }
    showModal = (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          modal: true,
        })
    }
    onClose = () => {
        this.setState({
          modal: false,
        })
    }
    render() {
        return (
            <div>
                <NoticeBar action={<a style={{ color: '#f76a24' }} rel="noopener noreferrer" target="_blank" href="https://www.okex.me/join/1834284">去看看</a>}>
                    现在注册 OKEX，交易获得最高6折优惠！
                </NoticeBar>
                <div className="page-title">
                    <img alt="market-icon" src="https://img.icons8.com/dusk/50/000000/statistics.png" />
                    <h2>行情</h2>
                    {/* <CryptoIndex /> */}
                    <Icon onClick={this.showModal} type="search" size={'sm'} />
                </div>
                <div className="page-container">
                    <CoinCardList handleremoveFromList={this.handleremoveFromList} coinsList={this.state.coinsList} />
                    <Modal
                    popup
                    visible={this.state.modal}
                    onClose={this.onClose}
                    animationType="slide-down"
                    >
                    <List renderHeader={() => <div>添加代币</div>}>
                        <InputItem
                            placeholder="BTC"
                            value={this.state.symbol}
                            onChange={v => this.handleSymbolChange(v)}
                            clear
                            updatePlaceholder
                        >代币符号</InputItem>
                        <List.Item>
                        <Button type="primary" onClick={() => this.addSymbol()}>添加</Button>
                        </List.Item>
                    </List>
                    </Modal>
                </div>
            </div>
        )
    }
}
