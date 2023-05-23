const url = window.location.href.substring(0, window.location.href.lastIndexOf("/"));

const navigate = (docID) => {
    const docPath = `${url}/product.html?id=${docID}`
    window.location.assign(docPath)
}

async function renderCards() {
    try {
        const res = await fetch("assets/json/products.json");
        const products = await res.json();

        const cardsContainer = window.document.querySelector("#cardsContainer");
        const imgPath = `${url}/assets/img/products`;

        for (let index = 0; index < products.length; index++) {
            const product = products[index];

            const card = document.createElement("div");
            card.classList.add("col-xxl-3", "col-md-4", "d-flex", "justify-content-center");
            card.onclick = function() {
                navigate(product.id);
            };

            const innerCard = document.createElement("div");
            innerCard.classList.add("card", "h-100", "myCardStyle");
            innerCard.style.width = "14rem";

            const image = document.createElement("img");
            image.classList.add("card-img-top", "img-fluid");
            image.style.width = "100%";
            image.style.height = "220px";
            image.src = `${imgPath}/image${product.id}.avif`;
            if(!image.src) image.src = product.url
            image.alt = `${product.name} image`;
            if(index >= 2) image.loading = "lazy";

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const cardPrice = document.createElement("h2");
            cardPrice.classList.add("card-text");
            cardPrice.textContent = `R$${product.price}`.replace(".",",");

            const cardSummary = document.createElement("p");
            cardSummary.classList.add("card-text","fs-6", "fw-normal");
            cardSummary.textContent = product.summary

            cardBody.appendChild(cardPrice);
            cardBody.appendChild(cardSummary);
            innerCard.appendChild(image);
            innerCard.appendChild(cardBody);
            card.appendChild(innerCard);
            cardsContainer.appendChild(card);
        }
    } catch (err) {
        console.error(err);
    }
}

window.addEventListener("load", renderCards);