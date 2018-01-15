import React, { Component } from 'react'
import { Icon } from 'antd-mobile'
import {watchList} from '../config'

import CoinCardList from '../Components/CoinCardList'

export default class Market extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coinsList: watchList,
        }
    }
    render() {
        return (
            <div>
                <div className="page-title">
                    <img alt="market-icon" src="https://png.icons8.com/dusk/50/000000/statistics.png" />
                    <h2>行情</h2>
                    <Icon type="search" size={'sm'} />
                </div>
                <div className="page-container">
                    <CoinCardList {...this.state} />
                </div>
            </div>
        )
    }
}
