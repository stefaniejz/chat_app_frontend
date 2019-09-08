import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import './App.css';
const { SubMenu } = Menu;
class ChannelList extends Component {
    handleClick=(item)=> {
       this.props.history.push(`/channel/${item.key}`);
    }
    render() {
        return (<Menu inlineIndent={10} defaultOpenKeys={['channel']} theme="dark" 
                mode="inline" 
                defaultSelectedKeys={['4']}
                onClick={this.handleClick}
                >
                <SubMenu key="channel" title="Channel">               
                    {this.props.channels.map(channel=>{
                        return (<Menu.Item key={channel.id}>
                            <Icon type="user" />
                            <span className="nav-text">{channel.name}</span>
                            </Menu.Item>);
                    })}
                </SubMenu> 
        </Menu>);
         

        
    }
}

export default withRouter(ChannelList);