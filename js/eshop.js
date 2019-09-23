'use strict';

var itemList = [
	{
		id: 1,
		title: 'Стул 1',
		image: './img/product01.png',
		descr: 'Супер стул',
		price: 1300,
		available: true
	},
	{
		id: 2,
		title: 'Стул 2',
		image: './img/product02.png',
		descr: 'Супер стул',
		price: 2300,
		available: false
	},
	{
		id: 3,
		title: 'Стул 3',
		image: './img/product03.png',
		descr: 'Супер стул',
		price: 3300,
		available: true
	},
	{
		id: 4,
		title: 'Стул 4',
		image: './img/product04.png',
		descr: 'Супер стул',
		price: 4300,
		available: true
	},
	{
		id: 5,
		title: 'Стул 5',
		image: './img/product05.png',
		descr: 'Супер стул',
		price: 5300,
		available: false
	},
	{
		id: 6,
		title: 'Стул 6',
		image: './img/product06.png',
		descr: 'Супер стул',
		price: 6300,
		available: true
	},
	{
		id: 7,
		title: 'Стул 7',
		image: './img/product07.png',
		descr: 'Супер стул',
		price: 7300,
		available: true
	},
];

let crEl = function(elem) {
			return document.createElement(elem);
		},
		store = document.querySelector('#store'),
		itemBootstrap = crEl('div'),
		item = crEl('div'),
		itemImgWrap = crEl('div'),
		itemImg = crEl('img'),
		itemBody = crEl('div'),
		itemDesc = crEl('p'),
		itemName = crEl('h3'),
		itemPrice = crEl('h4'),
		addToCart = crEl('div'),
		addToCartBtn = crEl('button');
	
let toRow = store.querySelector('.row');
let itemMask = 'prct_'

let fragment = document.createDocumentFragment();

itemBootstrap.classList.add('col-md-4', 'col-xs-6');
item.classList.add('product');
itemImgWrap.classList.add('product-img');
itemBody.classList.add('product-body');
itemDesc.classList.add('product-category');
itemName.classList.add('product-name');
itemPrice.classList.add('product-price');
addToCart.classList.add('add-to-cart');
addToCartBtn.classList.add('add-to-cart-btn');

addToCartBtn.innerHTML = '<i class="fa fa-shopping-cart"></i>Купить';

itemBootstrap.insertAdjacentElement('afterbegin', item);
item.insertAdjacentElement('afterbegin', itemImgWrap);
itemImgWrap.insertAdjacentElement('afterbegin', itemImg);
itemImgWrap.insertAdjacentElement('afterend', itemBody);
itemBody.appendChild(itemDesc);
itemBody.appendChild(itemName);
itemBody.appendChild(itemPrice);
itemBody.appendChild(addToCart);
addToCart.appendChild(addToCartBtn);

console.log(itemBootstrap);


function showItem() {

	console.log(toRow);

	for (let i = 0; i < itemList.length; i++) {

		let itemClone = itemBootstrap.cloneNode(true);

		itemClone.querySelector('.product-category').textContent = itemList[i].descr;
		itemClone.querySelector('.product').setAttribute('id', itemMask+itemList[i].id);
		itemClone.querySelector('.product-name').textContent = itemList[i].title;
		itemClone.querySelector('.product-price').textContent = itemList[i].price+'\u20BD';
		itemClone.querySelector('img').setAttribute('src', itemList[i].image);
		itemClone.querySelector('img').setAttribute('alt', itemList[i].title);

		fragment.appendChild(itemClone);
	}

	toRow.appendChild(fragment);
}

let readyItem = document.querySelectorAll('.product');

readyItem.forEach(function(i) {
	i.addEventListener('click', function() {
		
	});
});

showItem();