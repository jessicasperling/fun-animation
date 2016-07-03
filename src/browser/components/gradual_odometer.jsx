import React, {PropTypes} from 'react';

export default class GradualOdometer extends React.Component{
    static get propTypes(){
        return{
            number : PropTypes.number.isRequired,
            speed: function(props, propName, componentName){
                const thisProp = props[propName];
                if(thisProp && (!(Number.isInteger(thisProp)) || thisProp > 50 || thisProp < 0)){
                    return new Error(
                        'Invalid prop `' + propName + '` supplied to' +
                        ' `' + componentName + '`. Must be a number between 0-50'
                    );
                }
            }
        };
    }

    static get defaultProps(){
        return {
            speed: 50
        };
    }

    constructor(props){
        super(props);
        this.state = {
            number : 0,
            currentAnimation: undefined
        }
    }

    componentWillReceiveProps(nextProps){
        this.getNextNumber(nextProps.number);
    }

    getNextNumber(number){
        if(this.state.currentAnimation){
            clearInterval(this.state.currentAnimation);
        }
        this.setState({
            currentAnimation: this.animateNumber(number)
        });
    }

    animateNumber(number){
        let next = number;
        let old = this.state.number;
        let staticInterval = this.getInterval(next, old);

        return setInterval(function(){
            const curr = this.state.number;
            if(next > curr){
               this.setNextNumber(staticInterval + curr);
            }else if (next < this.state.number){
                this.setNextNumber(curr - staticInterval);
            }else{
                clearInterval(this.state.currentAnimation);
                this.setState({
                    currentAnimation: undefined
                })
            }

        }.bind(this),this.getSpeed(next, old));
    }

    getSpeed(before, after){
        const getPureRate = 1/Math.abs(before-after);
        return Math.max(getPureRate, 20);
    }

    getInterval(before, after){
        return Math.ceil(Math.abs(before-after)/50);
    }

    setNextNumber(newNum){
        this.setState({
            number : newNum
        });
    }

    render() {
        return (
            <div className="odometer">
                <p className="label">{"Gradual "}</p>
                <span>{this.state.number}</span>
            </div>
        );
    }
}

