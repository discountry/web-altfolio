import React, { Component } from 'react'

import CoinCard from './CoinCard'

export default class CoinCardList extends Component {
    render() {
        return (
            <div>
                {this.props.coinsList.map(info => {
                    return <CoinCard key={info.coinName} {...info} />
                })}
            </div>
        )
    }
}
