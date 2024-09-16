"use strict";
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartDropdown = document.getElementById('cart-dropdown');
let cart = [];
let totalPrice = 0;
const products = [
    { name: 'สินค้าชิ้นที่ 1', price: 100, image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Product_sample_icon_picture.png' },
    { name: 'สินค้าชิ้นที่ 2', price: 200, image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Product_sample_icon_picture.png' },
    { name: 'สินค้าชิ้นที่ 3', price: 150, image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Product_sample_icon_picture.png' },
    { name: 'สินค้าชิ้นที่ 4', price: 120, image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Product_sample_icon_picture.png' },
];
// แสดงรายการสินค้าแบบ Card พร้อมรูปภาพ
function displayProducts() {
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p>ราคา: ${product.price} บาท</p>
      <button onclick="addToCart(${index}, this)">เพิ่มลงตะกร้า</button>
    `;
        productList.appendChild(productCard);
    });
}
// เพิ่มสินค้าไปยังตะกร้า พร้อม Animation
function addToCart(index, button) {
    const product = products[index];
    cart.push(product);
    updateCart();
    // คัดลอกภาพสินค้าที่คลิก เพื่อสร้าง animation
    const productImage = button.parentElement?.querySelector('.product-image');
    const flyingImage = productImage.cloneNode(true);
    flyingImage.classList.add('flying-image');
    document.body.appendChild(flyingImage);
    // หาตำแหน่งภาพต้นทางและปลายทาง (ตะกร้า)
    const startRect = productImage.getBoundingClientRect();
    const endRect = cartIcon.getBoundingClientRect();
    flyingImage.style.left = `${startRect.left}px`;
    flyingImage.style.top = `${startRect.top}px`;
    // เริ่ม animation
    setTimeout(() => {
        flyingImage.style.left = `${endRect.left}px`;
        flyingImage.style.top = `${endRect.top}px`;
        flyingImage.style.transform = 'scale(0)';
        // ลบภาพหลังจาก animation เสร็จสิ้น
        setTimeout(() => {
            flyingImage.remove();
        }, 1000);
    }, 100);
}
function updateCart() {
    cartItems.innerHTML = '';
    totalPrice = 0;
    cart.forEach((product) => {
        const li = document.createElement('li');
        li.textContent = `${product.name} ราคา ${product.price} บาท`;
        cartItems.appendChild(li);
        totalPrice += product.price;
    });
    totalPriceElement.textContent = `ราคารวม: ${totalPrice} บาท`;
    // อัปเดตจำนวนสินค้าในตะกร้า
    cartCount.textContent = `${cart.length}`;
}
// แสดงหรือซ่อน Dropdown
cartIcon.addEventListener('click', () => {
    cartDropdown.classList.toggle('active');
});
// เรียกใช้งานฟังก์ชันแสดงสินค้า
displayProducts();
