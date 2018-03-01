import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/zh-cn'
import NoticeBar from '../Components/NoticeBar'
import { Steps, WhiteSpace, Button } from 'antd-mobile'

const Step = Steps.Step

export default class News extends Component {
    constructor(props) {
      super(props)
      this.state = {
          data: {},
          size: 10,
          isLoading: true
      }
    }
    handleLoadNews = () => {
        this.setState((prevState, props) => ({
            size: prevState.size + 10,
            isLoading: true,
        }))
        axios.get(`http://cors-proxy.htmldriven.com/?url=http://www.bishijie.com/api/news/?size=${this.state.size}`)
        .then(res => {
            if (res.data.error !== null) {
                this.setState({
                    error: true,
                    isLoading: false,
                })
            } else {
                this.setState({
                    data: JSON.parse(res.data.body).data,
                    isLoading: false,
                })
            }
        })
    }
    componentDidMount() {
        this.handleLoadNews()
    }
    render() {
        return (
            <div>
                <NoticeBar action={<a style={{ color: '#f76a24' }} rel="noopener noreferrer" target="_blank" href="https://otcbtc.com/referrals/WERYIS">去看看</a>}>
                    OTCBTC 是目前最流畅、最靠谱、最好用的场外交易平台，支持支付宝、微信、银行卡支付购买BTC、ETH、EOS、USDT、QTUM、ZEC、GXS、BCH 等数字币。现在注册，即可领取比特币红包！
                </NoticeBar>
                <div className="page-title">
                    <img alt="market-icon" src="https://png.icons8.com/dusk/50/000000/news.png" />
                    <h2>快讯</h2>
                </div>
                <div className="page-container">
                  {Object.keys(this.state.data).length !== 0 &&
                    <Steps className="news-list">
                      {this.state.data[Object.keys(this.state.data)[0]].buttom.map(item => <Step key={item.issue_time} title={moment.unix(item.issue_time).fromNow()} description={item.content} />)}
                    </Steps>
                  }
                  <WhiteSpace />
                  <Button loading={this.state.isLoading ? true : false} onClick={this.handleLoadNews} className="refresh-button" type="ghost" icon={<img src="https://png.icons8.com/windows/64/108ee9/refresh.png" alt="" />}>{this.state.isLoading ? '载入中' : '查看更多'}</Button>
                  <WhiteSpace />
                </div>
            </div>
        )
    }
}