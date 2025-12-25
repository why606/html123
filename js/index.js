// 轮播图逻辑
let bannerIndex = 0;
const bannerList = document.querySelector('.banner-list');
const bannerDots = document.querySelectorAll('.banner-dots span');

// 自动切换
const bannerTimer = setInterval(() => {
    bannerIndex = (bannerIndex + 1) % 3;
    updateBanner();
}, 3000);

// 手动切换
bannerDots.forEach((dot, index) => {
    dot.onclick = () => {
        clearInterval(bannerTimer);
        bannerIndex = index;
        updateBanner();
    };
});

// 更新轮播图
function updateBanner() {
    bannerList.style.transform = `translateX(-${bannerIndex * 33.33}%)`;
    // 更新圆点
    bannerDots.forEach((dot, index) => {
        if (index === bannerIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 加入购物车
document.addEventListener('DOMContentLoaded', () => {
    const addCartBtns = document.querySelectorAll('.add-cart');
    addCartBtns.forEach(btn => {
        btn.onclick = function() {
            const parent = this.closest('.scenic-item');
            const name = parent.querySelector('h3').innerText;
            const price = parseFloat(parent.querySelector('.price').innerText.replace('¥', ''));
            addToCart(name, price, 1);
        };
    });
});