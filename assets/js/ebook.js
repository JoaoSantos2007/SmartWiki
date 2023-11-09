const url = location.href.substring(0, location.href.lastIndexOf("/"));
const imgPath = `${url}/assets/img/ebooks`;

const navigate = (download_url) => {
  location.assign(download_url);
};

const createCardElement = () => {
  const card = document.createElement("div");
  card.classList.add("col", "col-xl-3", "col-md-4", "d-flex", "justify-content-center");

  return card;
};

const createInnerCardElement = (download_url) => {
  const innerCard = document.createElement("div");
  innerCard.classList.add("card", "h-100", "myCardStyle");
  innerCard.style.width = "14rem";
  innerCard.onclick = function() {
    navigate(download_url);
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
  image.src = `${imgPath}/image${id}.jpg` || url;
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

const createNameElement = (name) => {
  const nameElement = document.createElement("p");
  nameElement.classList.add("card-text", "fs-6", "fw-bold");
  nameElement.textContent = name;

  return nameElement;
};

async function renderCards() {
  try {
    const res = await fetch("assets/json/ebooks.json");
    const products = await res.json();

    const cardsContainer = document.querySelector("#cardsContainer");

    for (let index = 0; index < products.length; index++) {
      const { id, name, img, download_url } = products[index];

      const card = createCardElement();
      const cardBody = createCardBodyElement();
      const image = createCardImgElement(id, img, name);
      const innerCard = createInnerCardElement(download_url);
      const nameElement = createNameElement(name);

      cardBody.append(nameElement);
      innerCard.append(image, cardBody);
      card.append(innerCard);
      cardsContainer.append(card);
    }
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener("load", renderCards);