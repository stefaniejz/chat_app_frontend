import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import moment from 'moment';
import './App.css';
import { Layout, Menu, Icon, Input, Tooltip, Button } from 'antd';
import Channel from './Channel'
import ChannelList from './ChannelList'

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  state={
    primaryViewHeight:"",
    channels: [
      {
        id: 0,
        name: "Channel 1",
        member_count: 11
      },
      {
        id: 1,
        name: "Channel 2",
        member_count: 12
      },
      {
        id: 2,
        name: "Channel 3",
        member_count: 13
      },
      {
        id: 3,
        name: "Channel 4",
        member_count: 14
      }
    ],
    messages:[
      {
        author: 'Han Solo',
        avatar: 'http://image.bee-ji.com/233220',
        content: (
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully and
            efficiently.
          </p>
        ),
        datetime: (
          <Tooltip
            title={moment()
              .subtract(1, 'days')
              .format('YYYY-MM-DD HH:mm:ss')}
          >
            <span>
              {moment()
                .subtract(1, 'days')
                .fromNow()}
            </span>
          </Tooltip>
        ),
      },
      {
        author: 'Han Solo',
        avatar: 'https://www.ruan8.com/uploadimg/image/20190801/20190801162208_25373.jpg',
        content: (
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully and
            efficiently.
          </p>
        ),
        datetime: (
          <Tooltip
            title={moment()
              .subtract(2, 'days')
              .format('YYYY-MM-DD HH:mm:ss')}
          >
            <span>
              {moment()
                .subtract(2, 'days')
                .fromNow()}
            </span>
          </Tooltip>
        ),
      },
    ]
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path={`/channel/:channelId`} render={(routerProps)=>(
            <Layout style={{height:"100vh"}}>
                  <Sider width={150} trigger={null}>
                    <div className="logo" />
                    <ChannelList {...routerProps} channels={this.state.channels}/>
                  </Sider>
                  <Channel {...routerProps}
                  primaryViewHeight={this.state.primaryViewHeight}
                  channels={this.state.channels}
                  messages={this.state.messages}
                  />
            </Layout>
          )} />
        </Router>
      </div>
    );
  }

  updatePrimaryViewHeight = () => {
    let windowHeight = document.getElementsByTagName('body')[0].clientHeight;
    this.setState({primaryViewHeight: windowHeight-104})
  }

  componentWillMount = () =>  {
    this.updatePrimaryViewHeight();
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.updatePrimaryViewHeight);
  }

  componentWillUnmount = () =>  {
    window.removeEventListener("resize", this.updatePrimaryViewHeight);
  }
}

export default App;
