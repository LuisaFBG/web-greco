// import React from 'react'
// import { Tag, Slider } from 'antd';
// import './Statistics.css';
// import axiosConfig from '../../api/axiosConfig';

// const marks = {
//   0: '0GW',
//   17: '17GW',
//   27: '27GW',
//   37: {
//     style: {
//       color: '#db4196',
//     },
//     label: <strong>37GW</strong>,
//   },
// };

// class ClimateObjective extends React.Component {

//   // componentDidMount() {
//   //   axiosConfig
//   //     .get('/co2saving')
//   //     .then(response => {
//   //       var response = response.data;
//   //       console.log(response)
//   //     });
//   // }

//   render() {
//     return (
//       <React.Fragment>
//         <div id="slider">
//           {/* <Tooltip title="3 done / 3 in progress / 4 to do"> */}

//           <div>
//             <Slider range marks={marks} min={0} max={37} defaultValue={[3, 27]} id="slider-climate-objective" disabled />
//           </div>

//           {/* <Progress
//             percent={100}
//             successPercent={56}
//             format={() => 'GW'}
//             id="climate-objective-progress" /> */}

//         </div>
//         {/* <div id="measurements-left">
//           <Tag color="#2a4092" id="tag">13</Tag>
//           <p>Total PV today</p>
//         </div>
//         <div id="measurements-right">
//           <Tag color="#db4196" id="tag">3</Tag>
//           <p>Citizen owned PV</p>
//         </div> */}
//       </React.Fragment>
//     );
//   }
// }

// export default ClimateObjective


import React from 'react'
import { Tag, Slider } from 'antd';
import './Statistics.css';
import axiosConfig from '../../api/axiosConfig';

const marks = {
  0: '0GW',
  25: '25GW',
  50: '50GW',
  75: '75GW',
  100: {
    style: {
      color: '#db4196'
    },
    label: <strong>100GW</strong>
  }
};

class ClimateObjective extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minCo2: 0,
      maxCo2: 0
    }
  }


  getCo2Saving() {
    axiosConfig
      .get('/co2saving')
      .then(response => {
        const minCo2 = response.data.minCo2
        const maxCo2 = response.data.maxCo2
        this.setState({ minCo2: response.data.minCo2 });
        this.setState({ maxCo2: response.data.maxCo2 });
        console.log("PROVA STATE MIN", this.state.minCo2)
        console.log("PROVA STATE MAX", this.state.maxCo2)

      });
  }

  componentDidMount() {
    this.getCo2Saving();
  }

  render() {
    return (
      <React.Fragment>
        <div id="slider">
          <div>
            <Slider range marks={marks} min={0} max={100} defaultValue={[30, 50]} id="slider-climate-objective" disabled />
          </div>
          <p id="small-letters-installed">This value is an estimate based on global parameters</p>
        </div>
        <div id="measurements-left">
          <Tag color="#2a4092" id="tag">13</Tag>
          <p>Total PV today</p>
        </div>
        <div id="measurements-right">
          <Tag color="#db4196" id="tag">3</Tag>
          <p>Citizen owned PV</p>
        </div>
      </React.Fragment>
    );
  }
}

export default ClimateObjective
