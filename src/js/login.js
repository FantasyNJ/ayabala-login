//切换模块
$(function(){

    if(window.location.hash === ''){
        window.location.hash = 'login';
    }
    hashTransform();

    $(window).on('hashchange', hashTransform);
    //hash值改变函数
    function hashTransform(){
        var hash = window.location.hash.replace('#', '');
        if(hash === 'login'){
            $('.login-wrap').css('display', 'block');
            $('.register-wrap').css('display', 'none');
        }else if(hash === 'register'){
            $('.register-wrap').css('display', 'block');
            $('.login-wrap').css('display', 'none');
        }
        $('.hint').each(function(index, item){
            $(item).text('');
        })
        $('input').each(function(index, item){
            $(item).val('');
        })
    }
})
//登录模块
$(function(){
    var form = $('.login');
    var prompt = $('.login .prompt');
    var usernameTips = $('.login .username-tips');
    var passwordTips = $('.login .password-tips');
    var username = $('.login input[name="username"]');
    var password = $('.login input[name="password"]');
    var submit = $('.login input[type="submit"]');


    form.on('submit',function(){
        var u = username.val().trim();
        var p = password.val().trim();
        $.ajax({
            type: 'POST',
            url: '/api/user/login',
            data: {
                username: u,
                password: p,
            },
            dataType: 'json',
            success: function(result){
                prompt.text( result.message );
                if (result.code) {
                    prompt.css('color', 'red');
                } else {
                    prompt.css('color', 'green');
                    localStorage.setItem('username', u);
                    window.location.href = '/';
                }
            }
        });
        return false;
    })
})
//注册模块
$(function(){
    var form = $('.register');
    var prompt = $('.register .prompt');
    var usernameTips = $('.register .username-tips');
    var passwordTips = $('.register .password-tips');
    var repasswordTips = $('.register .repassword-tips');
    var username = $('.register input[name="username"]');
    var password = $('.register input[name="password"]');
    var repassword = $('.register input[name="repassword"]');
    var submit = $('.register input[type="submit"]');

    username.blur(function(){
        var value = this.value.trim();
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
    })

    password.blur(function(){
        var value = this.value.trim();
        if(value.length < 6 || value.length > 16){
            passwordTips.text('密码长度必须在6-16个字符之间');
            passwordTips.css('color', 'red');
        }else{
            passwordTips.text('');
        }
    })

    repassword.blur(function(){
        var value = this.value.trim();
        if(value !== $(password).val().trim()){
            repasswordTips.text('密码不一致');
            repasswordTips.css('color', 'red');
        }else{
            repasswordTips.text('');
        }
    })

    form.on('submit',function(){
        var u = username.val().trim();
        var p = password.val().trim();
        var r = repassword.val().trim();
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
        return false;
    })
})