// Toast提示函数（美化版）
function showToast(text) {
    const toast = document.getElementById('toast');
    toast.innerText = text;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2000);
}

// 手机号验证函数
function checkPhone(phone) {
    return /^1[3-9]\d{9}$/.test(phone);
}

// 购物车操作公共函数
// 获取购物车
function getCart() {
    const cart = localStorage.getItem('cartList');
    return cart ? JSON.parse(cart) : [];
}

// 保存购物车
function setCart(cart) {
    localStorage.setItem('cartList', JSON.stringify(cart));
}

// 加入购物车
function addToCart(name, price, num = 1) {
    const cart = getCart();
    // 检查是否已存在
    const index = cart.findIndex(item => item.name === name);
    if (index > -1) {
        cart[index].num += num;
    } else {
        cart.push({ name, price, num });
    }
    setCart(cart);
    showToast('商品已加入购物车');
}

// 搜索功能（所有页面通用）
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    if (searchBtn && searchInput) {
        searchBtn.onclick = () => {
            const keyword = searchInput.value.trim();
            if (!keyword) {
                showToast('请输入搜索关键词');
                return;
            }
            // 跳转到分类页并携带搜索关键词
            location.href = `旅游分类.html?keyword=${encodeURIComponent(keyword)}`;
        };
        // 回车搜索
        searchInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        };
    }
});