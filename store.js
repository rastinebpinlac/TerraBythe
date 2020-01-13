if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  console.log("removed");
  updateCartTotal();
}

function quantityChanged(event) {
  var inputChanged = event.target;
  if (isNaN(inputChanged.value) || inputChanged.value <= 0) {
    inputChanged.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var storeItem = button.parentElement;
  var title = storeItem.getElementsByClassName("item-title")[0].innerText;
  var price = storeItem.getElementsByClassName("item-price")[0].innerText;
  var imgSrc = storeItem.getElementsByClassName("item-img")[0].src;
  console.log(title, price, imgSrc);
  addItemToCart(title, price, imgSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imgSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartRowContainer = document.getElementsByClassName(
    "cart-row-container"
  )[0];
  var cartItemNames = cartRowContainer.getElementsByClassName("cart-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item has already been added to your cart!");
      return;
    }
  }
  var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-img" src="${imgSrc}" alt="" />
        <span class="cart-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input type="number" class="cart-input" value="1" />
        <button class="btn-danger">Remove</button>
    </div>`;
  cartRow.innerHTML = cartRowContents;
  cartRowContainer.append(cartRow);

  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);

  cartRow
    .getElementsByClassName("cart-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName(
    "cart-row-container"
  )[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName("cart-input")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total += price * quantity;
  }

  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
