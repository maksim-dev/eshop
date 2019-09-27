'use strict';

import data from './data.js';

function crEl(elem) {
	return document.createElement(elem);
}

const store = document.querySelector('#store');
const cart = document.querySelector('.cart-list');
const cartItem = cart.querySelector('.product-widget');
const cartItemQty = document.querySelector('.dropdown').querySelector('.qty');
const item = document.querySelector('.product').parentNode;
const cloneItem = item.cloneNode(true);
const toRow = store.querySelector('.pseudoSection');
const itemMask = 'prct_';
const perPage = 15;
const pageBtns = document.querySelector('.store-pagination');
let completeItems = document.querySelectorAll('.product');

let products = [];

if (products.length > 0) {
	localStorage.setItem('products', JSON.stringify(products));
}

if (products.length === 0 && localStorage.length === 0) {
	localStorage.setItem('products', JSON.stringify(products));
}

let page = 1;

let itemsToRender = data.slice((page - 1) * perPage, (page - 1) * perPage + perPage);

while (cart.firstChild) {
	cart.removeChild(cart.firstChild);
}

function showItem() {
	while (toRow.firstChild) {
		toRow.removeChild(toRow.firstChild);
	}
	for (let i = 0; i < perPage; i++) {

		let currentItemClone = cloneItem.cloneNode(true);

		currentItemClone.querySelector('.product-category').textContent = itemsToRender[i].descr;
		currentItemClone.querySelector('.product').setAttribute('id', itemMask + itemsToRender[i].id);
		currentItemClone.querySelector('.product-name').textContent = itemsToRender[i].title;
		currentItemClone.querySelector('.product-price').textContent = itemsToRender[i].price + '\u20BD';
		currentItemClone.querySelector('img').setAttribute('src', itemsToRender[i].image);
		currentItemClone.querySelector('img').setAttribute('alt', itemsToRender[i].title);
		currentItemClone.querySelector('.add-to-cart-btn').setAttribute('data-item-id', itemsToRender[i].id);

		toRow.appendChild(currentItemClone);
	}
	completeItems = document.querySelectorAll('.product');

	completeItems.forEach(function (item) {

		let toCart = item.querySelector('.add-to-cart-btn');
		
		toCart.addEventListener('click', function () {

			if (localStorage.getItem('products')) {
				products = JSON.parse(localStorage.getItem('products'));
			}
			products.push(data[this.getAttribute('data-item-id') - 1]);
			localStorage.setItem('products', JSON.stringify(products));
			addToCart();
		});
	});
}

showItem();

function pagination() {
	let pageQty = Math.ceil(data.length / perPage);

	for (let i = 0; i < pageQty; i++) {
		let paginationButton = crEl('li');
		if (i === 0) {
			paginationButton.classList.add('active');
		}
		paginationButton.textContent = i + 1;
		pageBtns.appendChild(paginationButton);
	}
}

pagination();

function addToCart() {

	while (cart.firstChild) {
		cart.removeChild(cart.firstChild);
	}

	let itemToCart = JSON.parse(localStorage.getItem('products'));

	let cartItemMask = itemMask + 'wid_';

	for (let i = 0; i < itemToCart.length; i++) {
		let currentCloneCartItem = cartItem.cloneNode(true);

		currentCloneCartItem.setAttribute('id', cartItemMask + itemToCart[i].id);
		currentCloneCartItem.querySelector('.product-img').querySelector('img').setAttribute('src', itemToCart[i].image);
		currentCloneCartItem.querySelector('.product-name').textContent = itemToCart[i].title;
		currentCloneCartItem.querySelector('.product-total-price').textContent = itemToCart[i].price;
		currentCloneCartItem.querySelector('.product-name').textContent = itemToCart[i].title;

		cart.appendChild(currentCloneCartItem);
	}

	cartItemQty.textContent = itemToCart.length;

	let totalPrice = 0;

	itemToCart.forEach(function(e) {
		totalPrice += +e.price;
	});

	document.querySelector('.cart-summary').querySelector('small').textContent = itemToCart.length + ' Item(s) selected';
	document.querySelector('.cart-summary').querySelector('h5').textContent = 'Subtotal: ' + totalPrice + '\u20BD';
}

const paginationButtons = document.querySelector('.store-pagination').querySelectorAll('li');

paginationButtons.forEach(function (i) {
	i.addEventListener('click', function (e) {
		e.preventDefault();
		let currentActivePage = i.parentNode.querySelector('.active');
		currentActivePage.classList.remove('active');
		i.classList.add('active');
		page = +this.textContent;
		itemsToRender = data.slice((page - 1) * perPage, (page - 1) * perPage + perPage);
		store.scrollIntoView({
			block: 'start',
			behavior: 'smooth'
		})
		showItem();
	});
});

addToCart();