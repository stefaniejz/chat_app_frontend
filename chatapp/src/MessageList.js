import React, { Component } from 'react';
import { Comment, Tooltip, List } from 'antd';


class MessageList extends Component {
    render() {
        return (
            <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={this.props.messages}
                renderItem={item => (
                <li>
                    <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                    />
                </li>
                )}
            />
        );
    }
}

export default MessageList;