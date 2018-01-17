import React, { Component } from 'react';

import Altfolio from './Pages/Altfolio';
import Market from './Pages/Market';
import Exchange from './Pages/Exchange';

import { TabBar } from 'antd-mobile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'marketTab',
    };
  }

  renderContent(Page) {
    return (
      <div>
        <div className="blur-block"></div>
        <Page />
      </div>
    );
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          <TabBar.Item
            title="资产"
            key="Altfolio"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://png.icons8.com/wired/50/000000/currency.png) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://png.icons8.com/dusk/50/000000/currency.png) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'altfolioTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'altfolioTab',
              });
            }}
            data-seed="logId"
          >
            {this.renderContent(Altfolio)}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://png.icons8.com/wired/50/000000/statistics.png) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://png.icons8.com/dusk/50/000000/statistics.png) center center /  21px 21px no-repeat' }}
              />
            }
            title="行情"
            key="Market"
            selected={this.state.selectedTab === 'marketTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'marketTab',
              });
            }}
          >
            {this.renderContent(Market)}
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://png.icons8.com/wired/50/000000/bank-cards.png' }}
            selectedIcon={{ uri: 'https://png.icons8.com/dusk/50/000000/bank-cards.png' }}
            title="汇率"
            key="Exchange"
            selected={this.state.selectedTab === 'exchangeTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'exchangeTab',
              });
            }}
          >
            {this.renderContent(Exchange)}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default App;
