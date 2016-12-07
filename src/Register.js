import React from 'react';
import { Link } from 'react-router';
import Common from './Common';

class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            repassword: '',
            wrapStyle: {},
        }
    }
    usernameChange(e){
        this.setState({
            username: e.target.value
        })
    }
    passwordChange(e){
        this.setState({
            password: e.target.value
        })
    }
    repasswordChange(e){
        this.setState({
            repassword: e.target.value
        })
    }
    usernameBlur(){
        const value = this.state.username.trim();
        const usernameTips = $(this.refs.usernameTips);

        if(value.length < 3 || value.length > 16){
            usernameTips.text('用户名长度必须在3-16个字符之间');
            usernameTips.css('color', 'red');
        }else{
            $.get('/api/user/checkusername', {username: value}, function(result){
                console.log(result);
                if (result.code) {
                    usernameTips.text('用户名已被注册');
                    usernameTips.css('color', 'red');
                } else {
                    usernameTips.text('用户名可以使用');
                    usernameTips.css('color', 'green');
                }
            })
        }
    }
    passwordBlur(){
        const value = this.state.password.trim();
        const passwordTips = $(this.refs.passwordTips);
        if(value.length < 6 || value.length > 16){
            passwordTips.text('密码长度必须在6-16个字符之间');
            passwordTips.css('color', 'red');
        }else{
            passwordTips.text('');
        }
    }
    repasswordBlur(){
        const value = this.state.repassword.trim();
        const repasswordTips = $(this.refs.repasswordTips);
        const passwordTips = $(this.refs.passwordTips);
        if(value !== passwordTips.val().trim()){
            repasswordTips.text('密码不一致');
            repasswordTips.css('color', 'red');
        }else{
            repasswordTips.text('');
        }
    }
    submitHandler(e){
        const u = this.state.username.trim();
        const p = this.state.password.trim();
        const r = this.state.repassword.trim();
        const prompt = $(this.refs.prompt)
        $.ajax({
            type: 'POST',
            url: '/api/user/register',
            data: {
                username: u,
                password: p,
                repassword: r,
            },
            dataType: 'json',
            success: function(result){
                prompt.text( result.message );
                if (result.code) {
                    prompt.css('color', 'red');
                } else {
                    prompt.css('color', 'green');
                }
            }
        });
        e.preventDefault();
    }
    render(){
        return (
        <section className="register-wrap" style={this.state.wrapStyle}>
            <form action="/api/register" method="post" className="register" onSubmit={this.submitHandler.bind(this)}>
                <p ref="prompt" className="prompt"></p>
                <input type="text" placeholder="用户名长度3-16个字符" name="username" autoComplete="off" defaultValue={this.state.username} onChange={this.usernameChange.bind(this)} onBlur={this.usernameBlur.bind(this)}/>
                <p ref="usernameTips" className="username-tips"></p>
                <input type="password" placeholder="密码6-16个字符" name="password" defaultValue={this.state.password} onChange={this.passwordChange.bind(this)} onBlur={this.passwordBlur.bind(this)}/>
                <p ref="passwordTips" className="password-tips"></p>
                <input type="password" placeholder="重复密码" name="repassword" defaultValue={this.state.repassword} onChange={this.repasswordChange.bind(this)} onBlur={this.repasswordBlur.bind(this)}/>
                <p ref="repasswordTips" className="repassword-tips"></p>
                <button type="submit">注册</button>
            </form>
            <p className="to-login to-a"><Link to="/login">已有账户，立即登录</Link></p>
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

export default Common(Register);