import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/zh-cn'
import NoticeBar from '../Components/NoticeBar'
import { Steps } from 'antd-mobile'
import Loading from '../Components/Loading'

const Step = Steps.Step

export default class News extends Component {
    constructor(props) {
      super(props)
      this.state = {
          data: {},
          isLoading: true
      }
    }
    renderNews() {

    }
    componentDidMount() {
      axios.get(`https://cors-anywhere.herokuapp.com/http://www.bishijie.com/api/news/?size=10`)
      .then(res => {
          if (res.data.error !== 0) {
              this.setState({
                  error: true,
                  isLoading: false,
               })
          } else {
              console.log(res.data)
              this.setState({
                  data: res.data.data,
                  isLoading: false,
               })
          }
      })
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
                  {this.state.isLoading ? <Loading /> : 
                    <Steps className="news-list">
                      {this.state.data[Object.keys(this.state.data)[0]].buttom.map(item => <Step key={item.issue_time} title={moment.unix(item.issue_time).fromNow()} description={item.content} />)}
                    </Steps>
                  }
                </div>
            </div>
        )
    }
}