import React, { useState } from "react";
import { Form, Card, Icon, Button, Col, Row, Select, Input, Switch, message, Divider } from 'antd';
import { Link } from "react-router-dom";
import compass from '../../assets/compass.svg'
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import './fourthForm.css'

const FourthForm = props => {

    localStorage.setItem("lastPage", localStorage.getItem("actualPage"))
    localStorage.setItem("actualPage", "/fourth")

    //MOBILE GYRO*********************************************************
    //MOBILE VERSION
    function isMobile(a) {
        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)));
    }
    console.log("isMobile?", isMobile(navigator.userAgent || navigator.vendor || window.opera))
    const [degree, setDegree] = useState()
    window.parent.postMessage('getGyroscope', '*');
    //MOBILE GYRO********************************************************

    var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
    var orientation
    if (currentPanelState !== null) {
        orientation = currentPanelState.orientation
    }
    const [data, setData] = useState(currentPanelState);
    const [isChecked, setChecked] = useState(true);
    const { Option } = Select;

    function onChangeSwitch() {
        setChecked(!isChecked)
    }

    const handleInputSelectChange = value => {
        parseInt(value, 10);
        setData({ ...data, orientation: value });
    };

    const handleInputChange = event => {
        if (event.target.value && isNaN(event.target.value)) {
            error()
        } else {
            if (event.target.value > 360) {
                maxMin();
            } else {
                setData({ ...data, [event.target.name]: event.target.value, errorMessage: null });
            }
        }
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        event.persist()
        setData({ ...data, isSubmitting: true, errorMessage: null });
        localStorage.setItem('currentPanelState', JSON.stringify(data))
        checkTracking()
    }

    //Redirect
    const [toLocation, setLocation] = useState(false);
    function activateRedirection() {
        setLocation(true)
    }

    function resetInput(event) {
        event.target.value = ""
    }

    function clearPanel() {
        localStorage.removeItem("currentPanelState");
        localStorage.removeItem("myPanel");
        localStorage.removeItem("currentPanelId");
    }

    const error = () => {
        message.error('Only numbers, please.', 5);
    };

    const maxMin = () => {
        message.error('Only up to 360?? maximum, please.', 5);
    };

    function checkTracking() {
        if (currentPanelState.panelTrackingInclination === true) {
            props.history.push('/sixth')
        } else {
            props.history.push('/fifth')
        }
    }

    const isEnabled = (data.orientation && data.orientation !== "" || orientation && orientation > 0);

    const warningFields = () => {
        message.warning('Please select or input orientation degrees', 5);
    };

    return (
        <Row>
            <Card id="card-panel-register-inside">
                <Row>
                    <Col span={2} xs={2} sm={2} md={2} lg={2} xl={2}>

                    </Col>
                    <Col span={20} xs={20} sm={20} md={20} lg={20} xl={20}>
                        <div id="pagination">
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletPle} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                        </div>
                    </Col>
                    <Col span={2} xs={2} sm={2} md={2} lg={2} xl={2}>
                        <Link to="/my-installations-sider">
                            <Button id="forms-close-button" onClick={clearPanel}>
                                <Icon type="close" id="icon-x" />
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2 id="tittle-panel-registration">Panel orientation</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <p id="text-panel-registration">
                            Use the orientation provided by your smartphone or type it in. If you don't know the precise orientation, click on the button and use the drop-down menu below.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div id="selector">
                            <Switch
                                onChange={onChangeSwitch}
                                name="selector"
                            />
                        </div>
                    </Col>
                </Row>
                <Divider id="transparent-divider"></Divider>
                <Row>
                    <Col>
                        {isChecked ?
                            (
                                <React.Fragment>
                                    <Form onSubmit={handleFormSubmit}>
                                        <div id="gyro_response" />
                                        <input id="orientationFromMobile_alpha" name="orientationFromMobile_alpha"
                                            onClick={event => {
                                                var grados = JSON.parse(event.target.value);
                                                grados = Math.round(grados);
                                                setDegree(grados);
                                            }}
                                        >
                                        </input>
                                        <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Form.Item>
                                                <div id="div-inclination-orientation-background">
                                                    <label id="panel-inclination-orientation-label-input">Input degrees</label>
                                                    <Input
                                                        onClick={resetInput}
                                                        value={data.orientation || orientation}
                                                        onChange={handleInputChange}
                                                        placeholder="30.9??"
                                                        id="orientation"
                                                        name="orientation"
                                                        required
                                                    />
                                                </div>
                                            </Form.Item>
                                            {/* {isMobile(navigator.userAgent || navigator.vendor || window.opera) && degree > 0 ?
                                                (<p id="gyroscope-message">Mobile compass orientation: {degree}??</p>) : (null)} */}
                                        </Col>
                                        <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <img src={compass} id="register-panel-image-fourth" />
                                        </Col>
                                        <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Link to="/third">
                                                <Button id="button-panel-register-previous-fourth">BACK</Button>
                                            </Link>
                                        </Col>
                                        <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Button
                                                // disabled={!isEnabled}
                                                id="button-panel-register-next-fourth"
                                                type="submit"
                                                onClick={isEnabled ? (handleFormSubmit) : (warningFields)}>
                                                NEXT
                                                {toLocation ? (props.history.push("/fifth")) : (null)}
                                            </Button>
                                        </Col>
                                    </Form>
                                </React.Fragment>
                            )
                            :
                            (
                                <React.Fragment>
                                    <Form onSubmit={handleFormSubmit}>
                                        <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <div id="div-select-inclination-orientation-background">
                                                <label id="panel-inclination-orientation-label">Select degrees</label>
                                                <Select
                                                    id="select-orientation"
                                                    style={{ width: 200 }}
                                                    name="orientation"
                                                    onChange={handleInputSelectChange}>

                                                    <Option value="1">NE (from 0?? to 45??)</Option>
                                                    <Option value="45">EN (from 45?? to 90??)</Option>

                                                    <Option value="90">ES (from 90?? to 135??)</Option>
                                                    <Option value="135">SE (from 135?? to 180??)</Option>


                                                    <Option value="180">SW (from 180?? to 225??)</Option>
                                                    <Option value="225">WS (from 225?? to 270??)</Option>

                                                    <Option value="270">WN (from 270?? to 315??)</Option>
                                                    <Option value="315">NW (from 315?? to 360??)</Option>

                                                </Select>
                                            </div>
                                        </Col>
                                        <Col id="triqui" span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <img src={compass} id="register-panel-image-fourth-select" />
                                        </Col>
                                        <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Link to="/third">
                                                <Button id="button-panel-register-previous-fourth">BACK</Button>
                                            </Link>
                                        </Col>
                                        <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Button
                                                // disabled={!isEnabled}
                                                id="button-panel-register-next-fourth"
                                                type="submit"
                                                onClick={isEnabled ? (handleFormSubmit) : (warningFields)}>
                                                NEXT
                                                {toLocation ? (props.history.push("/fifth")) : null}
                                            </Button>
                                        </Col>
                                    </Form>
                                </React.Fragment>
                            )}
                    </Col>
                </Row>
            </Card>
        </Row >
    )
}

export default FourthForm