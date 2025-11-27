import { display, getMeta } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    display(`读取到页面分类：${getMeta('adflux-page-category')}`);

    const node = document.createElement('iframe');
    node.src = 'https://adflux/tracker.html';
    node.style.width = '600px';
    node.style.height = '200px';
    node.style.border = 'none';
    document.body.append(node);
});
