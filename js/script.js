const Products = (function () {
  const getProducts = url => {
    return fetch(`https://${url}`).then(response => response.json());
  };

  const formatsPrice = price => {
    let priceString = String(price).replace(".", ",");
    if (!priceString.includes(",")) return priceString + ",00";
    if (priceString.length <= priceString.search(",") + 2) return (priceString += "0");
    return priceString.slice(0, priceString.search(",") + 3);
  };

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

  const renderNextPage = async url => {
    const { products, nextPage } = await getProducts(url);
    renderProducts(products);
    nextPageUrl = nextPage;
  };

  // Exposed modules
  return {
    renderNextPage
  };
})();

let nextPageUrl = "frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";

Products.renderNextPage(nextPageUrl);
