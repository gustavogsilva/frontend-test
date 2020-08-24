/*
 * @module Products - Module for handle Products
 *
 * @method renderNextPage - Render the next page of products in the product grid
 */

const Products = (function () {
  const getProducts = url => {
    return fetch(`https://${url}`).then(response => response.json());
  };

  /*
   * Sets the products grid to the loading state or not
   * @param {Boolean} boolean - True for enable loading, False for disable loading.
   */
  const loading = boolean => {
    const moreProductsBtn = document.querySelector("#moreProductsBtn");
    if (boolean) moreProductsBtn.innerHTML = '<div class="spinner"></div>';
    if (!boolean) moreProductsBtn.innerHTML = "Ainda mais produtos aqui!";
  };

  /*
   * Converts a number to a string of two decimal places separated by comma
   * @param {Number} price - Number to be converted
   */
  const formatsPrice = price => {
    let priceString = String(price).replace(".", ",");
    if (!priceString.includes(",")) return priceString + ",00";
    if (priceString.length <= priceString.search(",") + 2) return (priceString += "0");
    return priceString.slice(0, priceString.search(",") + 3);
  };

  /*
   * Render an array of products
   * @param {Array} products - Array of products to be rendered
   */
  const renderProducts = products => {
    products.forEach(product => {
      const { name, image, oldPrice, price, description, installments } = product;

      let card = document.createElement("div");
      card.className = "card";

      let cardImg = document.createElement("img");
      cardImg.className = "card__img";
      cardImg.src = `http:${image}`;
      card.appendChild(cardImg);

      let cardData = document.createElement("div");
      cardData.className = "card__data";
      card.appendChild(cardData);

      let cardTitle = document.createElement("h3");
      cardTitle.className = "card__title";
      cardTitle.innerHTML = name;
      cardData.appendChild(cardTitle);

      let cardDescription = document.createElement("p");
      cardDescription.className = "card__description";
      cardDescription.innerHTML = description;
      cardData.appendChild(cardDescription);

      let cardOldPrice = document.createElement("p");
      cardOldPrice.className = "card__old-price";
      cardOldPrice.innerHTML = `De: R$${formatsPrice(oldPrice)}`;
      cardData.appendChild(cardOldPrice);

      let cardCurrentPrice = document.createElement("p");
      cardCurrentPrice.className = "card__current-price";
      cardCurrentPrice.innerHTML = `Por: R$${formatsPrice(price)}`;
      cardData.appendChild(cardCurrentPrice);

      let cardInstallmentPrice = document.createElement("p");
      cardInstallmentPrice.className = "card__installment-price";
      cardInstallmentPrice.innerHTML = `ou ${installments.count}x de R$${formatsPrice(installments.value)}`;
      cardData.appendChild(cardInstallmentPrice);

      let btn = document.createElement("button");
      btn.className = "btn btn--small btn--w100";
      btn.type = "button";
      btn.innerHTML = "Comprar";
      cardData.appendChild(btn);

      document.querySelector(".products-section__wrapper").appendChild(card);
    });
  };

  /*
   * Render the next page of products and save the nextPage value returned by the API in a global variable.
   * @param {String} url - Url of the next page to be rendered
   */
  const renderNextPage = async url => {
    try {
      loading(true);
      const { products, nextPage } = await getProducts(url);
      renderProducts(products);
      nextPageUrl = nextPage;
    } catch (error) {
      alert("Ocorreu um problema ao tentar carregar a lista de produtos.");
    } finally {
      loading(false);
    }
  };

  // Exposed methods
  return {
    renderNextPage
  };
})();

let nextPageUrl = "frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";
Products.renderNextPage(nextPageUrl);
