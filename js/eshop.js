"use strict";

import data from "./data.js";

function crEl(elem) {
	return document.createElement(elem);
}

const store = document.querySelector("#store");
const cart = document.querySelector(".cart-list");
const cartItem = cart.querySelector(".product-widget");
const cartItemQty = document.querySelector(".dropdown").querySelector(".qty");
const item = document.querySelector(".product").parentNode;
const cloneItem = item.cloneNode(true);
const toRow = store.querySelector(".pseudoSection");
const itemMask = "prct_";
const perPage = 15;
const pageBtns = document.querySelector(".store-pagination");
const sortButton = document.querySelector(".sort-var").querySelectorAll("span");

let filteredData = data.concat();
let completeItems = document.querySelectorAll(".product");

let currency = " \u20BD";
const nextButton = document.querySelector("#next-page");
const previousButton = document.querySelector("#previous-page");
const firstButton = document.querySelector("#first-page");
const lastButton = document.querySelector("#last-page");

let products = {};

let pageQty = Math.ceil(filteredData.length / perPage);

if (Object.keys(products).length > 0) {
	localStorage.setItem("products", JSON.stringify(products));
}

if (Object.keys(products).length === 0 && localStorage.length === 0) {
	localStorage.setItem("products", JSON.stringify(products));
}

let page = 0;

let itemsToRender = filteredData.slice(
	page * perPage,
	page * perPage + perPage
);

while (cart.firstChild) {
	cart.removeChild(cart.firstChild);
}

function showItem() {
	while (toRow.firstChild) {
		toRow.removeChild(toRow.firstChild);
	}

	let itemsToRender = filteredData.slice(
		page * perPage,
		page * perPage + perPage
	);

	for (let i = 0; i < perPage; i++) {
		let currentItemClone = cloneItem.cloneNode(true);

		currentItemClone.querySelector(".product-category").textContent =
			itemsToRender[i].descr;
		currentItemClone
			.querySelector(".product")
			.setAttribute("id", itemMask + itemsToRender[i].id);
		currentItemClone.querySelector(".product-name").textContent =
			itemsToRender[i].title;
		currentItemClone.querySelector(".product-price").textContent =
			itemsToRender[i].price + currency;
		currentItemClone
			.querySelector("img")
			.setAttribute("src", itemsToRender[i].image);
		currentItemClone
			.querySelector("img")
			.setAttribute("alt", itemsToRender[i].title);
		currentItemClone
			.querySelector(".add-to-cart-btn")
			.setAttribute("data-item-id", itemsToRender[i].id);

		toRow.appendChild(currentItemClone);
	}

	completeItems = document.querySelectorAll(".product");

	completeItems.forEach(function(item) {
		let toCart = item.querySelector(".add-to-cart-btn");

		toCart.addEventListener("click", function() {
			let currentItem = +this.getAttribute("data-item-id") - 1;

			let product = filteredData[currentItem];

			if (
				Object.keys(JSON.parse(localStorage.getItem("products"))).length !== 0
			) {
				products = JSON.parse(localStorage.getItem("products"));

				if (products[currentItem]) {
					products[currentItem].quantity = products[currentItem].quantity + 1;
				} else {
					product.quantity = 1;
					products[currentItem] = product;
				}
			} else {
				product.quantity = 1;
				products[currentItem] = product;
			}

			localStorage.setItem("products", JSON.stringify(products));

			addToCart();
		});
	});
}

showItem();

// lastButton.textContent = pageQty;

const pagination = (page, lastPage = pageQty) => {
	const startBtns = [page, page + 1, page + 2];
	const gapBtns = [page - 2, page - 1, page];
	const middleBtn = ["..."];
	const lastBtns = [lastPage - 3, lastPage - 2, lastPage - 1];

	let btnsArr = [];

	if (page < lastPage - 6) {
		btnsArr = [...startBtns, ...middleBtn, ...lastBtns];
	} else if (page < lastPage - 4) {
		btnsArr = [...gapBtns, ...middleBtn, ...lastBtns];
	} else if (page < lastPage - 3) {
		btnsArr = [...gapBtns, ...lastBtns]; // last 6 pages
	} else {
		btnsArr = [...middleBtn, ...lastBtns]; // last 3 pages
	}

	console.log(btnsArr);

	
	while (pageBtns.firstChild) {
		pageBtns.removeChild(pageBtns.firstChild);
	}

	btnsArr.map((num, index) => {
		let paginationButton = crEl("li");
	
		if (index == 0) paginationButton.classList.add("active");

		paginationButton.textContent = num !== "..." ? num + 1 : num;
		pageBtns.appendChild(paginationButton);
	});

	const paginationButtons = pageBtns.querySelectorAll("li");
	
	paginationButtons.forEach(function(i, n) {
		i.addEventListener("click", function() {
			paginationButtons.forEach(function(el) {
				el.classList.remove("active");
			});
	
			this.classList.remove("active");
			this.classList.add("active");
	
			page = +this.textContent - 1;
			itemsToRender = filteredData.slice(
				page * perPage,
				page * perPage + perPage
			);

			pagination(page)
	
			store.scrollIntoView({
				block: "start",
				behavior: "smooth"
			});
	
			showItem();
		});
	});

};

