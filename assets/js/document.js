const url = location.href.substring(0, location.href.lastIndexOf("/"));
const imgPath = `${url}/assets/img/docs`;

const getQueryParams = () => {
  const query = location.search;

  const params = {};
  const queryString = query.slice(1).split('&');
  for (const param of queryString) {
    const [key, value = ''] = decodeURIComponent(param).split('=');
    if (key.length) {
      params[key] = value;
    }
  }
  return params;
};

const createTitleElement = (name) => {
  const docTitle = document.createElement("h1");
  docTitle.classList.add("text-center", "my-5");
  docTitle.textContent = name;

  return docTitle;
};

const createImgElement = (id) => {
  return new Promise((resolve, reject) => {
    const docImg = document.createElement("img");
    docImg.classList.add("mb-5", "img-fluid");
    docImg.style.cssText = `
      width: 100%;
      height: 100%;
    `;
    docImg.srcset = `
      ${imgPath}/320/image${id}.avif 320w,
      ${imgPath}/480/image${id}.avif 480w,
      ${imgPath}/768/image${id}.avif 768w,
      ${imgPath}/992/image${id}.avif 992w,
      ${imgPath}/1200/image${id}.avif 1200w
    `;

    docImg.onload = () => resolve(docImg);
    docImg.onerror = reject;
  });
};

const createTextsElement = (texts) => {
  const divTexts = document.createElement("div");

  for (const textContent of texts) {
    const text = document.createElement("p");
    text.textContent = textContent;

    divTexts.append(text);
  }

  return divTexts;
};

const renderDoc = async () => {
  try {
    const res = await fetch("assets/json/docs.json");
    const docs = await res.json();

    const params = getQueryParams();
    const paramId = params.id;

    const doc = document.querySelector("#doc");
    const { name, texts, id } = docs[paramId - 1];

    const docTitle = createTitleElement(name);
    const docImg = await createImgElement(id);
    const docTexts = createTextsElement(texts);

    doc.append(docTitle, docImg, docTexts);
  } catch (err) {
    console.error(err);
  }
};

window.addEventListener("load", renderDoc);
