import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SimpleOdometer from './simple_odometer.jsx';
import GradualOdometer from './gradual_odometer.jsx';
import SpinningOdometer from './spinning_odometer.jsx';
import SpinningOdometerV2 from './spinning_odometer_V2.jsx';
import Expander from './expander.jsx';



export default class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            value: 0,
            currentView : "material_view"
        }

        this.handleChange = this.handleChange.bind(this);
        this.showSimpleOdo = this.setCurrentView.bind(this, "simple_odometer");
        this.showGradualOdo = this.setCurrentView.bind(this, "gradual_odometer");
        this.showMaterialView = this.setCurrentView.bind(this, "material_view");
    }

    handleChange(evt){
        evt.stopPropagation();
        const value = evt.target.value || 0;
        this.setState({value: Number(value)});
    }

    setCurrentView(type){
        this.setState({
            currentView : type
        });
    }

    showCurrentView(){
        switch(this.state.currentView){
            case "simple_odometer" :
                return  (
                    <div>
                        <input type="number" value={this.state.value} onChange={this.handleChange}/>
                        <SimpleOdometer number={this.state.value}/>
                    </div>
                );
            case "gradual_odometer" :
                return (
                    <div>
                        <input type="number" value={this.state.value} onChange={this.handleChange}/>
                        <GradualOdometer number={this.state.value} speed={5}/>;
                    </div>
                );
            case "material_view" :
            default :
                return (
                    <Expander/>
                );
        }
    }

    render() {
        return (
            <div className="main">
                <div className="nav-container">
                    <ReactCSSTransitionGroup transitionName="nav-load" transitionAppear={true} transitionAppearTimeout={225}>
                        <nav>
                            <ul>
                                <li className="nav-option"> <a href="#" onClick={this.showMaterialView} > Material Design Animations </a></li>
                                <li className="nav-option"> <a href="#" onClick={this.showSimpleOdo} > Simple Odometer </a></li>
                                <li className="nav-option"> <a href="#" onClick={this.showGradualOdo} > Gradual Odometer </a></li>
                            </ul>
                        </nav>
                    </ReactCSSTransitionGroup>
                </div>
                <div className="current-view">
                    {this.showCurrentView()}
                </div>
            </div>
        );
    }
};

