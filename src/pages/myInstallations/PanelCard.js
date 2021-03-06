import React from 'react'
import { Card, Button, Row, Col, Icon, Popover, Popconfirm } from 'antd';
import './MyInstallations.css';
import { Link } from "react-router-dom";
import axiosConfig from '../../api/axiosConfig'
import CardSlider from './CardSlider'


const PanelCard = ({ panel, fetchPanels }) => {

  const access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  localStorage.setItem('pathname', "my-installations-sider")

  function updatePanelId() {
    localStorage.setItem('currentPanelId', JSON.stringify(panel.id));
    localStorage.setItem('idPanelfromUpload', JSON.stringify(panel.id));
    getSpecificSolarPanel(panel.id);
  }

  const text = 'Are you sure to delete this installation?';
  function confirm() {
    onDeleteClick()
  }

  function onDeleteClick() {
    deleteSolarPanel(panel.id)
  }

  const textMenu = <span id="popover-panels">INSTALLATION MENU</span>;
  const content = (
    <div id="popover-panels">
      <Link to={
        {
          pathname: "/show-panel-details-sider",
          myPanel: { panel }
        }
      }>
        <Button id="popover-menu-panels" >More details</Button>
      </Link>

      <Link to={
        {
          pathname: "/feed-panel-sider",
          myPanel: { panel }
        }
      }>
        <Button id="popover-menu-panels" >Feed</Button>
      </Link>

      <Popconfirm
        placement="leftBottom"
        title={text}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button id="popover-menu-panels">Delete</Button>
      </Popconfirm>

      <Link to={
        {
          pathname: "/first",
          myPanel: { panel }
        }
      }>
        <Button id="popover-menu-panels" onClick={updatePanelId}>Edit</Button>
      </Link>
    </div>
  );

  //DELETE SOLAR PANEL
  function deleteSolarPanel(id) {
    var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
    axiosConfig.delete("/solarPanel/" + id,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(result => {
        fetchPanels();
      });
  }

  //GET ESPECIFIC SOLAR PANEL
  function getSpecificSolarPanel(id) {
    axiosConfig
      .get('/solarPanel/' + id,
        {
          headers: {
            "Authorization": access_token
          }
        })
      .then(response => {
        const data = response.data
        localStorage.setItem('myPanel', JSON.stringify(data))
      })
  }

  return (
    <Col id="col-installation-container" span={24} xs={24} sm={24} md={24} lg={12} xl={12}>
      <Card id="installation-container">
        <Row>
          <Col id="col-title" xs={24} sm={24} md={24} lg={24} xl={24}>
            <p id="installation-tittle">{panel.installationName}</p>
          </Col>
          <Popover placement="left" title={textMenu} content={content} trigger="click" onClick={updatePanelId}>
            <Button id="installation-button-menu" >
              <Icon type="more" />
            </Button>
          </Popover>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <CardSlider multimedia={panel.multimedia} />
          </Col>
        </Row>
        <Row>
          <div id="installation-text-fields">
            <Col span={8}>
              <h5 id="panel-data-labels">
                Installed capacity
                  </h5>
              <h4 id="panel-data-fields">
                {panel.electrical_capacity} kW
                  </h4>
            </Col>
            <Col span={8}>
              <h5 id="panel-data-labels">
                Area
                  </h5>
              <h4 id="panel-data-fields">
                {panel.surface} m??
                  </h4>
            </Col>
            <Col span={8}>
              <h5 id="panel-data-labels">
                Inverter capacity
                  </h5>
              <h4 id="panel-data-fields">
                {panel.inverterCapacity} kW
                  </h4>
            </Col>
          </div>
        </Row>
      </Card>
    </Col >
  );
}

export default PanelCard