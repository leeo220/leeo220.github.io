// 存储文档的数组
let documents = JSON.parse(localStorage.getItem('documents')) || [];

// DOM 元素
const createBtn = document.getElementById('createDoc');
const modal = document.getElementById('createModal');
const cancelBtn = document.getElementById('cancelCreate');
const confirmBtn = document.getElementById('confirmCreate');
const docsContainer = document.getElementById('docsContainer');

// 显示创建文档弹窗
createBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.getElementById('docTitle').value = '';
    document.getElementById('docContent').value = '';
});

// 关闭弹窗
cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// 创建新文档
confirmBtn.addEventListener('click', () => {
    const title = document.getElementById('docTitle').value;
    const content = document.getElementById('docContent').value;
    
    if (title && content) {
        const newDoc = {
            id: Date.now(),
            title,
            content,
            date: new Date().toLocaleDateString()
        };
        
        documents.push(newDoc);
        localStorage.setItem('documents', JSON.stringify(documents));
        renderDocuments();
        modal.style.display = 'none';
    }
});

// 删除文档
function deleteDocument(id) {
    if (confirm('确定要删除这个文档吗？')) {
        documents = documents.filter(doc => doc.id !== id);
        localStorage.setItem('documents', JSON.stringify(documents));
        renderDocuments();
    }
}

// 渲染文档列表
function renderDocuments() {
    docsContainer.innerHTML = documents.map(doc => `
        <div class="doc-card">
            <button class="delete-btn" onclick="deleteDocument(${doc.id})">×</button>
            <h3 class="doc-title">${doc.title}</h3>
            <p class="doc-preview">${doc.content}</p>
            <span class="doc-date">${doc.date}</span>
        </div>
    `).join('');
}

// 初始化渲染
renderDocuments(); 