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
        let top_id = this.state.data.top_id ? this.state.data.top_id + 1 : 0
        axios.get(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.jinse.com/noah/v2/lives?limit=${this.state.size}&id=${top_id}&flag=down`)}`)
        .then(res => {
            if (res.data.news <= 0) {
                this.setState({
                    error: true,
                    isLoading: false,
                })
            } else {
                this.setState({
                    data: res.data,
                    isLoading: false,
                })
            }
        })
    }
    componentDidMount() {
        this.handleLoadNews()
    }
    render() {
        console.log(this.state.data)
        return (
            <div>
                <NoticeBar action={<a style={{ color: '#f76a24' }} rel="noopener noreferrer" target="_blank" href="https://www.okex.me/join/1834284">去看看</a>}>
                    现在注册 OKEX，交易获得最高6折优惠！
                </NoticeBar>
                <div className="page-title">
                    <img alt="market-icon" src="https://img.icons8.com/dusk/50/000000/news.png" />
                    <h2>快讯</h2>
                </div>
                <div className="page-container">
                  {Object.keys(this.state.data).length !== 0 &&
                    <Steps className="news-list">
                      {this.state.data.list[0].lives.map(item => <Step key={item.id} title={moment.unix(item.created_at).fromNow()} description={item.content} />)}
                    </Steps>
                  }
                  <WhiteSpace />
                  <Button loading={this.state.isLoading ? true : false} onClick={this.handleLoadNews} className="refresh-button" type="ghost" icon={<img src="https://img.icons8.com/windows/64/108ee9/refresh.png" alt="" />}>{this.state.isLoading ? '载入中' : '查看更多'}</Button>
                  <WhiteSpace />
                </div>
            </div>
        )
    }
}
