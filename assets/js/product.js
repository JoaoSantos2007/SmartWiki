const url = location.href.substring(0, location.href.lastIndexOf("/"));
const imgPath = `${url}/assets/img/products`;

const getQueryParams = () => {
    const query = location.search;

    var params = {};
    var queryString = query.slice(1).split('&');
    for (var i = 0; i < queryString.length; i++) {
        var param = queryString[i].split('=');
        var key = decodeURIComponent(param[0]);
        var value = decodeURIComponent(param[1] || '');
        if (key.length) {
            params[key] = value;
        }
    }
    return params;
}

const createProductNameElement = (name) => {
    const productName = document.createElement("h1");
    productName.classList.add("my-5")
    productName.textContent = name

    return productName
}

const createProductMainElement = () => {
    const productMain = document.createElement("div")
    productMain.classList.add("d-flex", "flex-column", "align-items-center", "flex-md-row", "justify-content-around", "w-100")

    return productMain
}

const createProductImgElement = (id) => {
    return new Promise((resolve, reject) => {
        const productImg = document.createElement("img");
        productImg.classList.add("me-md-5")
        productImg.style.cssText = `
            width: 350px;
            height: 350px;
        `;
        productImg.src = `${imgPath}/image${id}.avif`

        productImg.onload = () => resolve(productImg)
        productImg.onerror = () => reject
    })
}

const createProductInfoElement = () => {
    const productInfo = document.createElement("div")
    productInfo.classList.add("d-flex", "flex-column", "align-items-center", "align-items-md-start")

    return productInfo
}

const createProductSummaryElement = (summary) => {
    const productSummary = document.createElement("p")
    productSummary.classList.add("fs-4")
    productSummary.textContent = summary

    return productSummary
}

const createProductPriceElement = (price) => {
    const productPrice = document.createElement("p")
    productPrice.classList.add("fw-bold", "fs-2")
    productPrice.textContent = `R$${price.toFixed(2).replace(".", ",")}`;

    return productPrice
}

const createProductDescriptionElement = (description) => {
    const productDescription = document.createElement("p")
    productDescription.classList.add("fs-4", "mt-4")
    productDescription.textContent = description

    return productDescription
}

const createBuyProductBtnElement = () => {
    const btn = document.createElement("button")
    btn.classList.add("btn", "btn-success", "btn-secondary", "btn-lg", "w-75")
    btn.type = "button"
    btn.textContent = "Comprar"

    return btn
}

const renderProduct = async () => {
    try{
        const res = await fetch("assets/json/products.json")
        const products = await res.json()

        const productSection = document.querySelector("#productSection")
        const params = getQueryParams()
        const paramsId = params.id

        const { name, id, summary, price, description } = products[paramsId - 1]

        const productName = createProductNameElement(name)
        const productMain = createProductMainElement()
        const productImg = await createProductImgElement(id)
        const productInfo = createProductInfoElement()
        const productSummary = createProductSummaryElement(summary)
        const productPrice = createProductPriceElement(price)
        const productBuyBtn = createBuyProductBtnElement()
        const productDescription = createProductDescriptionElement(description)

        
        productInfo.append(productSummary)
        productInfo.append(productPrice)
        productInfo.append(productBuyBtn)

        productMain.append(productImg)
        productMain.append(productInfo)

        productSection.append(productName)
        productSection.append(productMain)
        productSection.append(productDescription)
    }catch(err){
        console.error(err)
    }
}

window.addEventListener("load", renderProduct);