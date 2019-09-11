import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Layout, Menu, Icon, Input, Tooltip, Button, Checkbox, Form} from 'antd';
import Channel from './Channel'
import ChannelList from './ChannelList'
import moment from 'moment';
import NormalLoginForm from './NormalLoginForm'
import RegistrationForm from './RegistrationForm'

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  state={
    primaryViewHeight:"",
    last_message_id:0,
    jwt: null,
    channels: [
      {
        id: 1,
        name: "Channel 1",
        member_count: 11,
        channel_type: "group"
      },
      {
        id: 2,
        name: "Channel 2",
        member_count: 12,
        channel_type: "group"
      },
      {
        id: 3,
        name: "Channel 3",
        member_count: 13,
        channel_type: "group"
      },
      {
        id: 4,
        name: "Stephanie",
        member_count: 1,
        channel_type: "direct"
      }
    ]
    // messages:[
    //   {
    //     author: 'Han Solo',
    //     avatar: 'http://image.bee-ji.com/233220',
    //     content: (
    //       <p>
    //         We supply a series of design principles, practical patterns and high quality design
    //         resources (Sketch and Axure), to help people create their product prototypes beautifully and
    //         efficiently.
    //       </p>
    //     ),
    //     datetime: (
    //       <Tooltip
    //         title={moment()
    //           .subtract(1, 'days')
    //           .format('YYYY-MM-DD HH:mm:ss')}
    //       >
    //         <span>
    //           {moment()
    //             .subtract(1, 'days')
    //             .fromNow()}
    //         </span>
    //       </Tooltip>
    //     ),
    //   },
    //   {
    //     author: 'Han Solo',
    //     avatar: 'https://www.ruan8.com/uploadimg/image/20190801/20190801162208_25373.jpg',
    //     content: (
    //       <p>
    //         We supply a series of design principles, practical patterns and high quality design
    //         resources (Sketch and Axure), to help people create their product prototypes beautifully and
    //         efficiently.
    //       </p>
    //     ),
    //     datetime: (
    //       <Tooltip
    //         title={moment()
    //           .subtract(2, 'days')
    //           .format('YYYY-MM-DD HH:mm:ss')}
    //       >
    //         <span>
    //           {moment()
    //             .subtract(2, 'days')
    //             .fromNow()}
    //         </span>
    //       </Tooltip>
    //     ),
    //   },
    // ],
    // directmessages: [
    //   {
    //     id: 0,
    //     name: "Stephanie",
    //     avatar:"https://pic.qqtn.com/up/2018-3/15222315731259519.jpg"

    //   },
    //   {
    //     id: 1,
    //     name: "Grace",
    //     avatar:"http://n.sinaimg.cn/sinacn10112/513/w686h627/20190606/de67-hxyuaph9525998.jpg"
    //   },
    //   {
    //     id: 2,
    //     name: "Jack",
    //     avatar:"https://www.qq745.com/uploads/allimg/170714/22-1FG4101U5E0.png"
    //   },
    //   {
    //     id: 3,
    //     name: "Brian",
    //     avatar:"http://img.zz21.com/2015/0427/20150427110202176.jpg"
    //   }
    // ]
  }

  wrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
  wrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

  render() {
    return (
      <div className="App">
        <Router>
          <div>
          <Route exact path={`/channel/:channelId`} render={(routerProps)=>(
            <Layout style={{height:"100vh"}}>
                  <Sider width={150} trigger={null}>
                    <div className="logo" />
                    <ChannelList {...routerProps} channels={this.state.channels.filter(c => c.channel_type === "group")}
                     directmessages={this.state.channels.filter(c => c.channel_type === "direct")}/>
                  </Sider>
                  <Channel {...routerProps}
                  primaryViewHeight={this.state.primaryViewHeight}
                  channels={this.state.channels}
                  />                 
            </Layout>
          )} />
          <Route exact path={"/login"} render={(routerProps)=>(
             <div className="center-form">
             
             <this.wrappedNormalLoginForm onSaveJWT={this.saveJWT} />
             </div>
          )}/>
          <Route exact path={"/register"} render={(routerProps)=>(
             <div className="center-form">
             <this.wrappedRegistrationForm/>
             </div>
          )}/>
          </div>
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
    this.getChannelFetch()
  }
   
  getChannelFetch=()=>{
    fetch("http://localhost:3000/channels?user_id=1").then(res=>res.json())
    .then(data=>{
      if (!Array.isArray(data)) {
        return;
      }
       const channels= data.map(channel=>{
         return this.convertToChannel(channel)
       })
       this.setState({
         channels:channels
       })
    })
    
  }

  componentWillUnmount = () =>  {
    window.removeEventListener("resize", this.updatePrimaryViewHeight);
  }

  convertToChannel = (channel) =>{
    return {
      id:channel.id,
      name:channel.channel_type === "direct" ?  channel.members.filter(m => m.id != 1)[0].username : channel.name,
      member_count:channel.member_count,
      channel_type:channel.channel_type,
      members:channel.members
      
    }
  }

  saveJWT = (jwt) => {
    this.setState({
      jwt: jwt
    })
  }
}

export default App;
