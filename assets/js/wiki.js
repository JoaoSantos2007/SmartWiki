const url = location.href.substring(0, location.href.lastIndexOf("/"));
const imgPath = `${url}/assets/img/docs`;

const navigate = (id) => {
    const path = `${url}/document.html?id=${id}`;
    location.assign(path);
};

const createCardElement = () => {
    const card = document.createElement("div");
    card.classList.add("col","col-xl-4", "col-md-6", "d-flex", "justify-content-center", "align-items-center");

    return card;
};

const createInnerCardElement = (id) => {
    const innerCard = document.createElement("div");
    innerCard.classList.add("card", "h-100", "myCardStyle");
    innerCard.style.width = "286px";
    innerCard.onclick = function() {
        navigate(id);
    };

    return innerCard;
};

const createCardBodyElement = () => {
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    return cardBody;
};

const createCardImgElement = (id, url, name) => {
    const image = document.createElement("img");
    image.classList.add("card-img-top", "img-fluid");
    image.style.cssText = `
        width: 100%;
        height: 175px;
    `;
    image.src = `${imgPath}/320/image${id}.avif` || url;
    image.alt = `${name} image`;
    if (id > 2) {
        image.loading = "lazy";
    }

    return image;
};

const createCardTextElement = (name) => {
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = name;

    return cardText;
};

async function renderCards() {
    try {
        const res = await fetch("assets/json/docs.json");
        const docs = await res.json();

        const cardsContainer = document.querySelector("#cardsContainer");

        for (let index = 0; index < docs.length; index++) {
        const { id, name, url, texts } = docs[index];

        const card = createCardElement();
        const innerCard = createInnerCardElement(id);
        const image = createCardImgElement(id, url, name);
        const cardBody = createCardBodyElement();
        const cardText = createCardTextElement(name);

        cardBody.append(cardText);
        innerCard.append(image, cardBody);
        card.append(innerCard);
        cardsContainer.append(card);
        }
    } catch (err) {
        console.error(err);
    }
}

window.addEventListener("load", renderCards);