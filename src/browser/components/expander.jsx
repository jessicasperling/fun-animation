import React, {PropTypes} from 'react';
import classNames from 'classnames';

export default class Expander extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isOpen : false
        };

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(){
        this.setState( {
            isOpen : !this.state.isOpen
        });
    }

    render(){
        const contentClass = classNames('content', {'expanded' : this.state.isOpen});
        const drawerContentClass = classNames('drawer-content', {'expanded' : this.state.isOpen});
        const btnClass = classNames('handle', {'expanded' : this.state.isOpen});

        return (
            <div className="expander-container">
                <div className="drawer">
                    <div className={drawerContentClass}>
                        <div className="circle"></div>
                        <div className="content-container">
                            <div className="rectangle"></div>
                            <div className="rectangle"></div>
                        </div>
                    </div>
                    <div className={contentClass}>
                        <div className="inner-content"></div>
                        <div className="inner-content"></div>
                        <div className="inner-content"></div>
                        <div className="inner-content"></div>
                    </div>
                    <button type="button" className={btnClass} onClick={this.toggleDrawer}><span> v </span></button>
                </div>
            </div>
        );
    }

}
