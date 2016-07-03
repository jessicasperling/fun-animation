import React from 'react';
import SimpleOdometer from './simple_odometer.jsx';
import GradualOdometer from './gradual_odometer.jsx';
import SpinningOdometer from './spinning_odometer.jsx';
import SpinningOdometerV2 from './spinning_odometer_V2.jsx';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: 0
        }
    }

    handleChange(evt){
        evt.stopPropagation();
        const value = evt.target.value || 0;
        this.setState({value: Number(value)});
    }

    render() {
        return (
            <div className="main">
                <input type="number" value={this.state.value} onChange={this.handleChange}/>
                {/*<SimpleOdometer number={this.state.value}/>
                <GradualOdometer number={this.state.value} speed={5}/>
                <SpinningOdometer number={this.state.value} speed={5}/>
                <SpinningOdometerV2 number={this.state.value} speed={5}/>*/}
            </div>
        );
    }
};

