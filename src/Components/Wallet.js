import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { Icon, Steps, Toast, InputItem, List, WhiteSpace } from 'antd-mobile'

import {store} from '../Utils'

export default class Wallet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: store.get('walletAddress') ? store.get('walletAddress') : '',
      balance: 0,
      transations: [],
    }
  }
  handleUpdateAddress(address) {
    this.setState({
      address
    })
  }
  fetchBalance() {
    if (!this.state.address) {
      Toast.fail('请输入钱包地址',1)
    }
    Toast.loading('查询中...',0)
    axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${this.state.address}&tag=latest&apikey=R3NUDUUSHIEWFW28XUKXJNWSDPVGCEGMKI`)
    .then(res => {
        Toast.hide()
        this.setState({
          balance: res.data.result,
        })
        if (res.data.result > 0) {
          store.set('walletAddress', this.state.address)
          this.fetchTransations()
        }
    })
  }
  fetchTransations() {
    Toast.loading('查询中...',0)
    axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${this.state.address}&startblock=0&endblock=99999999&page=1&sort=desc&apikey=R3NUDUUSHIEWFW28XUKXJNWSDPVGCEGMKI`)
    .then(res => {
        Toast.hide()
        this.setState({
          transations: res.data.result,
        })
    })
  }
  render() {
    return (
      <div>
        <div className="page-title">
          <img alt="wallet-icon" src="https://png.icons8.com/dusk/50/000000/wallet.png" />
          <h2>以太坊钱包</h2>
        </div>
        <WhiteSpace size="lg" />
        <List style={{ backgroundColor: 'white' }}>
            <InputItem
              placeholder="0x00"
              value={this.state.address}
              onChange={v => this.handleUpdateAddress(v)}
              clear
              updatePlaceholder
            >钱包地址</InputItem>
            <InputItem
              disabled
              type="money"
              placeholder="0.0000"
              value={(this.state.balance/Math.pow(10,18)).toFixed(4)}
              extra="Ether"
            >余额</InputItem>
            {this.state.transations.length > 0 && (
              <List.Item>
                <Steps>
                  {this.state.transations.map(transation => <Steps.Step key={transation.hash} status="finish"
                    title={
                      transation.from === this.state.address.toLowerCase() ? '转出' : '存入'
                    }
                    icon={
                      transation.from === this.state.address.toLowerCase() ? <Icon type="right" /> : <Icon type="left" />
                    } 
                    description={`${(transation.value/Math.pow(10,18)).toFixed(4)} Ether ${moment.unix(transation.timeStamp).fromNow()}`} />)}
                </Steps>
              </List.Item>
            )}
            <List.Item>
              <div
                style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                onClick={() => this.fetchBalance()}
              >
                查询
              </div>
            </List.Item>
        </List>
      </div>
    )
  }
}
