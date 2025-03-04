// 修改默认猫咪图片数组为您的文件名
const defaultCats = [
    'images/cats/cat1.jpg',
    'images/cats/cat2.jpg',
    'images/cats/cat3.jpg',
    'images/cats/cat4.jpg'
];

// 页面加载时展示默认图片
window.addEventListener('load', function() {
    // 展示默认图片
    defaultCats.forEach(catImg => {
        addPhotoToGallery(catImg);
    });
});

// 处理照片上传
document.getElementById('uploadPhoto').addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            // 这里可以添加将图片上传到服务器的代码
            // 示例中仅展示本地预览
            const reader = new FileReader();
            reader.onload = function(event) {
                addPhotoToGallery(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
});

function addPhotoToGallery(imageUrl) {
    const gallery = document.getElementById('catPhotos');
    const imgContainer = document.createElement('div');
    imgContainer.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = '猫咪照片';
    
    // 添加点击预览功能
    img.addEventListener('click', function() {
        showImagePreview(imageUrl);
    });
    
    imgContainer.appendChild(img);
    gallery.appendChild(imgContainer);
}

// 图片预览功能
function showImagePreview(imageUrl) {
    const preview = document.createElement('div');
    preview.className = 'image-preview';
    preview.innerHTML = `
        <div class="preview-content">
            <img src="${imageUrl}" alt="预览图片">
            <button class="close-preview">×</button>
        </div>
    `;
    
    document.body.appendChild(preview);
    
    // 点击关闭预览
    preview.addEventListener('click', function(e) {
        if (e.target.classList.contains('image-preview') || 
            e.target.classList.contains('close-preview')) {
            document.body.removeChild(preview);
        }
    });
}

// 添加编辑功能
document.getElementById('aboutContent').addEventListener('click', function() {
    const content = prompt('请输入您的个人介绍：');
    if (content) {
        this.innerHTML = `<p class="about-text">${content}</p>`;
        // 这里可以添加保存到服务器的代码
    }
});

// 作品集图片加载
function loadPortfolioImages() {
    const portfolioGrid = document.getElementById('portfolio');
    if (!portfolioGrid) return;

    // 示例作品数据
    const works = [
        { src: 'images/works/work1.jpg', title: '作品1' },
        { src: 'images/works/work2.jpg', title: '作品2' },
        { src: 'images/works/work3.jpg', title: '作品3' },
        { src: 'images/works/work4.jpg', title: '作品4' }
    ];

    works.forEach(work => {
        const workItem = document.createElement('div');
        workItem.className = 'portfolio-item';
        workItem.innerHTML = `
            <img src="${work.src}" alt="${work.title}">
            <div class="portfolio-hover">
                <h3>${work.title}</h3>
            </div>
        `;
        portfolioGrid.appendChild(workItem);
    });
}

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-bar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioImages();
});

// 照片轮播
const images = document.querySelectorAll('.hero-image');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    images[index].classList.add('active');
    dots[index].classList.add('active');
}

// 自动轮播
setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}, 5000);

// 点击切换
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        showImage(currentIndex);
    });
});

/* ... 这里是完整的JS代码，太长了就不全部展示了 ... */ 