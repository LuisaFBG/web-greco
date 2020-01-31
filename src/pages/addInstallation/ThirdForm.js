import React, { useState } from "react";
import { Form, Card, Col, Row, Checkbox, Button, Icon } from 'antd';
import { Redirect, Link } from "react-router-dom";
import panelTracking from '../../assets/panel-tracking.svg'
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import './thirdForm.css'

const ThirdForm = (props) => {

    var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
    const [data, setData] = useState(currentPanelState);
    const [orientation, setOrientation] = useState(false);
    const [inclination, setInclination] = useState(false);

    const handleOrientation = () => setOrientation(!orientation)
    const handleInclination = () => setInclination(!inclination)

    const handleInputChange = event => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        event.persist()
        setData({ ...data, isSubmitting: true, errorMessage: null });
        localStorage.setItem('currentPanelState', JSON.stringify(data))
        activateRedirection()
    }

    //Redirect
    const [toLocation, setLocation] = useState(false);
    function activateRedirection() {
        setLocation(true)
    }

    return (
        <Row>
            <div id="background-panel-register">

                <Card id="card-panel-register-inside">
                    <Col span={24} id="" xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div id="pagination">
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletPle} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                        </div>
                    </Col>

                    <Link to="/private-mapping">
                        <Button id="forms-close-button">
                            <Icon type="close" id="icon-x" />
                        </Button>
                    </Link>

                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2 id="tittle-panel-registration">Panel tracking</h2>
                    </Col>
                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <p id="text-panel-registration">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </Col>

                    <Form onSubmit={handleFormSubmit}>
                        <div >
                            <Col id="register-panel-fields-third" span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item>
                                    <Checkbox label='Orientation'
                                        id="panelTrackingOrientation"
                                        name="panelTrackingOrientation"
                                        onClick={handleOrientation}
                                        checked={orientation ? (data.panelTrackingOrientation = true) : (data.panelTrackingOrientation = false)}
                                        onChange={handleInputChange}
                                    >
                                        Orientation
                                    </Checkbox>
                                </Form.Item>

                            </Col>
                            <Col id="register-panel-fields-third" span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item>
                                    <Checkbox label='Inclination'
                                        id="panelTrackingInclination"
                                        name="panelTrackingInclination"
                                        onClick={handleInclination}
                                        checked={inclination ? (data.panelTrackingInclination = true) : (data.panelTrackingInclination = false)}
                                        onChange={handleInputChange}
                                    >
                                        Inclination
                                    </Checkbox>
                                </Form.Item>
                            </Col>
                        </div>
                        <Col id="col-image-panel-tracking" span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div>
                                <img src={panelTracking} id="image-panel-tracking" />
                            </div>
                        </Col>

                        <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Link to="/second">
                                <Button id="button-panel-register-previous-third">PREVIOUS</Button>
                            </Link>
                        </Col>
                        <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Button id="button-panel-register-next-third" type="submit" onClick={handleFormSubmit}>
                                NEXT
                                {toLocation ? <Redirect from="/third" to="/fourth" /> : null}
                            </Button>

                        </Col>

                    </Form>
                </Card>
            </div >
        </Row >
    )

}

export default ThirdForm