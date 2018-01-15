import React, { Component } from 'react'

import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, Tooltip } from 'recharts';

export default class PriceChart extends Component {
  render() {
    return (
      <ResponsiveContainer width="100%" height="90%" minHeight={200}>
        <LineChart data={this.props.data}>
          <Line type="monotone" dataKey="价格" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          {/*<YAxis unit="¥" />*/}
          <Tooltip formatter={(v) => v+' ¥'} />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}
