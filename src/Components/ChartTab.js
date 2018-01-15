import React, { Component } from 'react'
import axios from 'axios'
import { List, Flex, Button, Toast, WhiteSpace } from 'antd-mobile';

import { formatPriceData } from '../Utils'
import PriceChart from './PriceChart'

export default class ChartTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      active: 7,
    }
  }
  fetchPriceHistory(period,unit) {
    Toast.loading('载入中...', 0);
    axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.props.symbol}&tsym=CNY&limit=${period}`)
    .then(res => {
        Toast.hide()
        this.setState({ 
            data: formatPriceData(res.data.Data, unit),
            active: period,
         })
    })
  }
  componentDidMount() {
    this.fetchPriceHistory(7,'ddd')
  }
  render() {
    return (
      <div>
        <h4>{this.props.symbol} 价格走势</h4>
        <WhiteSpace size="xs" />
          <List>
            <List.Item>
              <Flex>
                <Flex.Item><Button type={this.state.active === 7 ? 'primary' : 'ghost'} size="small" onClick={() => this.fetchPriceHistory(7,'ddd')}>近7天</Button></Flex.Item>
                <Flex.Item><Button type={this.state.active === 30 ? 'primary' : 'ghost'} size="small" style={{ marginLeft: '2.5px' }} onClick={() => this.fetchPriceHistory(30,'Do')}>近1月</Button></Flex.Item>
                <Flex.Item><Button type={this.state.active === 365 ? 'primary' : 'ghost'} size="small" style={{ marginLeft: '2.5px' }} onClick={() => this.fetchPriceHistory(365,'MMMM')}>近1年</Button></Flex.Item>
              </Flex>
            </List.Item>
            <List.Item>
              <PriceChart data={this.state.data} />
            </List.Item>
          </List>
        <WhiteSpace />
      </div>
    )
  }
}
