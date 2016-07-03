import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//window.requestAnimationFrame doesn't seem to effect the performance since we're dom manipulating?

export default class SpinningOdometer extends React.Component {
    static get propTypes(){
        return{
            number : PropTypes.number.isRequired,
            speed: function(props, propName, componentName){
                const thisProp = props[propName];
                if(thisProp && (!(Number.isInteger(thisProp)) || thisProp > 10 || thisProp < 0)){
                    return new Error(
                        'Invalid prop `' + propName + '` supplied to' +
                        ' `' + componentName + '`. Must be a number between 0-50'
                    );
                }
            }
        };
    }

    static get defaultProps() {
        return {
            speed: 10
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            number : 0,
            currentAnimation: undefined
        }
    }

    componentWillReceiveProps(nextProps) {
        this.getNextNumber(nextProps.number);
    }

    getNextNumber(number) {
        if(this.state.currentAnimation){
            clearInterval(this.state.currentAnimation);
        }
        this.setState({
            currentAnimation: this.animateNumber(number)
        });
    }

    animateNumber(number) {
        let next = number;
        let old = this.state.number;

        return setInterval(function(){
            const curr = this.state.number;
            const staticInterval = this.getInterval(next, curr);


            if(next > curr){

                this.setNextNumber(staticInterval + curr);

            }else if (next < curr){
                this.setNextNumber(curr - staticInterval);
            }else{
                clearInterval(this.state.currentAnimation);
                this.setState({
                    currentAnimation: undefined
                })
            }

        }.bind(this),this.getSpeed(next, old));
    }

    getSpeed(before, after) {
        const getPureSpeed = 1 / Math.abs(before - after);
        // return Math.max(getPureSpeed, 20);
        return 100
    }

    getInterval(before, after) {
        return Math.ceil(Math.abs(before-after)*2/(this.props.speed));
    }

    setNextNumber(newNum) {
        this.setState({
            number : newNum
        });
    }

    render() {
        return (
            <div className="odometer">
                <p className="label">{"Spinning"}</p>
                <div className="cover">
                <ReactCSSTransitionGroup transitionName="spin" transitionEnterTimeout={100} transitionLeaveTimeout={100}>
                    <p key={this.state.number} className="number">{this.state.number}</p>
                </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
}

