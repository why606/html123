const loginForm = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');

// 实时验证：用户名
username.addEventListener('blur', () => {
    const tip = username.nextElementSibling;
    if (username.value.trim() === '') {
        tip.textContent = '请输入用户名';
        tip.style.display = 'block';
    } else {
        tip.style.display = 'none';
    }
});

// 实时验证：密码
password.addEventListener('blur', () => {
    const tip = password.nextElementSibling;
    if (password.value === '') {
        tip.textContent = '请输入密码';
        tip.style.display = 'block';
    } else {
        tip.style.display = 'none';
    }
});

// 表单提交事件（已删除记住密码逻辑）
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const uname = username.value.trim();
    const pwd = password.value;

    if (uname === '') {
        showToast('请输入用户名');
        return;
    }
    if (pwd === '') {
        showToast('请输入密码');
        return;
    }

    // 模拟登录（已删除记住密码相关逻辑）
    const user = JSON.parse(localStorage.getItem('rememberUser'));
    if (user && user.username === uname && user.password === pwd) {
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('currentUser', uname);
        showToast('登录成功！即将跳转到首页~');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        showToast('用户名或密码错误');
    }
});

// 导航栏当前页高亮
setNavActive('dl.html');

// 已删除“填充记住密码”逻辑