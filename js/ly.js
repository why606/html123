// 商品数据
const goodsList = [
    { name: '遵义会议会址门票', price: 30, type: '景点门票', img: 'image/zyhyyz.jpg' },
    { name: '赤水丹霞门票', price: 90, type: '景点门票', img: 'image/csdx.jpg' },
    { name: '娄山关门票', price: 40, type: '景点门票', img: 'image/lsg.jpg' },
    { name: '海龙屯土司遗址门票', price: 98, type: '景点门票', img: 'image/ht.jpg' },
    { name: '折叠登山杖', price: 59, type: '旅游装备', img: 'image/dsz.jpg' },
    { name: '便携雨衣', price: 19, type: '旅游装备', img: 'image/bxyy.jpg' },
    { name: '户外防晒帽', price: 29, type: '旅游装备', img: 'image/fss.jpg' },
    { name: '旅游双肩包', price: 89, type: '旅游装备', img: 'image/sjbb.jpg' }
];

// 渲染商品列表
function renderGoods(list) {
    const goodsContainer = document.querySelector('.goods-list');
    if (list.length === 0) {
        goodsContainer.innerHTML = '<div style="width:100%;text-align:center;margin:50px 0;">暂无相关商品</div>';
        return;
    }
    goodsContainer.innerHTML = list.map(good => `
        <div class="goods-item">
            <img src="${good.img}" alt="${good.name}">
            <h3>${good.name}</h3>
            <p class="price">¥${good.price}</p>
            <button class="add-cart">加入购物车</button>
        </div>
    `).join('');

    // 绑定加入购物车事件
    const addCartBtns = document.querySelectorAll('.add-cart');
    addCartBtns.forEach(btn => {
        btn.onclick = function() {
            const parent = this.closest('.goods-item');
            const name = parent.querySelector('h3').innerText;
            const price = parseFloat(parent.querySelector('.price').innerText.replace('¥', ''));
            addToCart(name, price, 1);
        };
    });
}

// 筛选函数
function filterGoods(type, keyword) {
    const filtered = goodsList.filter(good => {
        const typeMatch = type === 'all' || good.type === type;
        const keywordMatch = !keyword || good.name.includes(keyword);
        return typeMatch && keywordMatch;
    });
    renderGoods(filtered);
}

// 页面加载逻辑
document.addEventListener('DOMContentLoaded', () => {
    const typeButtons = document.querySelectorAll('.type-btn');
    let currentType = 'all';
    // 获取URL中的搜索关键词
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get('keyword') || '';

    // 分类筛选
    typeButtons.forEach(btn => {
        btn.onclick = function() {
            // 移除所有active
            typeButtons.forEach(b => b.classList.remove('active'));
            // 添加当前active
            this.classList.add('active');
            currentType = this.dataset.type;
            filterGoods(currentType, keyword);
        };
    });

    // 搜索框输入
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        // 填充URL中的关键词
        if (keyword) {
            searchInput.value = keyword;
        }
        searchInput.oninput = function() {
            filterGoods(currentType, this.value.trim());
        };
    }

    // 初始渲染
    filterGoods(currentType, keyword);
});