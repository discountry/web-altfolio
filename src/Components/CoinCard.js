import React, { Component } from 'react'
import axios from 'axios'
import { formatPriceData } from '../Utils'

import { Toast, Modal, List, Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PriceChart from './PriceChart'
import Loading from './Loading'

export default class CoinCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            priceUSD: 0,
            priceCNY: 0,
            modal: false,
            data: [
                {
                    time: 'Mon',
                    price: 90000,
                },
                {
                    time: 'Thu',
                    price: 100000,
                },
                {
                    time: 'Thur',
                    price: 120000,
                },
            ]
        }
    }
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    fetchPriceHistory = () => {
        Toast.loading('Loading...', 0);
        axios.get(`http://coincap.io/history/7day/${this.props.symbol}`)
        .then(res => {
            Toast.hide()
            this.setState({ 
                data: formatPriceData(res.data.price),
                modal: !this.state.modal,
             })
        })
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
                            <Card onClick={this.fetchPriceHistory}>
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
                        <Modal
                            popup
                            visible={this.state.modal}
                            onClose={this.toggleModal}
                            animationType="slide-up"
                            >
                            <List renderHeader={() => <div>{this.props.symbol} 价格走势</div>} className="popup-list">
                                <List.Item>
                                    <PriceChart data={this.state.data} />
                                </List.Item>
                            </List>
                        </Modal>
                    </WingBlank>
                )
            } else {
                return <Loading />
            }
        }
    }
}
