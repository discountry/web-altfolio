import React, { Component } from 'react'
import { Modal } from 'antd-mobile'
import axios from 'axios'

import CoinCard from './CoinCard'
import Loading from './Loading'
import ChartTab from './ChartTab'
import {isSymbol} from '../Utils'


export default class CoinCardList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            modal: false,
            symbol: 'BTC',
            data: {},
        }
    }
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    handleShowModal = (symbol) => {
        this.setState({
            symbol,
            modal: !this.state.modal
        })
    }
    componentDidMount() {
        let symbolList = this.props.coinsList.map(info => info.symbol)
        axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbolList.join(',')}&tsyms=CNY`)
        .then(res => {
            this.setState({
                data: res.data.RAW,
                isLoading: false,
             })
        })
    }
    componentDidUpdate() {
        
    }
    render() {
        if (this.state.isLoading) {
            return <Loading />
        } else {
            return (
                <div>
                    {Object.keys(this.state.data).map(function(key, index) {
                        return <CoinCard key={key} {...this.state.data[key].CNY} {...this.props.coinsList.find(isSymbol.bind(null, key))} handleShowModal={this.handleShowModal} />
                    }.bind(this))}
                    <Modal
                        popup
                        visible={this.state.modal}
                        onClose={this.toggleModal}
                        animationType="slide-up"
                        >
                        <ChartTab symbol={this.state.symbol} />
                    </Modal>
                </div>
            )
        }
    }
}
