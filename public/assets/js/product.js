function getQueryParams(){
    const query = window.location.search

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
  
async function renderDoc(){
    try{
        const res = await fetch("assets/json/products.json")
        const products = await res.json()

        const params = getQueryParams()
        const id = params.id
        const url = window.location.href.substring(0, window.location.href.lastIndexOf("/"));
        //const path = `${url}/assets/img`;

        const product = products[id-1]

        const productName = window.document.querySelector("#product_name");
        productName.innerText = product.name

        const productSummary = window.document.querySelector("#product_summary");
        productSummary.innerText = product.summary;

        const productPrice = window.document.querySelector("#product_price")
        productPrice.textContent = `R$${product.price}`.replace(".",",");

        const productImg = window.document.querySelector("#product_img");
        productImg.setAttribute("src", product.url);
        /*docImg.setAttribute("srcset", `
            ${path}/320/image${doc.id}.avif 320w,    
            ${path}/480/image${doc.id}.avif 480w,    
            ${path}/768/image${doc.id}.avif 768w,    
            ${path}/992/image${doc.id}.avif 992w,    
            ${path}/1200/image${doc.id}.avif 1200w    
        `);*/
        
        const productDescription = window.document.querySelector("#product_description");
        productDescription.innerText = product.description
    }catch(err){
        console.error(err)
    }
}

window.addEventListener("load", renderDoc);