import React, { Component } from 'react'

import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import Loading from './Loading'

export default class CoinCard extends Component {
    handleShowModal = () => {
        this.props.handleShowModal(this.props.symbol)
    }
    render() {
        if (+this.props.possession === 0) {
            return false
        } else {
            if (this.props.PRICE > 0) {
                const changePercentage = this.props.CHANGE24HOUR/this.props.HIGH24HOUR
                return (
                    <WingBlank size="lg">
                            <Card onClick={this.handleShowModal}>
                                <Card.Header
                                    title={this.props.coinName}
                                    thumb={`https://www.cryptocompare.com${this.props.ImageUrl}`}
                                    thumbStyle={{width:'2rem'}}
                                    extra={<span>{(this.props.possession ? (this.props.possession*this.props.PRICE).toFixed(2) : parseFloat(this.props.PRICE).toFixed(2))+' ¥'}</span>}
                                />
                                <Card.Body style={{minHeight:0}}></Card.Body>
                                <Card.Footer
                                    content={this.props.possession ? `${this.props.possession} ${this.props.symbol}`: this.props.symbol} 
                                    extra={<div style={{
                                        color: changePercentage >= 0 ? 'forestgreen' : 'crimson'
                                    }}>{this.props.possession ? (this.props.possession*this.props.CHANGE24HOUR).toFixed(2)+' ¥' : (changePercentage*100).toFixed(2)+' %'}</div>}
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
