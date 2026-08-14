let show_contaniner = document.getElementById("show_contaniner")
let product_id = document.getElementById("id");
let title = document.getElementById("title");
let description = document.getElementById("description");
let img = document.getElementById("img");
let category = document.getElementById("category");
let price = document.getElementById("price");
let add_product_btn = document.getElementById("add_product_btn");
let search = document.getElementById("search");
let categories = document.querySelectorAll("#categories button")
let storedata = null
let idData = null

let getData = () => {
    fetch("https://fakestoreapi.com/products").then((res) => res.json())
        .then((data) => {
            storedata = data
            showAllData()
        }).catch((err) => {
            console.log(`this is error ${err}`)
        })
}

function getDataById(el) {
    console.log(el.id);
    fetch(`https://fakestoreapi.com/products/${el.id}`)
        .then((response) => response.json())
        .then((product) => {
            idData = product
            showDataById()
        });


}

let showAllData = (arr = storedata) => {
    show_contaniner.innerHTML = ""
    arr.forEach((element) => {
        let card = `<div class="product_card" id = ${element.id} onclick= getDataById(this)>
        <img src = ${element.image} class="product_img" />
        <h4>${element.title}</h4>
        <h4>${element.price}</h4>
        </div>
        `
        show_contaniner.innerHTML += card
    });

}
let showDataById = () => {
    show_contaniner.innerHTML = ""

    let card = `<div class="single_product">
        <div class="single_product_image">
            <img src="${idData.image}" class="product_img" />
        </div>
        <div class="single_product_info">
            <h4 class="single_product_title">${idData.title}</h4>
            <h4 class="single_product_price">$${idData.price}</h4>
            <p class="single_product_category">${idData.category}</p>
            <p class="single_product_description">${idData.description}</p>
            <button class="back_button" onclick="getData()">Back to Home</button>
        </div>
    </div>
        `
    show_contaniner.innerHTML += card
};

categories.forEach((button) => {
    button.addEventListener("click", (event) => {
        let category = event.target.dataset.category;

        if (category == "all") {
            showAllData()
            return
        }

        let filtered = storedata.filter((elemenet) => elemenet.category === category)
        showAllData(filtered)
    })
})

let search_bar = (event) => {
    let val = event.target.value.toLowerCase()
    let filtered = storedata.filter((element) => element.title.toLowerCase().includes(val))
    showAllData(filtered)
}

let addproduct = () => {
    let product = {
        id: Number(product_id.value),
        title: title.value,
        description: description.value,
        price: Number(price.value),
        category: category.value,
        image: img.value,
    }

    fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product)
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            alert("product add succesfully")

            storedata.push(data)

            showAllData()
        }).catch((err) => {
            console.log(`this is error ${err}`)
        })
}

add_product_btn.addEventListener("click", addproduct);
search.addEventListener("input", search_bar)
getData()
