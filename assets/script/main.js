const $cardList = document.querySelector("#product-card-list");
const $addForm = document.querySelector(".add-product-form");
const $updateForm = document.querySelector(".update-product-form");
const $addProductBtn = document.querySelector("#add-product-btn")
const $updateProductBtn = document.querySelector("#update-product-btn")
const $swipper = document.querySelector(".swiper")


$addProductBtn.addEventListener("click", () => {
    $addForm.classList.toggle("show")
    $updateForm.classList.toggle("shrink")
    $swipper.classList.toggle("top")
})

$updateProductBtn.addEventListener("click" ,() => {
    $updateForm.classList.toggle("show")
    $addForm.classList.toggle("shrink")
    $swipper.classList.toggle("top")
})


//  show Product's

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

//  Update product's


const updateProduct =  (e) => {
  e.preventDefault();


  const children = $updateForm.children;
  const updateProduct ={
   id:  children[0].value,
   image: children[1].value,
   title: children[2].value,
   price: children[3].value,
   discount: children[4].value,
  }

 

  fetch(`https://6662ac4162966e20ef097175.mockapi.io/api/products/products/${updateProduct.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(updateProduct)
  })
  
    .then(res => res.json())
    .then(data => {
        console.log("update product:", data);
        loadFetch();
    })
    .catch(error => console.error("Error:", error));
}

const resetUpdateForm = () => {
  const inputs = $updateForm.querySelectorAll('input[type="text"], input[type="url"]');
  inputs.forEach(input => input.value = '');
};

$updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  updateProduct(e);
  resetUpdateForm();
});


//  Add new product's

const addProduct = (e) => {
    e.preventDefault();
    const children = $addForm.children;
    const product = {
        image: children[0].value,
        title: children[1].value,
        price: children[2].value,
        discount: children[3].value
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


const resetAddForm = () => {
  const inputs = $addForm.querySelectorAll('input[type="text"], input[type="url"]');
  inputs.forEach(input => input.value = '');
};

$addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addProduct(e);
  resetAddForm();
});



// swiper

const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
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
