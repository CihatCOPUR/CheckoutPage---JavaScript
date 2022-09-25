const taxRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 300;

window.onload = () => {
  localStorage.setItem(`taxRate`, taxRate);
  localStorage.setItem(`shippingPrice`, shippingPrice);
  localStorage.setItem(`shippingPrice`, shippingPrice);
};

const productsDiv = document.querySelector(`.products`);

productsDiv.onclick = (item) => {
  if (item.target.className === "fa-solid fa-minus") {
    if (item.target.parentElement.querySelector(`.quantity`).innerText > 1) {
      item.target.parentElement.querySelector(`.quantity`).innerText--;
      calculateProductPrice(item.target);
      calculateCardPrice ();
    } else {
      if (
        confirm(
          `${
            item.target.closest(`.product-info`).querySelector(`h2`).innerText
          } wil be removed?`
        )
      ) {
        item.target.closest(`.product`).remove();
        calculateCardPrice();
      } else {
      }
    }
  } else if (item.target.className === "fa-solid fa-plus") {
    item.target.previousElementSibling.innerText++;
    calculateProductPrice(item.target);
    calculateCardPrice(item.target);
  } else if (item.target.className == "remove-product") {
    item.target.closest(`.product`).remove();
    calculateCardPrice();
  } else {
    console.log(`other element is clicked`);
  }
};

const calculateProductPrice = (x) => {
  const productInfoDiv = x.parentElement.parentElement;

  const price = productInfoDiv.querySelector(`strong`).innerText;

  const quantity = productInfoDiv.querySelector(`.quantity`).innerText;

  const productTotalDiv = productInfoDiv.querySelector(`.product-line-price`);

  productTotalDiv.innerText = (price * quantity).toFixed(2);
};

const calculateCardPrice = () => {
  const productTotalPricesDivs = document.querySelectorAll(`.product-line-price`);
  let subtotal = 0;
  productTotalPricesDivs.forEach((x) => {
    subtotal += parseFloat(x.innerText);

    
  });

  const taxPrice = subtotal* localStorage.getItem(`taxRate`);

  const shippingPrice= parseFloat(subtotal>0 && subtotal<localStorage.getItem(`shippingFreePrice`) ? localStorage.getItem(`shippingPrice`) : 0 );


  document.querySelector(`#cart-subtotal`).lastElementChild.innerText=subtotal.toFixed(2);

  document.querySelector(`#cart-tax p:nth-child(2)`).innerText = taxPrice.toFixed(2);

  document.querySelector(`#cart-shipping`).children[1].innerText=shippingPrice.toFixed(2);

  document.querySelector(`#cart-total`).lastElementChild.innerText=(subtotal+taxPrice+shippingPrice).toFixed(2);

};
