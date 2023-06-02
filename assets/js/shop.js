const url = location.href.substring(0, location.href.lastIndexOf("/"));
const imgPath = `${url}/assets/img/products`;

const navigate = (id) => {
  const docPath = `${url}/product.html?id=${id}`;
  location.assign(docPath);
};

const createCardElement = () => {
  const card = document.createElement("div");
  card.classList.add("col", "col-xl-3", "col-md-4", "d-flex", "justify-content-center");

  return card;
};

const createInnerCardElement = (id) => {
  const innerCard = document.createElement("div");
  innerCard.classList.add("card", "h-100", "myCardStyle");
  innerCard.style.width = "14rem";
  innerCard.onclick = function() {
    navigate(id);
  };

  return innerCard;
};

const createCardImgElement = (id, url, name) => {
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

const createCardBodyElement = () => {
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

      const card = createCardElement();
      const cardBody = createCardBodyElement();
      const image = createCardImgElement(id, url, name);
      const innerCard = createInnerCardElement(id);
      const priceElement = createPriceElement(price);
      const summaryElement = createSummaryElement(summary);

      cardBody.append(priceElement, summaryElement);
      innerCard.append(image, cardBody);
      card.append(innerCard);
      cardsContainer.append(card);
    }
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener("load", renderCards);