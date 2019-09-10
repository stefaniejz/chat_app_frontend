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
        return (<Menu inlineIndent={10} defaultOpenKeys={['channel', 'directmessage']} theme="dark" 
                mode="inline" 
                
                >
                <SubMenu key="channel" title="Channels">               
                    {this.props.channels.map(channel=>{
                        return (<Menu.Item key={channel.id} onClick={this.handleClick}>
                            <Icon type="user" />
                            <span className="nav-text">{channel.name}</span>
                            </Menu.Item>);
                    })}
                </SubMenu>
                <SubMenu key="directmessage" title="Direct Messages">               
                    {this.props.directmessages.map(directmessage=>{
                        return (<Menu.Item key={directmessage.id} onClick={this.handleClick}>
                            <Icon type="user" />
                            <span className="nav-text">{directmessage.name}</span>
                            </Menu.Item>);
                    })}
                </SubMenu>
        </Menu>);
         

        
    }

    scrollToEnd=()=>{
        let primaryViewDiv = document.getElementById('primaryView');
        if (primaryViewDiv != null) {
            primaryViewDiv.scrollTop = primaryViewDiv.scrollHeight;
        }
    }
}

export default withRouter(ChannelList);