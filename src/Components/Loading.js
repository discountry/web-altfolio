import React, { Component } from 'react'

import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

import './Loading.css'

export default class Loading extends Component {
    render() {
        return (
            <WingBlank size="lg">
                    <Card>
                        <Card.Header />
                        <Card.Body style={{minHeight:0}}>
                            <div className="body-placeholder-lg animated-background"></div>
                            <WhiteSpace size="xs" />
                            <div className="body-placeholder-md animated-background"></div>
                        </Card.Body>
                        <Card.Footer />
                    </Card>
                <WhiteSpace size="xs" />
            </WingBlank>
        )
    }
}