pagination(page);

function firstPage() {
	if (page !== 1) {
		page = 1;
	}
}

function lastPage() {
	if (page !== pageQty) {
		page = pageQty;
	}
}

function nextPage() {
	if (page === pageQty - 1) return;

	page += 1;

	pagination(page);

	// activePage("next");

	showItem();
}

function previousPage() {
	if (page === 0) return;

	page -= 1;

	pagination(page);

	// activePage("previous");
	showItem();
}

function activePage(direction) {
	let currentActiveButton = pageBtns.querySelector(".active");
	let nextActiveButton = currentActiveButton.nextElementSibling;

	switch (direction) {
		case "next":
			// currentActiveButton.classList.remove("active");
			currentActiveButton.classList.remove("active");
			nextActiveButton.classList.add("active");
			break;
		case "previous":
			nextActiveButton = currentActiveButton.previousElementSibling;
			currentActiveButton.classList.remove("active");
			nextActiveButton.classList.add("active");
			break;
	}
}

nextButton.addEventListener("click", nextPage);
previousButton.addEventListener("click", previousPage);
// firstButton.addEventListener("click", firstPage);
// lastButton.addEventListener("click", lastPage);

function addToCart() {
	while (cart.firstChild) {
		cart.removeChild(cart.firstChild);
	}

	let itemToCart = JSON.parse(localStorage.getItem("products"));

	let cartItemMask = itemMask + "wid_";

	for (let key in itemToCart) {
		let currentCloneCartItem = cartItem.cloneNode(true);

		currentCloneCartItem.setAttribute("id", cartItemMask + itemToCart[key].id);

		currentCloneCartItem
			.querySelector(".product-img")
			.querySelector("img")
			.setAttribute("src", itemToCart[key].image);

		currentCloneCartItem.querySelector(".product-name").textContent =
			itemToCart[key].title;

		currentCloneCartItem.querySelector(".product-total-price").textContent =
			itemToCart[key].price;

		currentCloneCartItem.querySelector(".product-name").textContent =
			itemToCart[key].title;

		currentCloneCartItem.querySelector(".qty").textContent =
			itemToCart[key].quantity + " qty";

		removeFromCart(key, currentCloneCartItem, itemToCart);

		cart.appendChild(currentCloneCartItem);
	}

	countCartQty(itemToCart);
	countCartTotal(itemToCart);
}

function countCartQty(obj) {
	cartItemQty.textContent = Object.keys(obj).length;

	document.querySelector(".cart-summary").querySelector("small").textContent =
		cartItemQty.textContent + " Item(s) selected";
}

function countCartTotal(obj) {
	let totalPrice = 0;

	Object.keys(obj).forEach(function(key) {
		totalPrice += obj[key].price * obj[key].quantity;
	});

	document.querySelector(".cart-summary").querySelector("h5").textContent =
		"Subtotal: " + totalPrice + currency;
}

function removeFromCart(i, elem, storage) {
	elem.querySelector(".delete").addEventListener("click", function(e) {
		elem.remove();

		delete storage[i];

		countCartQty(storage);
		countCartTotal(storage);

		localStorage.setItem("products", JSON.stringify(storage));
	});
}

addToCart();

sortButton.forEach(function(i) {
	i.addEventListener("click", function(e) {
		this.classList.toggle("active");

		switch (this.getAttribute("data-sort")) {
			case "toHigh":
				this.previousElementSibling.classList.remove("active");
				console.log(`data is ${JSON.stringify(data)}`);
				filteredData = filteredData.sort(function(a, b) {
					return +a.price - +b.price;
				});
				console.log(`To high: ${JSON.stringify(filteredData)}`);
				showItem();

				break;

			case "toLow":
				this.nextElementSibling.classList.remove("active");
				filteredData = filteredData.sort(function(a, b) {
					return +b.price - +a.price;
				});
				console.log(`To low: ${filteredData.length}`);
				showItem();

				break;

			case "available":
				if (!this.classList.contains("active")) {
					filteredData = data.concat();
					console.log(`Default available: ${filteredData.length}`);
					showItem();
				} else {
					let filteredDataAvailable = [];

					filteredData.forEach(function(item) {
						if (item.available) {
							filteredDataAvailable.push(item);
						}
					});

					filteredData = filteredDataAvailable;
					showItem();
				}

				break;

			default:
				filteredData = data.concat();
		}
	});
});
