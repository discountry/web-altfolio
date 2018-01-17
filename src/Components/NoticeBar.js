import React, { Component } from 'react'

import './NoticeBar.css'

export default class NoticeBar extends Component {
  render() {
    return (
      <div className="am-notice-bar" role="alert">
        <div className="am-notice-bar-icon" aria-hidden="true">
          <svg className="am-icon am-icon-voice am-icon-xxs"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#voice"></use></svg>
        </div>
        <div className="am-notice-bar-content">
          <div className="am-notice-bar-marquee-wrap" role="marquee">
            <div className="am-notice-bar-marquee">
              {this.props.children}
            </div>
          </div>
        </div>
        <div className="am-notice-bar-operation" role="button" aria-label="go to detail">
          {this.props.action}
        </div>
      </div>
    )
  }
}
