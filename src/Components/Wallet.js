import React, { Component } from 'react'
import axios from 'axios'
import ethers from 'ethers'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { Icon, Steps, Toast, InputItem, List, WhiteSpace, Modal, Button, Badge } from 'antd-mobile'

import {store} from '../Utils'

// window.ethers = ethers

export default class Wallet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: store.get('walletAddress') ? store.get('walletAddress') : '',
      privateKey: store.get('walletPrivateKey') ? store.get('walletPrivateKey') : '',
      transferAddress: '',
      amount: '0.0000',
      balance: 0,
      transations: [],
    }
  }
  handleUpdateAddress(address) {
    this.setState({
      address
    })
  }
  handleUpdatePrivateKey(privateKey) {
    this.setState({
      privateKey
    })
  }
  handleUpdateTransferAddress(transferAddress) {
    this.setState({
      transferAddress
    })
  }
  handleUpdateAmount(amount) {
    this.setState({
      amount
    })
  }
  showModal = key => (e) => {
    e.preventDefault()
    this.setState({
      [key]: true,
    })
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    })
  }
  fetchBalance() {
    if (!this.state.address) {
      Toast.fail('请输入钱包地址',1)
    }
    Toast.loading('查询中...',0)
    axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${this.state.address}&tag=latest&apikey=R3NUDUUSHIEWFW28XUKXJNWSDPVGCEGMKI`)
    .then(res => {
        this.setState({
          balance: res.data.result,
        })
        if (res.data.result > 0) {
          store.set('walletAddress', this.state.address)
          this.fetchTransations()
        } else {
          Toast.hide()
        }
    })
  }
  fetchTransations() {
    axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${this.state.address}&startblock=0&endblock=99999999&page=1&sort=desc&apikey=R3NUDUUSHIEWFW28XUKXJNWSDPVGCEGMKI`)
    .then(res => {
        Toast.hide()
        this.setState({
          transations: res.data.result,
        })
    })
  }
  createWallet() {
    const newWallet = ethers.Wallet.createRandom()
    this.setState({
      newAddress: newWallet.address,
      newMnemonic: newWallet.mnemonic,
      newPrivateKey: newWallet.privateKey,
      address: newWallet.address,
      privateKey: newWallet.privateKey,
      modal2: true,
    })
    store.set('walletAddress', newWallet.address)
    store.set('walletPrivateKey', newWallet.privateKey)
  }
  async confirmTransaction() {
    if (this.state.privateKey && this.state.amount && this.state.transferAddress) {
      Toast.loading('提交中...',0)
      var wallet = new ethers.Wallet(this.state.privateKey);
      wallet.provider = ethers.providers.getDefaultProvider();
      var amount = ethers.utils.parseEther(this.state.amount);
      var address = this.state.transferAddress;
      var options = {
          gasLimit: 80000,
          gasPrice: ethers.utils.bigNumberify("100000000")
      };
      try {
        var transaction = await wallet.send(address, amount, options);
      } catch (error) {
        Toast.hide()
        Toast.fail(error.message,2)
      }
      console.log(transaction);
      if (transaction) {
        Toast.hide()
        store.set('walletPrivateKey', this.state.privateKey)
        Toast.success('转账成功！',1)
      }
    } else {
      Toast.fail('请完整填写密钥、金额、转入地址并确认',2)
    }
  }
  render() {
    return (
      <div>
        <div className="page-title">
          <img alt="wallet-icon" src="https://png.icons8.com/dusk/50/000000/wallet.png" />
          <h2>以太坊钱包</h2>
          <Badge text="创建钱包" onClick={() => this.createWallet()}
            style={{
              marginLeft: 12,
              padding: '0 3px',
              backgroundColor: '#fff',
              borderRadius: 2,
              color: '#f19736',
              border: '1px solid #f19736',
            }}
          />
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
            <InputItem
              placeholder="0x00"
              value={this.state.privateKey}
              onChange={v => this.handleUpdatePrivateKey(v)}
              clear
              updatePlaceholder
            >钱包密钥</InputItem>
            <InputItem
              placeholder="0x00"
              value={this.state.transferAddress}
              onChange={v => this.handleUpdateTransferAddress(v)}
              clear
              updatePlaceholder
            >转入地址</InputItem>
            <InputItem
              type="money"
              placeholder="0.0000"
              value={this.state.amount}
              onChange={v => this.handleUpdateAmount(v)}
              extra="Ether"
            >转账金额</InputItem>
            <List.Item>
              <div
                style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                onClick={() => this.confirmTransaction()}
              >
                转账
              </div>
            </List.Item>
        </List>
        <a style={{ display: 'block', textAlign: 'center', marginTop: 20, color: '#108ee9' }} onClick={this.showModal('modal1')}>
          使用条款
        </a>
        <WhiteSpace />
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="使用条款"
          footer={[{ text: '同意', onPress: () => this.onClose('modal1')() }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ textAlign: 'left' }}>
            <ul>
              <li>AltFolio 是纯客户端应用。</li>
              <li>AltFolio 不会在服务器存储您的任何信息。</li>
              <li>所有信息都存储在您的浏览器当中。</li>
              <li>使用时请确保您的网络安全，并妥善保管您的密钥。</li>
              <li>确认提交后 AltFolio 将无法撤销操作，请确保您的输入无误。</li>
              <li>您在使用 AltFolio 时发生任何财产损失均由您本人承担全部责任。</li>
            </ul>
          </div>
        </Modal>
        <WhiteSpace />
        <Modal
          popup
          visible={this.state.modal2}
          onClose={this.onClose('modal2')}
          animationType="slide-up"
        >
          <List renderHeader={() => <div>钱包信息</div>} className="popup-list">
            <InputItem
              value={this.state.newAddress}
            >钱包地址</InputItem>
            <InputItem
              value={this.state.newPrivateKey}
            >钱包密钥</InputItem>
            <InputItem
              value={this.state.newMnemonic}
            >钱包助记词</InputItem>
            <List.Item>
              <Button type="primary" onClick={this.onClose('modal2')}>我已保存</Button>
            </List.Item>
          </List>
        </Modal>
      </div>
    )
  }
}
