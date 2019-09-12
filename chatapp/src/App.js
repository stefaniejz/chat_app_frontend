import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Layout, Form} from 'antd';
import Channel from './Channel'
import ChannelList from './ChannelList'
import NormalLoginForm from './NormalLoginForm'
import RegistrationForm from './RegistrationForm'

const { Header, Content, Footer, Sider } = Layout;;
const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    true
      ? <Component {...rest} {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
);

class App extends React.Component {
  state={
    primaryViewHeight:"",
    last_message_id:0,
    jwt: null,
    currentUserId: localStorage.getItem("currentUserId") ?  parseInt(localStorage.getItem("currentUserId")) : 1,
    users:[],
    modalVisible:false,
    channels: []
  }

  wrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
  wrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
  
  render() {
    return (
      <div className="App">
        <Router>
          <div>
          <Route exact path={`/`} render={(routerProps)=>(
            <Layout style={{height:"100vh"}}>
            <Sider width={150} trigger={null}>
              <div className="logo" />
              <ChannelList channels={this.state.channels.filter(c => c.channel_type === "group")}
              directmessages={this.state.channels.filter(c => c.channel_type === "direct")}
              onAddFriend={this.handleAddFriend}
              />
            </Sider>
            <Channel
            primaryViewHeight={this.state.primaryViewHeight}
            channels={this.state.channels}
            handleOk={this.handleOk}
            handleCancel={this.handleCancel}
            users={this.state.users}
            modalVisible={this.state.modalVisible}
            refreshChannels={this.getChannelFetch}
            currentUserId={this.state.currentUserId}
            {...routerProps}
            /> 
            </Layout>
          )} />
          <Route exact path={`/channel/:channelId`} render={(routerProps)=>(
            <Layout style={{height:"100vh"}}>
            <Sider width={150} trigger={null}>
              <div className="logo" />
              <ChannelList channels={this.state.channels.filter(c => c.channel_type === "group")}
              directmessages={this.state.channels.filter(c => c.channel_type === "direct")}
              onAddFriend={this.handleAddFriend}
              />
            </Sider>
            <Channel
            primaryViewHeight={this.state.primaryViewHeight}
            channels={this.state.channels}
            handleOk={this.handleOk}
            handleCancel={this.handleCancel}
            users={this.state.users}
            modalVisible={this.state.modalVisible}
            refreshChannels={this.getChannelFetch}
            currentUserId={this.state.currentUserId}
            {...routerProps}
            /> 
            </Layout>
          )} />
          <Route exact path={"/login"} render={(routerProps)=>(
             <div className="center-form">
             <this.wrappedNormalLoginForm {...routerProps} onSaveJWT={this.saveJWT} handleLogin={this.handleLogin} />
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
    this.getChannelFetch()
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.updatePrimaryViewHeight);
  }
   
  getChannelFetch=()=>{
    fetch("http://localhost:3000/channels?user_id=" + this.state.currentUserId).then(res=>res.json())
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

  handleAddFriend=()=>{
    fetch("http://localhost:3000/users").then(r=>r.json())
    .then(data=>{
      const users=[]
       data.map(user=>{
         users.push(user)
       })
       this.setState({
         users:users,
         modalVisible:true
       })
    })
    console.log("showmodal") 

  }
  componentWillUnmount = () =>  {
    window.removeEventListener("resize", this.updatePrimaryViewHeight);
  }

  convertToChannel = (channel) =>{
    return {
      id:channel.id,
      name:channel.channel_type === "direct" ?  channel.members.filter(m => m.id != this.state.currentUserId)[0].username : channel.name,
      member_count:channel.member_count,
      channel_type:channel.channel_type,
      members:channel.members
      
    }
  }
  handleOk = e => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };

  saveJWT = (jwt, currentUserId) => {
    this.setState({
      jwt: jwt,
      currentUserId: currentUserId
    })
  }
}

export default App;
