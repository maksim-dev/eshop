'use strict';

import data from './data.js';

function crEl(elem) {
	return document.createElement(elem);
}

const store = document.querySelector('#store');
const item = document.querySelector('.product').parentNode;
const cloneItem = item.cloneNode(true);
const toRow = store.querySelector('.pseudoSection');
const itemMask = 'prct_';
const perPage = 15;
const pageBtns = document.querySelector('.store-pagination');
let siteLocalStorage = {};
let completeItem = document.querySelectorAll('.product');

let page = 1;

let itemsToRender = data.slice((page - 1) * perPage, (page - 1) * perPage + perPage);

console.log(itemsToRender);


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
	completeItem = document.querySelectorAll('.product');

	// document.querySelector('.product').parentNode.remove();
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

const paginationButtons = document.querySelector('.store-pagination').querySelectorAll('li');

paginationButtons.forEach(function (i) {
	i.addEventListener('click', function (e) {
		e.preventDefault();
		let currentActivePage = i.parentNode.querySelector('.active');
		currentActivePage.classList.remove('active');
		i.classList.add('active');
		page = +this.textContent;
		itemsToRender = data.slice((page - 1) * perPage, (page - 1) * perPage + perPage);
		store.scrollIntoView({block: 'start', behavior: 'smooth'})
		showItem();
	});
});

completeItem.forEach(function (i) {

	let toCart = i.querySelector('.add-to-cart-btn');
	toCart.addEventListener('click', function () {
		console.log(JSON.stringify(data[this.getAttribute('data-item-id')]));
		
		siteLocalStorage += JSON.stringify(data[this.getAttribute('data-item-id')]);
		localStorage.setItem('siteData', JSON.stringify(siteLocalStorage));
	});
});