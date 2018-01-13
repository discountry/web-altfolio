import React, { Component } from 'react'
import axios from 'axios'
import {watchList} from '../config'

import CoinCardList from '../Components/CoinCardList'

export default class Market extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            coinsList: [],
        }
    }
    componentDidMount() {
        axios.get(`https://min-api.cryptocompare.com/data/all/coinlist`)
            .then(res => {
                let coinsList = []
                watchList.map(symbol => coinsList.push({
                    symbol: symbol,
                    coinName: res.data.Data[symbol].CoinName,
                    ImageUrl: res.data.Data[symbol].ImageUrl,
                }))
                this.setState({ 
                    isLoading: !this.state.isLoading,
                    coinsList
                })
            })
    }
    render() {
        return (
            <div>
                <div className="page-title">
                    <img alt="market-icon" src="https://png.icons8.com/dusk/50/000000/statistics.png" />
                    <h2>Market</h2>
                </div>
                <div className="page-container">
                    <CoinCardList {...this.state} />
                </div>
            </div>
        )
    }
}
