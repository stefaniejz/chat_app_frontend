import React, { Component } from 'react';
import './App.css';
import { Modal, AutoComplete, Avatar } from 'antd';
const { Option } = AutoComplete;
class AddFriendModel extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            value: '',
            dataSource: this.renderOptions(this.props.users, 'searchText')
        };
    }
    

    onSearch = searchText => {
        console.log(this.props.users)
        if (this.props.users) {
            this.setState({
                dataSource: this.renderOptions(this.props.users, searchText)
            });
        }
    };

    onHandleChooseFriend = (value, option) => {
        console.log(value)
        let friend = this.props.users.filter(user => user.username === value)[0]
        fetch("http://localhost:3000/direct_channel?user_id=1&member_id=" + friend.id, {
            method: 'POST',
          }).then(r=>r.json())
        .then(channel=>{
            this.props.onCancel();
            this.props.refreshChannels();
            console.log("here", channel)
            this.props.history.push("/channel/" + channel.id);
        })
    }

    renderOptions = (users, searchText) => {
        console.log(users)
        return users
                .filter(user => (user.username.includes(searchText) || searchText === "") && user.id !== 1)
                .map( user =>
                    {
              
                        return (<Option key={user.id} value={user.username}>
                                <div>
                                    <span><Avatar src={user.avatar} /></span>
                                    <span>{user.username}</span> 
                                </div>
                                </Option>);
                    }
                )
    }

    onChange = value => {
        this.setState({ value });
    };

    render() {
        this.model = <Modal
              title="Start Direct Message"
              visible={this.props.visible}
              onOk={this.props.onOk}
              onCancel={this.props.onCancel}
              users={this.props.users}
              footer={[]}
            >
                <AutoComplete
                    dataSource={this.state.dataSource}
                    size="large"
                    style={{ width: '100%' }}
                    onSearch={this.onSearch}
                    onSelect={this.onHandleChooseFriend}
                    defaultOpen={true}
                    optionLabelProp="value"
                    placeholder="search a friend's name"
                />
                {/* {this.props.users.map(user=>{
                    return <p>{user.username}</p>
                })} */}
            </Modal>;
        return (
            this.model
        );
    }
}

export default AddFriendModel;