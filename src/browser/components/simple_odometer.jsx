import React, {PropTypes} from 'react';

export default class SimpleOdometer extends React.Component{
    static get propTypes(){
        return{
            number : PropTypes.number.isRequired
        }
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
        let newNum = number;
        let oldNum = this.state.number;
        return setInterval(function(){
            if(newNum > oldNum){
               this.setNextNumber(++oldNum);
            }else if (newNum < this.state.number){
                this.setNextNumber(--oldNum);
            }else{
                clearInterval(this.state.currentAnimation);
                this.setState({
                    currentAnimation: undefined
                })
            }

        }.bind(this),100);
    }

    setNextNumber(newNum){
        this.setState({
            number : newNum
        });
    }

    render() {
        return (
            <div className="odometer">
                <span>{this.state.number}</span>
            </div>
        );
    }
}

