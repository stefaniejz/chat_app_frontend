import React, { Component } from 'react';
import { Drawer, Button} from 'antd';
import './App.css';


class Drawer extends React.Component {
    state = { visible: false };
  
    showDrawer = () => {
        console.log("showDrawer")
      this.setState({
        visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: true,
      });
    };
  
    render() {
      return (
        <div>
          <Button type="primary" onClick={this.showDrawer}>
            Open
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </div>
      );
    }
  }



export default Drawer