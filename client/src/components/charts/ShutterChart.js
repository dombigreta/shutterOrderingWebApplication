import React from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ShutterChart extends React.Component{

    state = {
        options: {}
    }

    componentDidMount(){

        let dataPoints = this.props.shutterData.map((shutter,index, arr) => ({label:shutter.name, y:shutter.orderCount}));
        let options = {
            animationEnabled: true,
			exportEnabled: true,
			theme: "light2",
            title:{ text: "Popularity of each shutter type"},
            data:[{
				type: "column",
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
				dataPoints: dataPoints
			}]
        }

        this.setState({options:options});
    }

    render(){
       
        
        return (<CanvasJSChart options={this.state.options}/>);
        }
        
    }


export default ShutterChart;