import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Icon, Input, Tooltip, Button } from 'antd';
import MessageList from './MessageList'

const { Header, Content, Footer, Sider } = Layout;

class Channel extends Component {
    render() {
        let channelId = this.props.match.params.channelId;
        let channel = this.props.channels[channelId];
        return (
            <Layout>
            <Header className="channel-header">
              <div className="channel-header-name">{channel.name}</div>
              <div className="channel-header-member"><Button type="link" block><Icon type="user" />{channel.member_count}</Button></div>
            </Header>
            <Content>
              <div style={{ padding: 10, background: '#fff', height: this.props.primaryViewHeight, overflowY: 'auto' }}>
                <MessageList className="message-list" messages={this.props.messages}/>
              </div>
            </Content>
            <Input
              size="large"
              placeholder="Message"
              prefix={<Icon type="message" />}
              suffix={<Icon type="smile" theme="outlined" />}
            />
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
          </Layout>
        );
    }
}

export default Channel;