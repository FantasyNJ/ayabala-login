import React from 'react';
import TransitionGroup from 'react-addons-transition-group';


class Body extends React.Component{
    render(){
        return (
            <div>
                <h1><a href="/">ayabala</a></h1>
                <TransitionGroup component="div">
                    {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
                </TransitionGroup>
            </div>
        )
    }
}

export default Body;