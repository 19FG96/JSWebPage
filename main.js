const weatherAPIKey = 'ec5098856f4ec85f3dc637c5fabd905f';
const weatherAPIURL =
	'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric';

const slideshow = [
	{
		src: './assets/gallery/image1.jpg',
		alt: 'Thumbnail image 1',
	},
	{
		src: './assets/gallery/image2.jpg',
		alt: 'Thumbnail image 2',
	},
	{
		src: './assets/gallery/image3.jpg',
		alt: 'Thumbnail image 3',
	},
];

const products = [
	{
		title: 'AstroFiction',
		author: 'John Doe',
		price: 49.9,
		image: './assets/products/img6.png',
	},
	{
		title: 'Space Odissey',
		author: 'Marie Anne',
		price: 35,
		image: './assets/products/img1.png',
	},
	{
		title: 'Doomed City',
		author: 'Jason Cobert',
		price: 0,
		image: './assets/products/img2.png',
	},
	{
		title: 'Black Dog',
		author: 'John Doe',
		price: 85.35,
		image: './assets/products/img3.png',
	},
	{
		title: 'My Little Robot',
		author: 'Pedro Paulo',
		price: 0,
		image: './assets/products/img5.png',
	},
	{
		title: 'Garden Girl',
		author: 'Ankit Patel',
		price: 45,
		image: './assets/products/img4.png',
	},
];

function determineDaytime(greetingText) {
	let currentHour = new Date();
	if (currentHour.getHours() > 0 && currentHour.getHours() < 12) {
		greetingText = 'Good morning!';
	} else if (currentHour.getHours() >= 12 && currentHour.getHours() < 18) {
		greetingText = 'Good afternoon!';
	} else {
		greetingText = 'Good evening!';
	}
	return greetingText;
}

function celsiusToFahrenheit(temperature) {
	let tempFahr = (temperature * 9) / 5 + 32;
	return tempFahr;
}

// Header section

function menuHandler() {
	document
		.getElementById('open-nav-menu')
		.addEventListener('click', function () {
			document.querySelector('header nav .wrapper').classList.add('nav-open');
		});

	document
		.querySelector('#close-nav-menu')
		.addEventListener('click', function () {
			document
				.querySelector('header nav .wrapper')
				.classList.remove('nav-open');
		});
}

// Greeting section

function greetingHandler() {
	let greetingText = undefined;
	greetingText = determineDaytime(greetingText);
	document.querySelector('#greeting').innerHTML = greetingText;
}

// Weather report

function weatherHandler() {
	navigator.geolocation.getCurrentPosition((position) => {
		let longitude = position.coords.longitude;
		let latitude = position.coords.latitude;
		let URL = weatherAPIURL
			.replace('{lat}', latitude)
			.replace('{lon}', longitude)
			.replace('{API key}', weatherAPIKey);
		fetch(URL)
			.then((response) => response.json())
			.then((data) => {
				const condition = data.weather[0].description;
				const location = data.name;
				const temperature = data.main.temp;

				console.log(condition, location, temperature);

				let weatherTextCelsius = `The weather is ${condition} in ${location} and it is ${temperature
					.toFixed(1)
					.toString()}° outside. `;

				let weatherTextFahr = `The weather is ${condition} in ${location} and it is ${celsiusToFahrenheit(
					temperature
				)
					.toFixed(1)
					.toString()}° outside. `;

				document
					.querySelector('.weather-group')
					.addEventListener('click', function (e) {
						if (e.target.id == 'celsius') {
							document.querySelector('p#weather').innerHTML =
								weatherTextCelsius;
						} else if (e.target.id == 'fahr') {
							document.querySelector('p#weather').innerHTML = weatherTextFahr;
						}
					});
			})
			.catch((err) => {
				console.log(
					'Error, unable to get weather information - check network connection.'
				);
				document.querySelector('p#weather').innerHTML =
					'Unable to retrieve weather information. Please refresh the page to try again.';
			});
	});
}

// time

