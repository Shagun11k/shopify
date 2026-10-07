// ==========================================
// MYFASHION - SHOPPING CART
// ==========================================
let buttons = document.querySelectorAll(".product-card > button");

let cartCount = document.getElementById("cart-count");
let cartMessage = document.getElementById("cart-message");
let cartItems = document.getElementById("cart-items");
let cartTotal = document.getElementById("cart-total");

let count = 0;
let total = 0;


// ==========================================
// ADD TO CART
// ==========================================

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let productCard = button.parentElement;

        let productName =
            productCard.querySelector("h3").textContent;

        let priceText =
            productCard.querySelector(".price").textContent;

        let price =
            Number(priceText.replace("₹", "").replace(",", ""));


        // Check if product already exists
        let existingItem = null;

        let allItems = document.querySelectorAll(".cart-item");

        allItems.forEach(function(item) {

            let name = item.querySelector(".item-name");

            if (name && name.textContent === productName) {
                existingItem = item;
            }

        });


        // ==========================================
        // IF PRODUCT ALREADY EXISTS
        // ==========================================

        if (existingItem) {

            let quantityNumber =
                existingItem.querySelector(".quantity-number");

            let quantity =
                Number(quantityNumber.textContent);

            quantity++;

            quantityNumber.textContent = quantity;

            count++;

            total = total + price;

            cartCount.textContent = count;

            cartTotal.textContent = total;

        }


        // ==========================================
        // IF PRODUCT IS NEW
        // ==========================================

        else {

            count++;

            total = total + price;

            cartCount.textContent = count;


            if (count === 1) {
                cartItems.innerHTML = "";
            }


            let item = document.createElement("div");

            item.className = "cart-item";


            item.innerHTML = `
                <div>
                    <strong class="item-name">${productName}</strong>
                    <br>
                    ₹${price}
                </div>

                <div class="quantity">

                    <button class="minus-btn">−</button>

                    <span class="quantity-number">1</span>

                    <button class="plus-btn">+</button>

                </div>

                <button class="remove-btn">
                    Remove
                </button>
            `;


            cartItems.appendChild(item);


            // ==========================================
            // QUANTITY VARIABLES
            // ==========================================

            let quantity = 1;

            let quantityNumber =
                item.querySelector(".quantity-number");

            let plusButton =
                item.querySelector(".plus-btn");

            let minusButton =
                item.querySelector(".minus-btn");


            // PLUS
            plusButton.addEventListener("click", function() {

                quantity++;

                quantityNumber.textContent = quantity;

                count++;

                total = total + price;

                cartCount.textContent = count;

                cartTotal.textContent = total;

            });


            // MINUS
            minusButton.addEventListener("click", function() {

                if (quantity > 1) {

                    quantity--;

                    quantityNumber.textContent = quantity;

                    count--;

                    total = total - price;

                    cartCount.textContent = count;

                    cartTotal.textContent = total;

                }

            });


            // REMOVE
            let removeButton =
                item.querySelector(".remove-btn");


            removeButton.addEventListener("click", function() {

                count = count - quantity;

                total = total - (price * quantity);

                cartCount.textContent = count;

                cartTotal.textContent = total;

                item.remove();


                if (count === 0) {

                    cartItems.innerHTML =
                        "<p>Your cart is empty</p>";

                }

            });

        }


        // ==========================================
        // SHOW MESSAGE
        // ==========================================

        cartMessage.style.display = "block";

        setTimeout(function() {

            cartMessage.style.display = "none";

        }, 2000);

    });

});


// ==========================================
// OPEN / CLOSE CART
// ==========================================

let cartButton =
    document.querySelector(".cart");

let cartBox =
    document.getElementById("cart-box");


cartButton.addEventListener("click", function() {

    if (cartBox.style.display === "block") {

        cartBox.style.display = "none";

    } else {

        cartBox.style.display = "block";

    }

});
// ==========================================
// SEARCH PRODUCTS
// ==========================================

let searchInput = document.querySelector(".search-box input");

let productCards = document.querySelectorAll(".product-card");


searchInput.addEventListener("input", function() {

    let searchText = searchInput.value.toLowerCase();


    productCards.forEach(function(card) {

        let productName =
            card.querySelector("h3").textContent.toLowerCase();


        if (productName.includes(searchText)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});
// ==========================================
// WISHLIST
// ==========================================

let wishlistButton = document.querySelector(".wishlist");


wishlistButton.addEventListener("click", function() {

    if (wishlistButton.textContent === "♡") {

        wishlistButton.textContent = "♥";

    } else {

        wishlistButton.textContent = "♡";

    }

});
// ==========================================
// PRODUCT WISHLIST HEARTS
// ==========================================

// ==========================================
// CATEGORY FILTER
// ==========================================

let categoryLinks =
    document.querySelectorAll(".category-link");

let allProductCards =
    document.querySelectorAll(".product-card");


categoryLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        let selectedCategory =
            link.getAttribute("data-category");


        allProductCards.forEach(function(card) {

            let productCategory =
                card.getAttribute("data-category");


            // Show all products
            if (selectedCategory === "all") {

                card.style.display = "block";

            }

            // Show selected category
            else if (productCategory === selectedCategory) {

                card.style.display = "block";

            }

            // Hide other products
            else {

                card.style.display = "none";

            }

        });

    });

});
// ==========================================
// PRODUCT WISHLIST HEART
// ==========================================

let productWishlistButtons =
    document.querySelectorAll(".product-wishlist");

productWishlistButtons.forEach(function(heart) {

    heart.addEventListener("click", function(event) {

        event.stopPropagation();

        if (heart.classList.contains("active")) {

            heart.classList.remove("active");
            heart.textContent = "♡";

        } else {

            heart.classList.add("active");
            heart.textContent = "♥";

        }

    });

});


let productModal = document.getElementById("product-modal");

let closeModal = document.getElementById("close-modal");

let modalImage = document.getElementById("modal-image");

let modalName = document.getElementById("modal-name");

let modalPrice = document.getElementById("modal-price");
let modalRating = document.querySelector(".rating");

let modalDescription =
    document.getElementById("modal-description");


let allCards =
    document.querySelectorAll(".product-card");



allCards.forEach(function(card) {

    card.addEventListener("click", function(event) {

        
        if (event.target.classList.contains("product-wishlist")) {
            return;
        }

        
        if (event.target.tagName === "BUTTON") {
            return;
        }

        let image =
            card.querySelector(".product-image img");

        let name =
            card.querySelector("h3");

        let price =
            card.querySelector(".price");


        modalImage.src = image.src;

        modalName.textContent = name.textContent;

        modalPrice.textContent = price.textContent;

modalRating.textContent = "⭐⭐⭐⭐⭐ 4.5";

modalDescription.textContent =
    "Stylish and comfortable product. Perfect for your everyday fashion.";

        productModal.style.display = "flex";

    });

});


// CLOSE POPUP

closeModal.addEventListener("click", function() {

    productModal.style.display = "none";

});


// CLOSE WHEN CLICKING OUTSIDE

productModal.addEventListener("click", function(event) {

    if (event.target === productModal) {

        productModal.style.display = "none";

    }

});
