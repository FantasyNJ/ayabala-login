import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Common from './Common';


class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            prompt: '',
            wrapStyle: {},
        }
    }
    usernameChange(e){
        this.setState({
            username: e.target.value
        })
        console.log(this.state.username)
    }
    passwordChange(e){
        this.setState({
            password: e.target.value
        })
    }
    submitHandler(e){
        const u = this.state.username.trim();
        const p = this.state.password.trim();
        $.ajax({
            type: 'POST',
            url: '/api/user/login',
            data: {
                username: u,
                password: p,
            },
            dataType: 'json',
            success: function(result){
                this.setState({
                    prompt: result.message
                })
                if (result.code) {
                    this.setState({
                        promptStyle: {color: 'red'}
                    })
                } else {
                    this.setState({
                        promptStyle: {color: 'green'}
                    })
                    localStorage.setItem('username', u);
                    //window.location.href = '/';
                }
            }
        });
        e.preventDefault();
    }
    render(){
        return (
        <section className="login-wrap" style={this.state.wrapStyle}>
            <form action="/api/login" method="post" className="login" onSubmit={this.submitHandler.bind(this)}>
                <p className="prompt" style={this.state.promptStyle}>{this.state.prompt}</p>
                <input type="text" placeholder="用户名" name="username" autoComplete="off" defaultValue={this.state.username} onChange={this.usernameChange.bind(this)}/>
                <p></p>
                <input type="password" placeholder="密码" name="password" defaultValue={this.state.password} onChange={this.passwordChange.bind(this)}/>
                <p></p>
                <button type="submit">登录</button>
            </form>
            <p className="to-register to-a"><Link to="/register">没有账户？立即注册</Link></p>
        </section>
        )
    }

    //componentDidMount() {
    //    setTimeout(() => {
    //        this.setState({
    //            wrapStyle: {
    //                display: 'block',
    //            }
    //        })
    //    },600)
    //    setTimeout(() => {
    //        this.setState({
    //            wrapStyle: {
    //                opacity: 1,
    //                display: 'block',
    //                transform: 'translateY(0)'
    //            }
    //        })
    //    },700)
    //}
    //
    //componentWillLeave (callback) {
    //    this.setState({
    //        wrapStyle: {
    //            opacity: 0,
    //            display: 'block',
    //            transform: 'translateY(5px)'
    //        }
    //    })
    //    setTimeout(callback,500)
    //}
}

export default Common(Login);