function clockHandler() {
	setInterval(function () {
		let localTime = new Date();

		document.querySelector('span[data-time=hours]').innerHTML = localTime
			.getHours()
			.toString()
			.padStart(2, '0');
		document.querySelector('span[data-time=minutes]').innerHTML = localTime
			.getMinutes()
			.toString()
			.padStart(2, '0');
		document.querySelector('span[data-time=seconds]').innerHTML = localTime
			.getSeconds()
			.toString()
			.padStart(2, '0');
	}, 1000);
}

// Gallery section

function galleryHandler() {
	let mainImage = document.querySelector('#gallery > img');
	let thumbnails = document.querySelector('#gallery .thumbnails');

	mainImage.src = slideshow[0].src;
	mainImage.alt = slideshow[0].alt;

	slideshow.forEach(function (image, index) {
		let thumb = document.createElement('img');
		thumb.src = image.src;
		thumb.alt = image.alt;
		thumb.dataset.arrayIndex = index;
		thumb.dataset.selected = index === 2 ? true : false;
		thumbnails.appendChild(thumb);
	});

	thumbnails.addEventListener('click', function (e) {
		console.log(e.target.dataset.arrayIndex);
		let selectedIndex = e.target.dataset.arrayIndex;
		let selectedimage = slideshow[selectedIndex];
		mainImage.src = selectedimage.src;
		mainImage.alt = selectedIndex.alt;

		thumbnails.querySelectorAll('img').forEach(function (img) {
			img.dataset.selected = false;
		});

		e.target.dataset.selected = true;
	});
}

function populateProducts(productList) {
	let productSection = document.querySelector('.products-area');
	productSection.textContent = '';
	// run a loop through the products and create an HTML element for each of them
	productList.forEach(function (product, index) {
		// create an HTML
		let productElm = document.createElement('div');
		productElm.classList.add('product-item');

		// create the product image
		let productImage = document.createElement('img');
		productImage.src = product.image;
		productImage.alt = 'image for ' + product.image.title;

		//create product details section
		let productDetails = document.createElement('div');
		productDetails.classList.add('product-details');

		//create produvt title, author, price-title and price
		let productTitle = document.createElement('h3');
		productTitle.classList.add('product-title');
		productTitle.textContent = product.title;

		let productAuthor = document.createElement('p');
		productAuthor.classList.add('product-author');
		productAuthor.textContent = product.author;

		let productPriceTitle = document.createElement('p');
		productPriceTitle.classList.add('product-price-title');
		productPriceTitle.textContent = 'price: ';

		let productPrice = document.createElement('p');
		productPrice.classList.add('product-price');
		productPrice.textContent =
			product.price > 0 ? '$ ' + product.price.toFixed(2) : 'free';

		//append the product details
		productDetails.append(productTitle);
		productDetails.append(productAuthor);
		productDetails.append(productPriceTitle);
		productDetails.append(productPrice);

		// add all child HTML elements of the product
		productElm.append(productImage);
		productElm.append(productDetails);

		// add complete individual product to the product section
		productSection.append(productElm);
	});
}

// Product section
function productsHandler() {
	let totalProducts = products.length;
	document.querySelector(
		'.products-filter label[for=all] span.product-amount'
	).textContent = totalProducts;

	let freeProducts = products.filter(
		(product) => !product.price || product.price === 0
	);
	document.querySelector(
		'.products-filter label[for=free] span.product-amount'
	).textContent = freeProducts.length;

	let paidProducts = products.filter((product) => product.price > 0);
	document.querySelector(
		'.products-filter label[for=paid] span.product-amount'
	).textContent = paidProducts.length;

	let showAll = document.querySelector('.products-filter');
	showAll.addEventListener('click', function (e) {
		if (e.target.id === 'all') {
			populateProducts(products);
		} else if (e.target.id === 'paid') {
			populateProducts(paidProducts);
		} else if (e.target.id === 'free') {
			populateProducts(freeProducts);
		}
	});
}

function footerHandler() {
	let currentYear = new Date().getFullYear();
	document.querySelector(
		'footer'
	).textContent = `@${currentYear}, all rights reserved`;
}

// On Page Load
menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();
