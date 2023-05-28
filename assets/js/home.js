const navigate = (docID) => {
    const url = window.location.href.substring(0, window.location.href.lastIndexOf("/"));
    const path = `${url}/document.html?id=${docID}`
    window.location.assign(path)
}

async function renderCards() {
    try {
        const res = await fetch("assets/json/docs.json");
        const docs = await res.json();

        const cardsContainer = window.document.querySelector("#cardsContainer");
        const url = window.location.href.substring(0, window.location.href.lastIndexOf("/"));
        const imgPath = `${url}/assets/img/docs`;

        for (let index = 0; index < docs.length; index++) {
            const doc = docs[index];

            const card = document.createElement("div");
            card.classList.add("col-xxl-4", "col-md-6", "d-flex", "justify-content-center");
            card.onclick = function() {
                navigate(doc.id);
            };

            const innerCard = document.createElement("div");
            innerCard.classList.add("card", "h-100", "myCardStyle");
            innerCard.style.width = "18rem";

            const image = document.createElement("img");
            image.classList.add("card-img-top", "img-fluid");
            image.style.width = "100%";
            image.style.height = "175px";
            image.src = `${imgPath}/320/image${doc.id}.avif`;
            if(!image.src) image.src = doc.url
            image.alt = `${doc.name} image`;
            if(index >= 2) image.loading = "lazy";

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const cardText = document.createElement("p");
            cardText.classList.add("card-text");
            cardText.textContent = doc.name;

            cardBody.appendChild(cardText);
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