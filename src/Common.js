import React from 'react';

const Common = (Wrap) =>{
    return class WrapperComponent extends React.Component{
        constructor(){
            super()
        }
        didMount(){
            setTimeout(() => {
                this.setState({
                    wrapStyle: {
                        display: 'block',
                    }
                })
            },600)
            setTimeout(() => {
                this.setState({
                    wrapStyle: {
                        opacity: 1,
                        display: 'block',
                        transform: 'translateY(0)'
                    }
                })
            },700)
        }
        willLeave(){
            this.setState({
                wrapStyle: {
                    opacity: 0,
                    display: 'block',
                    transform: 'translateY(5px)'
                }
            })
        }
        componentDidMount() {
            this.didMount.call(this.refs.wrapComponent)
        }
        componentWillLeave (callback) {
            this.willLeave.call(this.refs.wrapComponent)
            setTimeout(callback,500)
        }
        render(){
            return(
                <Wrap ref="wrapComponent" {...this.props}/>
            )
        }
    }
}

export default Common;
