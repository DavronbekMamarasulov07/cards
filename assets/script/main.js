const $cardList = document.querySelector("#product-card-list")
const $caruselList = document.querySelector(".swiper-wrapper")


const renderImages = (data) => {
    data.forEach( item => {
        $caruselList.innerHTML += `
            <div class="swiper-slide">
                <img src="${item.image}"/>
            </div>
        `;
    });
}




const caruselImage = () => {
    fetch("https://picsum.photos/v2/list?page=2&limit=10") // 10 ta tasvir
        .then(res => res.json())
        .then(data => renderImages(data))
        .catch(error => console.error('Xato:', error));
}
caruselImage()




const renderProduct = (data) =>{
    $cardList.innerHTML =""
    const $productfragment = document.createDocumentFragment()
    data.forEach(product => {
        const $div = document.createElement("div")
        $div.className = "product-card" 
        $div.innerHTML =`
            <img src="${product.image}"/>
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <strong>$${product.price} <span>${product.discount}%</span></strong>
        `
        $productfragment.appendChild($div)

    });
    $cardList.append($productfragment)
}

const addProduct = () => {
    fetch('https://6662ac4162966e20ef097175.mockapi.io/api/products/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            image:"https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
            title: 'Burger',
            description:"A hamburger, also called a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll. ",
            price:"12",
            discount:"13"

        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        loadFetch();
    })
    .catch(error => console.error('Xato:', error));
}

const loadFetch = () => {
    fetch("https://6662ac4162966e20ef097175.mockapi.io/api/products/products")
        .then(res => res.json())
        .then(data => renderProduct(data))
}

addProduct();


const progressCircle = document.querySelector(".autoplay-progress svg");
    const progressContent = document.querySelector(".autoplay-progress span");
    var swiper = new Swiper(".mySwiper", {
      loop: true,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
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

    