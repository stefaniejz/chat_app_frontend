import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Menu, Icon, Button} from 'antd';
import './App.css';
const { SubMenu } = Menu;
class ChannelList extends Component {
    handleClick=(item)=> {
       this.props.history.push(`/channel/${item.key}`);
    }
    handleAddFriend=()=>{
        this.props.onAddFriend()

    }
    

    render() {
        return (<div>
                <div className="add-friend"><Button onClick={this.handleAddFriend}type="link" block><Icon type="plus-circle" />Add Friend</Button></div>
                <Menu inlineIndent={10} defaultOpenKeys={['channel', 'directmessage']} theme="dark" 
                mode="inline" 
                
                >
                <SubMenu key="channel" title="Channels">               
                    {this.props.channels.map(channel=>{
                        return (<Menu.Item key={channel.id} onClick={this.handleClick}>
                            <Icon type="team" />
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
        </Menu></div>);
         
      
        
    }

    scrollToEnd=()=>{
        let primaryViewDiv = document.getElementById('primaryView');
        if (primaryViewDiv != null) {
            primaryViewDiv.scrollTop = primaryViewDiv.scrollHeight;
        }
    }
}

export default withRouter(ChannelList);