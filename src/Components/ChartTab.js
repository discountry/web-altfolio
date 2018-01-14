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
      active: '7day',
    }
  }
  fetchPriceHistory(period,unit) {
    Toast.loading('Loading...', 0);
    axios.get(`http://coincap.io/history/${period}/${this.props.symbol}`)
    .then(res => {
        Toast.hide()
        this.setState({ 
            data: formatPriceData(res.data.price, unit),
            active: period,
         })
    })
  }
  componentDidMount() {
    this.fetchPriceHistory('7day','ddd')
  }
  render() {
    return (
      <div>
        <h4>{this.props.symbol} 价格走势（美元）</h4>
        <WhiteSpace size="xs" />
          <List>
            <List.Item>
              <Flex>
                <Flex.Item><Button type={this.state.active === '7day' ? 'primary' : 'ghost'} size="small" onClick={() => this.fetchPriceHistory('7day','ddd')}>近7天</Button></Flex.Item>
                <Flex.Item><Button type={this.state.active === '30day' ? 'primary' : 'ghost'} size="small" style={{ marginLeft: '2.5px' }} onClick={() => this.fetchPriceHistory('30day','Do')}>近1月</Button></Flex.Item>
                <Flex.Item><Button type={this.state.active === '365day' ? 'primary' : 'ghost'} size="small" style={{ marginLeft: '2.5px' }} onClick={() => this.fetchPriceHistory('365day','MMMM')}>近1年</Button></Flex.Item>
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
