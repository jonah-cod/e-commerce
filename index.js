const category_url = "https://fakestoreapi.com/products/categories";
const products = "https://fakestoreapi.com/products";
const specific_category = "https://fakestoreapi.com/products/category";
const container = document.querySelector(".container")

let cart = JSON.parse(localStorage.getItem("cart"))
function setCounter(){
      let counter = document.querySelector(".counter")
      cart?.length? (counter.innerText = cart.length):(counter.innerText = 0)
      
}

setCounter()

// async function getCategories(){
// let categories = await fetch(category_url).then(res=>res.json())
// console.log(categories)
// }

// getCategories()

const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"]

// creating navbar for all the categories
async function createCategories(categories){
      const navBar = document.querySelector(".navbar");
      const navbar_list = document.createElement("ul");
      categories.map(category=> {
            let navbar_list_item = document.createElement("li")
            navbar_list_item.innerText = category
            navbar_list_item.addEventListener("click", async()=>{
                  let products = await getSpecificCategory(category)
                  displayProducts(products, container)
                 
            })
            navbar_list.appendChild(navbar_list_item)
      })

      navBar.appendChild(navbar_list);

}

createCategories(categories);

// // fetch from specific category
async function getSpecificCategory(text){
      let products_category = await fetch(`${specific_category}/${text}`).then(res=>res.json())
      return products_category;
}

//create a card for single product

function create_product(product, container){
      let product_ele = document.createElement("div");
      product_ele.classList.add("product");
      product_ele.innerHTML = `<img src=${product.image} alt="">
      <div class="details">
            <h6>${product.title}</h6>
            <p>category: ${product.category}</p>
            <p>Price: <span> $${product.price}</span></p>
            <button id=${product.id} onclick=addToCart(${product.id})>add to cart</button>
      </div>`
      container.appendChild(product_ele)
}


// mount products to dom
async function mountProducts(){
      
      let all_products = await fetch(products).then(res=>res.json())

      all_products.map(product=> create_product(product, container))
}

mountProducts()

function displayProducts(products, container){
      console.log(products)
      container.innerHTML = '';
      products.map(product=>create_product(product, container))
      
}


/// cart implementation
[,]
function addToCart(id){
      cart = JSON.parse(localStorage.getItem("cart"))
      let ifExists = cart?.find(product=>product.id===id)
      if (cart?.length) {
            if(ifExists){
                  let index = cart.findIndex(i => i.id === id)
                  let removedcart = cart.splice(index, 1);
                  
                  removedcart[0].quantity +=1;
                  cart.push(...removedcart)
                  localStorage.setItem("cart", JSON.stringify(cart))
                  setCounter()
            }else{
                  console.log("first")
                  cart.push({
                        id:id,
                        quantity:1
                  })
                  localStorage.setItem("cart", JSON.stringify(cart))
                  setCounter()
            }
      }else{
            let cart = []
            cart.push({
                  id:id,
                  quantity:1
            })
            localStorage.setItem("cart", JSON.stringify(cart))
            setCounter()
      }
      
}