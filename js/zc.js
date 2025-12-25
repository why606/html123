// 注册表单验证
document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const repasswordInput = document.getElementById('repassword');
    const phoneInput = document.getElementById('phone');
    const protocolInput = document.getElementById('protocol');
    const submitBtn = document.querySelector('.submit-btn');

    // 用户名验证
    usernameInput.onblur = function() {
        const val = this.value.trim();
        const tip = document.getElementById('usernameTip');
        if (val.length < 2 || val.length > 10) {
            tip.innerText = '用户名需2-10个字符';
        } else {
            tip.innerText = '';
        }
    };

    // 密码验证
    passwordInput.onblur = function() {
        const val = this.value;
        const tip = document.getElementById('passwordTip');
        if (val.length < 6 || val.length > 16) {
            tip.innerText = '密码需6-16个字符';
        } else {
            tip.innerText = '';
        }
    };

    // 确认密码验证
    repasswordInput.onblur = function() {
        const val = this.value;
        const tip = document.getElementById('repasswordTip');
        if (val !== passwordInput.value) {
            tip.innerText = '两次密码不一致';
        } else {
            tip.innerText = '';
        }
    };

    // 手机号验证
    phoneInput.onblur = function() {
        const val = this.value.trim();
        const tip = document.getElementById('phoneTip');
        if (!checkPhone(val)) {
            tip.innerText = '请输入有效手机号';
        } else {
            tip.innerText = '';
        }
    };

    // 提交注册
    submitBtn.onclick = function() {
        let isOk = true;
        // 清空所有提示
        document.querySelectorAll('.error-tip').forEach(tip => tip.innerText = '');

        // 验证用户名
        const username = usernameInput.value.trim();
        if (username.length < 2 || username.length > 10) {
            document.getElementById('usernameTip').innerText = '用户名需2-10个字符';
            isOk = false;
        }

        // 验证密码
        const password = passwordInput.value;
        if (password.length < 6 || password.length > 16) {
            document.getElementById('passwordTip').innerText = '密码需6-16个字符';
            isOk = false;
        }

        // 验证确认密码
        if (repasswordInput.value !== password) {
            document.getElementById('repasswordTip').innerText = '两次密码不一致';
            isOk = false;
        }

        // 验证手机号
        const phone = phoneInput.value.trim();
        if (!checkPhone(phone)) {
            document.getElementById('phoneTip').innerText = '请输入有效手机号';
            isOk = false;
        }

        // 验证协议勾选
        if (!protocolInput.checked) {
            showToast('请阅读并同意用户协议和隐私政策');
            isOk = false;
        }

        // 所有验证通过
        if (isOk) {
            // 存储用户信息（简单模拟，实际项目需后端处理）
            const userInfo = {
                username: username,
                phone: phone,
                registerTime: new Date().getTime()
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            localStorage.setItem('loginStatus', 'true'); // 模拟登录状态

            // 提示并跳转
            showToast('注册成功！即将跳转到首页');
            setTimeout(() => {
                location.href = 'index.html';
            }, 2000);
        }
    };
});