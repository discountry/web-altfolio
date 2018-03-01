import React, { Component } from 'react'
import axios from 'axios'
import { Badge } from 'antd-mobile';

export default class CryptoIndex extends Component {
  constructor() {
    super()
    this.state = {
      percentage: 0,
    }
  }
  componentDidMount() {
    axios.get(`http://cors-proxy.htmldriven.com/?url=http://crix.hu-berlin.de/data/crix_hf.json`)
    .then(res => {
        const data = JSON.parse(res.data.body)
        const change = (data[data.length - 1].price - data[0].price) / data[0].price
        this.setState({ 
          percentage: (change*100).toFixed(2)
         })
    })
  }
  render() {
    return (
      <p className="crix">
        <a style={{color: '#108ee9'}} rel="noopener noreferrer" href="http://crix.hu-berlin.de/" target="_blank">CRIX:</a><Badge text={`${this.state.percentage}%`} style={{ marginLeft: 5, 
          padding: '0 3px', 
          backgroundColor: this.state.percentage > 0 ? 'forestgreen' : 'crimson', 
          borderRadius: 2 }} />
      </p>
    )
  }
}
