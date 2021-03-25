import React, { Component } from 'react'
import { Modal } from 'antd-mobile'

import CoinCard from './CoinCard'
import ChartTab from './ChartTab'


export default class CoinCardList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            symbol: 'BTC',
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
    render() {
        return (
            <div style={{paddingBottom: '5rem'}}>
                {this.props.coinsList.map(info => <CoinCard key={info.symbol} {...info} removeFromList={this.props.handleremoveFromList} handleShowModal={this.handleShowModal} />)}
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
