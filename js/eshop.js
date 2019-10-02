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
const sortButton = document.querySelector('.sort-var').querySelectorAll('span');

let filteredData = data;
let completeItems = document.querySelectorAll('.product');

let products = [];

let pageQty = Math.ceil(filteredData.length / perPage);

if (products.length > 0) {
	localStorage.setItem('products', JSON.stringify(products));
}

if (products.length === 0 && localStorage.length === 0) {
	localStorage.setItem('products', JSON.stringify(products));
}

let page = 0;

let itemsToRender = filteredData.slice(page * perPage, page * perPage + perPage);

while (cart.firstChild) {
	cart.removeChild(cart.firstChild);
}

function showItem() {
	while (toRow.firstChild) {
		toRow.removeChild(toRow.firstChild);
	}

	let itemsToRender = filteredData.slice(page * perPage, page * perPage + perPage);

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
			products.push(filteredData[this.getAttribute('data-item-id') - 1]);
			localStorage.setItem('products', JSON.stringify(products));
			addToCart();
		});
	});
}

showItem();

function pagination() {

	for (let i = 1; i < 10; i++) {
		let paginationButton = crEl('li');

		paginationButton.textContent = i + 1;
		document.querySelector('#last-page').insertAdjacentElement('beforebegin', paginationButton);
		document.querySelector('#last-page').textContent = pageQty;
	}

	// if ()
}

pagination();

function nextPage() {
	if (page === pageQty - 1) return;

	page += 1;

	activePage('next');

	showItem();
}

document.querySelector('#next-page').addEventListener('click', nextPage);

function previousPage() {
	if (page === 0) return;

	page -= 1;

	activePage('previous');
	showItem();
}

function activePage(direction) {

	let currentActiveButton = pageBtns.querySelector('.active');

	if (direction == 'next' && direction != null) {
		let nextActiveButton = currentActiveButton.nextElementSibling;
		currentActiveButton.classList.remove('active');
		nextActiveButton.classList.add('active');
	} else {
		let nextActiveButton = currentActiveButton.previousElementSibling;
		currentActiveButton.classList.remove('active');
		nextActiveButton.classList.add('active');
	}
}

document.querySelector('#previous-page').addEventListener('click', previousPage);

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

	itemToCart.forEach(function (e) {
		totalPrice += +e.price;
	});

	document.querySelector('.cart-summary').querySelector('small').textContent = itemToCart.length + ' Item(s) selected';
	document.querySelector('.cart-summary').querySelector('h5').textContent = 'Subtotal: ' + totalPrice + '\u20BD';
}

const paginationButtons = document.querySelector('.store-pagination').querySelectorAll('li');

paginationButtons.forEach(function (i, n) {

	i.addEventListener('click', function () {
		let currentActivePage = this.parentNode.querySelector('.active');

		currentActivePage.classList.remove('active');
		this.classList.add('active');

		page = +this.textContent - 1;
		itemsToRender = filteredData.slice(page * perPage, page * perPage + perPage);

		store.scrollIntoView({
			block: 'start',
			behavior: 'smooth'
		});

		showItem();
	});
});

addToCart();

function compareNumbers(a, b) {
	return +a.price - +b.price;
}

sortButton.forEach(function (i) {
	i.addEventListener('click', function(e) {
		this.classList.toggle('active');
		
		if (this.getAttribute('data-sort') == 'toHigh') {
			this.previousElementSibling.classList.remove('active');
			filteredData = data.sort(function(a, b) {
				return +a.price - +b.price;
			});
			showItem();
		}

		if (this.getAttribute('data-sort') == 'toLow') {
			this.nextElementSibling.classList.remove('active');
			filteredData = data.sort(function(a, b) {
				return +b.price - +a.price;
			});
			showItem();
		}

		if (this.getAttribute('data-sort') == 'available') {
			let filteredDataAvailable = [];
			filteredData.forEach(function (item) {
				if (item.available) {
					filteredDataAvailable.push(item);
				}
			});
			filteredData = filteredDataAvailable;
			showItem();
			console.log(filteredData);
		}
	});
});