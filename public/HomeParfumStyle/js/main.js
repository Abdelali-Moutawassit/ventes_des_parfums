(function($) {
	"use strict"

	// Mobile Nav toggle
	$('.menu-toggle > a').on('click', function (e) {
		e.preventDefault();
		$('#responsive-nav').toggleClass('active');
	})

	// Fix cart dropdown from closing
	$('.cart-dropdown').on('click', function (e) {
		e.stopPropagation();
	});

	/////////////////////////////////////////

	// Products Slick
	$('.products-slick').each(function() {
		var $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			infinite: true,
			speed: 50,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
			responsive: [{
	        breakpoint: 991,
	        settings: {
	          slidesToShow: 2,
	          slidesToScroll: 1,
	        }
	      },
	      {
	        breakpoint: 480,
	        settings: {
	          slidesToShow: 1,
	          slidesToScroll: 1,
	        }
	      },
	    ]
		});
	});

	// Products Widget Slick
	$('.products-widget-slick').each(function() {
		var $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			infinite: true,
			autoplay: true,
			speed: 50,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
		});
	});

	/////////////////////////////////////////

	var i = 0;
	$(document).ready(function () {
		var i = 0;
		var parfums = [
			{
				_id: "666ed32f74e44ce4d99b70c6",
				name: "AMEER AL OUD",
				price: "199",
			},
			{
				_id: "666ed32f74e44ce4d99b70c7", name: "QAED AL FURSAN", price: "299",
			},
			{
				_id: "666ed32f74e44ce4d99b70c8",
				name: "ASAD",
				price: 299,
			},
			{
				_id: "666ed32f74e44ce4d99b70c9",
				name: "BLUE DE CHANEL", price: "199"
			},
			{
				_id: "666ed32f74e44ce4d99b70ca",
				name: "INVICTUS",
				price: "299",
			},
			{
				_id: "666ed32f74e44ce4d99b70cb",
				name: "NOW",
				price: "299",
			},
			{
				_id: "666ed32f74e44ce4d99b70cc",
				name: "YARA",
				price: "299",
			},
			{
				_id: "666ed32f74e44ce4d99b70cd",
				name: "ASAD",
				price: "299",
			},
			{
				_id: "666ed32f74e44ce4d99b70ce",
				name: "LINTRUDE",
				price: "299",
			},
			{
				_id: "666ed32f74e44ce4d99b70cf",
				name: "EMAAN",
				price: "299",
			},
			{
				_id: "666ed32f74e44ce4d99b70d0",
				name: "COMO MOISELLE",
				price: "299",
			},
			{
				_id: "666ed32f74e44ce4d99b70d1",
				name: "PEGASUS",
				price: "299",
			},
			{
				_id: "666ed32f74e44ce4d99b70d2",
				name: "AL NASHAMA",
				price: "299",
			},
			{
				_id: "666ed32f74e44ce4d99b70d3",
				name: "FAKHAR AL OUD",
				price: "299",
			},
			{
				_id: "666ed32f74e44ce4d99b70d4",
				name: "TAJ AL MALIK",
				price: "299",
			},
			{
				_id: "666ed32f74e44ce4d99b70d5",
				name: "AJWAD",
				price: "299",
			},
			{
				_id: "666ed32f74e44ce4d99b70d6",
				name: "ANDALEEB",
				price: "299",
			},
			{
				_id: "666ed32f74e44ce4d99b70d7",
				name: "YARA",
				price: "299",
			},


			// Autres parfums...
		];

		// Fonction pour mettre à jour les détails du produit
		function updateProductDetails() {
			document.getElementById("product-name").innerText = parfums[i].name;
			document.getElementById("product-price").innerHTML = parfums[i].price + '.00DH <del class="product-old-price">299.00DH</del>';
			// Mettre à jour l'action du formulaire avec le nouvel ID de parfum
			var form = document.getElementById("add-to-cart-form");
			form.action = "/parfum/add-to-cart/" + parfums[i]._id;
		}

		// Initialisation du carousel
		$('#product-main-img').slick({
			infinite: true,
			speed: 300,
			dots: false,
			arrows: true, // Activer les flèches par défaut du carousel
			fade: true,
			asNavFor: '#product-imgs',
		});

		// Gestionnaire d'événements pour mettre à jour les détails du produit lorsque l'image du carousel est changée
		$('#product-main-img').on('afterChange', function (event, slick, currentSlide) {
			i = currentSlide; // Mettre à jour l'indice i avec le slide actuel
			updateProductDetails();
		});

		// Initialiser les détails du premier produit au chargement de la page
		updateProductDetails();
	});


	

	// Product imgs Slick
  $('#product-imgs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
		centerPadding: 0,
		vertical: true,
    asNavFor: '#product-main-img',
		responsive: [{
        breakpoint: 991,
        settings: {
					vertical: false,
					arrows: false,
					dots: true,
        }
      },
    ]
  });

	// Product img zoom
	var zoomMainProduct = document.getElementById('product-main-img');
	if (zoomMainProduct) {
		$('#product-main-img .product-preview').zoom();
	}

	/////////////////////////////////////////

	// Input number
	$('.input-number').each(function() {
		var $this = $(this),
		$input = $this.find('input[type="number"]'),
		up = $this.find('.qty-up'),
		down = $this.find('.qty-down');

		down.on('click', function () {
			var value = parseInt($input.val()) - 1;
			value = value < 1 ? 1 : value;
			$input.val(value);
			$input.change();
			updatePriceSlider($this , value)
		})

		up.on('click', function () {
			var value = parseInt($input.val()) + 1;
			$input.val(value);
			$input.change();
			updatePriceSlider($this , value)
		})
	});

	var priceInputMax = document.getElementById('price-max'),
			priceInputMin = document.getElementById('price-min');

	priceInputMax.addEventListener('change', function(){
		updatePriceSlider($(this).parent() , this.value)
	});

	priceInputMin.addEventListener('change', function(){
		updatePriceSlider($(this).parent() , this.value)
	});

	function updatePriceSlider(elem , value) {
		if ( elem.hasClass('price-min') ) {
			console.log('min')
			priceSlider.noUiSlider.set([value, null]);
		} else if ( elem.hasClass('price-max')) {
			console.log('max')
			priceSlider.noUiSlider.set([null, value]);
		}
	}

	// Price Slider
	var priceSlider = document.getElementById('price-slider');
	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: [1, 999],
			connect: true,
			step: 1,
			range: {
				'min': 1,
				'max': 999
			}
		});

		priceSlider.noUiSlider.on('update', function( values, handle ) {
			var value = values[handle];
			handle ? priceInputMax.value = value : priceInputMin.value = value
		});
	}

})(jQuery);
