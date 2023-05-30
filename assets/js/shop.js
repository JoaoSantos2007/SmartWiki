const url = location.href.substring(0, location.href.lastIndexOf("/"));
const imgPath = `${url}/assets/img/products`;

const navigate = (id) => {
  const docPath = `${url}/product.html?id=${id}`;
  location.assign(docPath);
};

const createCard = (id) => {
  const card = document.createElement("div");
  card.classList.add("col-xxl-3", "col-md-4", "d-flex", "justify-content-center");
  card.onclick = function() {
    navigate(id);
  };

  return card;
};

const createInnerCard = () => {
  const innerCard = document.createElement("div");
  innerCard.classList.add("card", "h-100", "myCardStyle");
  innerCard.style.width = "14rem";

  return innerCard;
};

const createCardImg = (id, url, name) => {
  const image = document.createElement("img");
  image.classList.add("card-img-top", "img-fluid");
  image.style.cssText = `
    width: 222px;
    height: 225px;
  `;
  image.src = `${imgPath}/image${id}.avif` || url;
  image.alt = `${name} image`;
  if (id > 2) {
    image.loading = "lazy";
  }

  return image;
};

const createCardBody = () => {
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  return cardBody;
};

const createPriceElement = (price) => {
  const priceElement = document.createElement("h2");
  priceElement.classList.add("card-text");
  priceElement.textContent = `R$${price.toFixed(2).replace(".", ",")}`;

  return priceElement;
};

const createSummaryElement = (summary) => {
  const summaryElement = document.createElement("p");
  summaryElement.classList.add("card-text", "fs-6", "fw-normal");
  summaryElement.textContent = summary;

  return summaryElement;
};

async function renderCards() {
  try {
    const res = await fetch("assets/json/products.json");
    const products = await res.json();

    const cardsContainer = document.querySelector("#cardsContainer");

    for (let index = 0; index < products.length; index++) {
      const { id, price, name, summary } = products[index];

      const card = createCard(id);
      const cardBody = createCardBody();
      const image = createCardImg(id, url, name);
      const innerCard = createInnerCard();
      const priceElement = createPriceElement(price);
      const summaryElement = createSummaryElement(summary);

      cardBody.append(priceElement);
      cardBody.append(summaryElement);
      innerCard.append(image);
      innerCard.append(cardBody);
      card.append(innerCard);
      cardsContainer.append(card);
    }
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener("load", renderCards);