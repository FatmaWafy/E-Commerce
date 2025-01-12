let icon = document.querySelector(".mobile-only i");
let nav = document.querySelector("#mobile nav");

icon.addEventListener("click", () => {
  if (icon.className == "fa-solid fa-bars") {
    icon.className = "fa-solid fa-x";
    nav.classList.toggle("open");
    document.body.classList.toggle("stop-scrolling");
  } else {
    icon.className = "fa-solid fa-bars";
    nav.classList.toggle("open");
  }
});

let Images = document.querySelectorAll("#products img");

Images.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);

    //create Box
    let Box = document.createElement("div");
    Box.className = "Box";

    //create ImageBox
    let ImageBox = document.createElement("div");
    ImageBox.className = "ImageBox";

    //create Img
    let Img = document.createElement("img");
    Img.src = img.src;
    Img.alt = "";
    Img.width = "90%";
    ImageBox.appendChild(Img);
    Box.appendChild(ImageBox);

    let h2 = document.createElement("h2");
    h2.textContent = "Carton Astronaut T-Shirt";
    ImageBox.appendChild(h2);

    let star = document.createElement("div");
    star.className = "star";
    for (let i = 0; i <= 5; i++) {
      let ico = document.createElement("i");
      ico.className = "fas fa-star";
      star.appendChild(ico);
      ImageBox.appendChild(star);
    }

    let h3 = document.createElement("h3");
    h3.textContent = "78$";
    ImageBox.appendChild(h3);

    // create DetailsBox
    let DetailsBox = document.createElement("div");
    DetailsBox.className = "DetailsBox";
    Box.appendChild(DetailsBox);

    let ProductDetails = document.createElement("h4");
    ProductDetails.textContent = "Product Details";
    DetailsBox.appendChild(ProductDetails);

    let description = document.createElement("span");
    description.textContent =
      "The Gildan Ultra Cotton T-Shirts is made from a substantial 6.0 oz. per sq. yd. fabric constructed from 100% cotton, this classic fit preshrunk jersey Knit provides unmatched comfort with each wear.";
    DetailsBox.appendChild(description);

    let sizes = ["Select Size", "Xl", "XXl", "Small", "Large"];
    let select = document.createElement("select");
    for (let size of sizes) {
      let option = document.createElement("option");
      option.textContent = size;
      select.appendChild(option);
    }
    DetailsBox.appendChild(select);

    let input = document.createElement("input");
    input.type = "number";
    input.value = "1";
    input.min = "1";
    DetailsBox.appendChild(input);

    //Add Add to Cart button
    let button = document.createElement("button");
    button.className = "normal";
    button.textContent = "Add To Cart";

    DetailsBox.appendChild(button);

    button.addEventListener("click", () => {
      const quantity = parseInt(input.value, 10);
      const selectedSize = select.value;

      if (isNaN(quantity) || quantity < 1) {
        alert("Please enter a valid quantity (1 or more)!");
        return;
      }
      if (selectedSize === "Select Size") {
        alert("Please select a valid size before adding to cart!");
        return;
      }
      const baseProduct = {
        id: img.closest(".pro").dataset.id,
        name: img.closest(".pro").querySelector("h5").textContent,
        price: parseFloat(img.closest(".pro").dataset.price),
        quantity: quantity,
        size: selectedSize,
      };

      addToCart(baseProduct);
      saveCart();

      alert(
        `${baseProduct.quantity} x ${baseProduct.name} (${baseProduct.size}) added to cart!`
      );
    });

    // create CloseBtn
    let CloseBtn = document.createElement("button");
    let CloseBtnText = document.createTextNode("X");
    CloseBtn.className = "CloseBtn";
    CloseBtn.appendChild(CloseBtnText);
    Box.appendChild(CloseBtn);

    //add box to body
    document.body.appendChild(Box);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className == "CloseBtn") {
    e.target.parentNode.remove();
    document.querySelector(".overlay").remove();
  }
});

///////////////////////////////////////
// Slider

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  if (!slides || !btnLeft || !btnRight || !dotContainer) {
    console.error("Slider elements not found in the DOM.");
    return;
  }

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    const dots = document.querySelectorAll(".dots__dot");
    if (!dots) return;

    dots.forEach((dot) => dot.classList.remove("dots__dot--active"));

    const activeDot = document.querySelector(
      `.dots__dot[data-slide="${slide}"]`
    );
    if (activeDot) activeDot.classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
document.addEventListener("DOMContentLoaded", () => {
  const sliderElement = document.querySelector(".slider");
  if (sliderElement) {
    slider();
  }
});

///////////////////////////////////////
// Cart

let cart = [];

