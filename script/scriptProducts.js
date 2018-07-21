var products = productData;

// Sorting function
function compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || 
       !b.hasOwnProperty(key)) {
  	  return 0; 
    }
    const varA = a[key];
    const varB = b[key];    
      
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ? 
      (comparison * -1) : comparison
    );
  };
}

products.sort(compareValues("Product_Name"));

function productTemplate(products) {
  return `
    <div class="product">
      <img class="product-photo" src="${products.Photo}">
      <div>
        <a class="btn" href="#">add to cart</a>
        <i class="icon-heart far fa-heart"></i>
      </div>
      <h4 class="product-price">${products.Price}</h4>
      <h3 class="product-name">${products.Product_Name}</h3>
    </div>
  `;
}

document.getElementById("products").innerHTML = `
  <h1 class="app-title">Products (${products.length} results)</h1>
  ${products.map(productTemplate).join("")}
  <p class="footer">These ${products.length} pets were added recently. Check back soon for updates.</p>
`;

var like = document.querySelectorAll(".icon-heart");
var productsContainer = document.querySelector("#products");
productsContainer.addEventListener("click", function(e){
  e.target.classList.toggle("far");
  e.target.classList.toggle("fas");
});




