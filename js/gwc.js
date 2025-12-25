// 渲染购物车
function renderCart() {
    const cartList = document.querySelector('.cart-list');
    const emptyCart = document.querySelector('.empty-cart');
    const totalEl = document.getElementById('total');
    const cart = getCart();

    // 显示/隐藏空购物车
    if (cart.length === 0) {
        cartList.style.display = 'none';
        emptyCart.style.display = 'block';
        totalEl.innerText = '0';
        return;
    } else {
        cartList.style.display = 'flex';
        emptyCart.style.display = 'none';
    }

    // 渲染购物车列表
    cartList.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p class="price">单价：¥${item.price}</p>
            </div>
            <div class="item-opt">
                <div class="num-opt">
                    <button class="minus" data-index="${index}">-</button>
                    <span>${item.num}</span>
                    <button class="plus" data-index="${index}">+</button>
                </div>
                <button class="del-btn" data-index="${index}">删除</button>
            </div>
        </div>
    `).join('');

    // 计算总价
    const total = cart.reduce((sum, item) => sum + (item.price * item.num), 0);
    totalEl.innerText = total;

    // 绑定数量调整事件
    bindCartEvents();
}

// 绑定购物车事件
function bindCartEvents() {
    // 减数量
    document.querySelectorAll('.minus').forEach(btn => {
        btn.onclick = function() {
            const index = parseInt(this.dataset.index);
            const cart = getCart();
            if (cart[index].num > 1) {
                cart[index].num--;
            } else {
                cart.splice(index, 1);
            }
            setCart(cart);
            renderCart();
        };
    });

    // 加数量
    document.querySelectorAll('.plus').forEach(btn => {
        btn.onclick = function() {
            const index = parseInt(this.dataset.index);
            const cart = getCart();
            cart[index].num++;
            setCart(cart);
            renderCart();
        };
    });

    // 删除商品
    document.querySelectorAll('.del-btn').forEach(btn => {
        btn.onclick = function() {
            const index = parseInt(this.dataset.index);
            const cart = getCart();
            cart.splice(index, 1);
            setCart(cart);
            renderCart();
            showToast('商品已删除');
        };
    });
}

// 清空购物车
document.querySelector('.clear-cart').onclick = () => {
    if (confirm('确定清空购物车吗？')) {
        localStorage.removeItem('cartList');
        renderCart();
        showToast('购物车已清空');
    }
};

// 结算弹窗
const settleModal = document.getElementById('settleModal');
const settleBtn = document.querySelector('.settle-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const confirmBtn = document.querySelector('.confirm-btn');

// 打开弹窗
settleBtn.onclick = () => {
    const cart = getCart();
    if (cart.length === 0) {
        showToast('购物车为空，无法结算');
        return;
    }
    settleModal.style.display = 'flex';
};

// 取消结算
cancelBtn.onclick = () => {
    settleModal.style.display = 'none';
};

// 确认结算
confirmBtn.onclick = () => {
    settleModal.style.display = 'none';
    location.href = 'js.html';
};

// 页面加载时渲染购物车
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});