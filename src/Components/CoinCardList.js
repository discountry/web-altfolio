import React, { Component } from 'react'

import Loading from './Loading'
import CoinCard from './CoinCard'

export default class CoinCardList extends Component {
    render() {
        if (this.props.isLoading) {
            return <Loading />
        } else {
            return (
                <div>
                    {this.props.coinsList.map(info => {
                        return <CoinCard key={info.coinName} {...info} />
                    })}
                </div>
            )
        }
    }
}
