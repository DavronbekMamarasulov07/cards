const $cardList = document.querySelector("#product-card-list");
const $form = document.querySelector(".add-product-form");






const renderProduct = (data) => {
    $cardList.innerHTML = "";
    const $productfragment = document.createDocumentFragment();
    data.forEach(product => {
        const $div = document.createElement("div");
        $div.className = "product-card";
        $div.innerHTML = `
            <img src="${product.image}"/>
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <strong>$${product.price} <span>${product.discount}%</span></strong>
        `;
        $productfragment.appendChild($div);
    });
    $cardList.appendChild($productfragment);
};

const loadFetch = () => {
    fetch("https://6662ac4162966e20ef097175.mockapi.io/api/products/products")
    .then(res => res.json())
    .then(data => renderProduct(data))
    .catch(error => console.error("Error", error));
};

loadFetch();

const addProduct = (e) => {
    e.preventDefault();
    const children = $form.children;
    const product = {
        image: children[0].value,
        title: children[1].value,
        description: children[2].value,
        price: children[3].value,
        discount: children[4].value
    };

    fetch("https://6662ac4162966e20ef097175.mockapi.io/api/products/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    .then(res => res.json())
    .then(data => {
        console.log("added new product:", data);
        loadFetch();
    })
    .catch(error => console.error("Error:", error));
};

$form.addEventListener("submit", addProduct);

const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    on: {
        autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
    }
});
