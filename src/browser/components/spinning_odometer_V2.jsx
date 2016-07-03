import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//window.requestAnimationFrame doesn't seem to effect the performance since we're dom manipulating?

export default class SpinningOdometerV2 extends React.Component {
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

    renderNumberPlaces(number){
        let numStr = number.toString();
        let strArr = numStr.split("");
        let jsx = strArr.map((letter, idx) => {
            const spacing = (idx/2).toString()+"em";
               return <p
                style= {{left: spacing}}
                key={letter + idx}
                className="number">
                {letter}
                </p>
            });
        return jsx;
    }

    render() {
        return (
            <div className="odometer">
                <p className="label">{"Spinning"}</p>
                <div className="cover">
                <ReactCSSTransitionGroup transitionName="spin" transitionEnterTimeout={100} transitionLeaveTimeout={100}>
                    {this.renderNumberPlaces(this.state.number)}
                </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
}

