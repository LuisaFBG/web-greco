import React, { Component } from 'react';
import { Button, Badge } from 'antd';
import { Link } from "react-router-dom";
import notificationsOff from '../../assets/notifications-off.svg'
import axiosConfig from '../../api/axiosConfig'

const access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))

class NotificationsMenu extends Component {
  state = {
    visible: false,
    show: false,
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  onChange = show => {
    this.setState({ show });
  };

  // GET UNREAD NOTIFICATIONS
  fetchNotifications() {
    axiosConfig.get("/comment/unreadcomments",
      {
        headers: {
          "Authorization": access_token
        }
      })
      .then(response => {
        const notifications = response.data
        if (notifications && notifications.length > 0) {
          this.setState({
            show: true,
          });
        }
        else {
          this.setState({
            show: false,
          });
        }
      })
  }
  componentDidMount() {
    this.fetchNotifications();
  }

  render() {
    return (
      <nav id="navBar">
        <Button onClick={this.showDrawer} id="notifications-button">
          <Link to="/notifications" className="nav-text">
            <Badge dot={this.state.show}><img src={notificationsOff} alt="menu-icon" id="menu-icon" width="24" height="24" /></Badge>
          </Link>
        </Button>
      </nav>
    );
  }
}

export default NotificationsMenu;