function updateCartUI() {
  const cartList = document.getElementById("cart-list");
  const subtotal = document.getElementById("subtotal");
  const subTotal = document.getElementById("sub-total");
  const shopping = document.getElementById("shopping");
  const total = document.getElementById("total");

  if (!cartList || !total) return;

  cartList.innerHTML = "";
  let subtotalPrice = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.className = "product-name";
    nameCell.textContent = item.name;

    const sizeCell = document.createElement("td");
    const sizeSelect = document.createElement("select");
    const sizes = ["Small", "Medium", "Large", "Xl", "XXl"];

    sizes.forEach((size) => {
      const option = document.createElement("option");
      option.textContent = size;
      option.value = size;
      if (size === item.size) {
        option.selected = true;
      }
      sizeSelect.appendChild(option);
    });

    sizeSelect.addEventListener("change", (e) => {
      item.size = e.target.value;
      saveCart();
      updateCartUI();
    });

    sizeCell.appendChild(sizeSelect);

    const priceCell = document.createElement("td");
    priceCell.className = "product-price";
    priceCell.textContent = `$${item.price}`;

    const quantityCell = document.createElement("td");
    const quantityContainer = document.createElement("div");
    quantityContainer.className = "quantity-container";

    const minusButton = document.createElement("button");
    minusButton.textContent = "-";
    minusButton.className = "quantity-control";
    minusButton.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
        updateCartUI();
        saveCart();
      }
    });

    const quantitySpan = document.createElement("span");
    quantitySpan.className = "product-quantity";
    quantitySpan.textContent = item.quantity;

    const plusButton = document.createElement("button");
    plusButton.textContent = "+";
    plusButton.className = "quantity-control";
    plusButton.addEventListener("click", () => {
      item.quantity += 1;
      updateCartUI();
      saveCart();
    });

    quantityContainer.appendChild(minusButton);
    quantityContainer.appendChild(quantitySpan);
    quantityContainer.appendChild(plusButton);
    quantityCell.appendChild(quantityContainer);

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";

    deleteButton.innerHTML =
      '<span class="delete-button"><i class="fa-solid fa-trash"></i></span>';

    deleteButton.addEventListener("click", () => {
      cart.splice(index, 1);
      updateCartUI();
      saveCart();
    });
    deleteCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(sizeCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(deleteCell);

    cartList.appendChild(row);
    subtotalPrice += item.price * item.quantity;
  });

  const shippingCost = cart.length > 0 ? 80 : 0;
  const totalPrice = subtotalPrice + shippingCost;

  subtotal.textContent = subtotalPrice.toFixed(2);

  subTotal.textContent = `$${subtotalPrice.toFixed(2)}`;
  shopping.textContent = `$${shippingCost}`;
  total.textContent = `$${totalPrice.toFixed(2)}`;

  const checkoutData = cart.map((item) => ({
    name: item.name,
    size: item.size,
    quantity: item.quantity,
    price: item.price,
  }));
  const summary = document.getElementById("summary-list");
  summary.innerHTML = checkoutData
    .map(
      (item) => `
      <li style="margin-bottom: 10px;">${item.name} (${item.size}): ${
        item.quantity
      } x $${item.price.toFixed(2)}</li>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", updateCartUI);

function addToCart(product) {
  const existingProduct = cart.find(
    (item) => item.id === product.id && item.size === product.size
  );

  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cart.push({ ...product });
  }

  updateCartUI();
  saveCart();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productDiv = event.target.closest(".pro");

      let sizeSelect = productDiv.querySelector("select");

      if (!sizeSelect) {
        sizeSelect = document.createElement("select");
        const sizes = ["Small", "Medium", "Large", "Xl", "XXl"];

        sizes.forEach((size) => {
          const option = document.createElement("option");
          option.textContent = size;
          option.value = size;
          sizeSelect.appendChild(option);
        });
      }

      const selectedSize = sizeSelect.value;

      if (selectedSize === "Select Size" || selectedSize === "") {
        alert("Please select a valid size before adding to cart!");
        return;
      }

      const product = {
        id: productDiv.dataset.id,
        name: productDiv.querySelector("h5").textContent,
        price: parseFloat(productDiv.dataset.price),
        quantity: 1,
        size: selectedSize,
      };

      addToCart(product);
      saveCart();
      alert(`${product.name} (${product.size}) has been added to the cart!`);
    });
  });

  loadCart();
});

document.addEventListener("DOMContentLoaded", () => {
  const checkoutButton = document.querySelector(".checkout-button");
  const closeOverlayButton = document.getElementById("close-overlay");
  const paymentForm = document.getElementById("payment-form");

  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      if (cart.length === 0) {
        alert(
          "Your cart is empty! Please add items to the cart before checkout."
        );
        return;
      }

      const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const shippingCost = 80;
      const total = subtotal + shippingCost;

      const summary = document.getElementById("checkout-total");
      summary.innerHTML = `
    <li style="margin-bottom: 10px; font-weight: bold;">Total: $${total.toFixed(
      2
    )}</li>
  `;

      const overlay = document.getElementById("checkout-overlay");
      overlay.style.display = "flex";
    });
  }
  if (closeOverlayButton) {
    closeOverlayButton.addEventListener("click", () => {
      const overlay = document.getElementById("checkout-overlay");
      overlay.style.display = "none";
    });
  }
  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!isLoggedin()) {
        alert("You need to log in to complete the payment.");
        userIcon.click();
        return;
      }

      const phoneNumber = document.getElementById("phone-number").value;
      const address = document.getElementById("address").value;
      const cardNumber = document.getElementById("card-number").value;
      const expiryDate = document.getElementById("expiry-date").value;

      if (!phoneNumber || !address || !cardNumber || !expiryDate) {
        alert("Please fill in all payment fields.");
        return;
      }

      const paymentData = {
        phoneNumber,
        address,
        cardNumber,
        expiryDate,
        cartData: cart,
      };

      console.log("Processing payment with data:", paymentData);

      cart = [];
      saveCart();
      updateCartUI();

      alert("Payment successful!");
      const overlay = document.getElementById("checkout-overlay");
      overlay.style.display = "none";
    });
  }
});

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
}
