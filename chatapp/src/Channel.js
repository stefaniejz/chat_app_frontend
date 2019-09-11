import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Icon, Input, Tooltip, Button, Drawer, Modal} from 'antd';
import MessageList from './MessageList'
import moment from 'moment';





const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

class Channel extends Component {


  constructor(props) {
    super(props);
    this.state = {content: '', 
    messages: [],
    visble:false,
    members:[]

  }

    this.all_messages = {}
    this.last_message_ids = {}
    setInterval(() => {
      this.getMessageFetch(); 
      this.getMembersFetch(); 
     }, 1000);
  //    this.getMembersFetch(); 
  }

  handleInput=(e)=> {
      this.setState({
          content:e.target.value
      })
  }
  handleEnter=(e)=>{
      const inputValue=this.state.content
      this.setState({
          content:''
      })
      console.log(this.props.match.params.channelId)
      fetch("http://localhost:3000/messages", {
          method:'POST',
          body: JSON.stringify({
              content:inputValue,
              user_id:1,
              channel_id:this.props.match.params.channelId,
          }),
          headers:{
              'Content-Type': 'application/json'
            }
      })
  }


  
  showDrawer = () => {
  this.setState({
    visible: true,
  });
 };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  // showModal = () => {
  //   this.setState({
  //     modalVisible: true,
  //   });
  // };


    render() {
        let channelId = this.props.match.params.channelId;
        let channel = this.props.channels.filter(c => c.id.toString() === channelId)[0];
        
      
        return (
            <Layout>
            <Header className="channel-header">
              <div className="channel-header-name">{channel.name}</div>
              <div className="channel-header-member">
                <Button onClick={this.showDrawer} type="link" block><Icon type="user" />{channel.member_count}</Button>
              </div>      
            </Header>
            <Content>
            <Modal
              title="Users"
              visible={this.props.modalVisible}
              onOk={this.props.handleOk}
              onCancel={this.props.handleCancel}
              okButtonProps={{ disabled: true }}
              cancelButtonProps={{ disabled: true }}
              users={this.props.users}
            >
               {this.props.users.map(user=>{
                 return <p>{user.username}</p>
               })}
              {/* <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p> */}
            </Modal>
              <div id="primaryView" style={{ padding: 10, background: '#fff', height: this.props.primaryViewHeight, overflowY: 'auto' }}>
                <MessageList className="message-list" messages={this.state.messages}/>
              </div>
            </Content>
            <Drawer
            title= "Channel Members" 
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
             {this.state.members.map(member=>{
               return <p>{member.username} </p>
             })}
             
         
           </Drawer>           
            <Input
              size="large"
              placeholder="Message"
              prefix={<Icon type="message" />}
              suffix={<Icon type="smile" theme="outlined" />}
              onPressEnter={this.handleEnter}
              onChange={this.handleInput}
              value={this.state.content}
            />
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
          </Layout>
        );
    }

  getMessageFetch=()=>{
    let last_message_id = this.last_message_ids[this.props.match.params.channelId];
    if (!last_message_id) {
      last_message_id = -1;
    }

    let shouldScrollToEnd = false;
    fetch("http://localhost:3000/messages?channel_id=" + this.props.match.params.channelId + "&last_message_id=" + last_message_id)
    .then(res=>res.json())
    .then(data=>{
      if (!Array.isArray(data)) {
        return;
      }

      data.map(message=> {
        if (last_message_id < message.id) {
        shouldScrollToEnd = true;
        last_message_id = message.id;
        }

        let comment = this.convertToComment(message);

        if (!this.all_messages[message.channel_id]) {
          this.all_messages[message.channel_id] = [];
        }
        this.all_messages[message.channel_id].push(comment)
      })


      this.last_message_ids[this.props.match.params.channelId] = last_message_id


      this.setState({
          messages:this.all_messages[this.props.match.params.channelId],
      })

    })
    .then(()=>{
      if (shouldScrollToEnd) {
        this.scrollToEnd();
        shouldScrollToEnd = false;
      }
    })
  }

  getMembersFetch=()=> {
    fetch("http://localhost:3000/userchannels?channel_id=" + this.props.match.params.channelId ).then(r=>r.json())
    .then(data=>{
      const newmembers=[]
      data.map(user=>{
        newmembers.push(user)
        
      })
      this.setState({
        members:newmembers
      })
    })
  }

  scrollToEnd=()=>{
    let primaryViewDiv = document.getElementById('primaryView');
    if (primaryViewDiv != null) {
      primaryViewDiv.scrollTop = primaryViewDiv.scrollHeight;
    }
  }

  handleSearch=(value)=>{
    fetch("http://localhost:3000/users").then(r=>r.json())
    .then(data=>{
      
    })
  }

  convertToComment = (message) => {
    return  {
      author: message.user.username,
      avatar: message.user.avatar,
      channel_id: message.channel_id,
      content: (
        <p>
         {message.content}
        </p>
      ),
      datetime: (
        <Tooltip
          title={moment(message.created_at)
            .format('YYYY-MM-DD HH:mm:ss')}
        >
          <span>
            {moment(message.created_at)
              .fromNow()}
          </span>
        </Tooltip>
      ),
    }
  }
}



export default Channel;