import React, { Component } from 'react'
import axios from 'axios'

import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

import Loading from './Loading'

export default class CoinCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            priceUSD: 0,
            priceCNY: 0,
        }
    }
    componentDidMount() {
        axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${this.props.symbol}&tsyms=USD,CNY`)
        .then(res => {
            this.setState({ 
                priceUSD: res.data.USD,
                priceCNY: res.data.CNY,
             })
        })
    }
    render() {
        if (this.props.possession === 0) {
            return false
        } else {
            if (this.state.priceCNY > 0) {
                return (
                    <WingBlank size="lg">
                            <Card>
                                <Card.Header
                                    title={this.props.coinName}
                                    thumb={`https://www.cryptocompare.com${this.props.ImageUrl}`}
                                    thumbStyle={{width:'2rem'}}
                                    extra={<span>{(this.props.possession ? (this.props.possession*this.state.priceCNY).toFixed(4) : this.state.priceCNY)+' ¥'}</span>}
                                />
                                <Card.Body style={{minHeight:0}}></Card.Body>
                                <Card.Footer
                                    content={this.props.possession ? `${this.props.possession} ${this.props.symbol}`: this.props.symbol} 
                                    extra={<div>{(this.props.possession ? (this.props.possession*this.state.priceUSD).toFixed(4) : this.state.priceUSD)+' $'}</div>} 
                                />
                            </Card>
                        <WhiteSpace size="xs" />
                    </WingBlank>
                )
            } else {
                return <Loading />
            }
        }
    }
}
