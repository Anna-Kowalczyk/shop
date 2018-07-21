var sortOptions = data; //upload sorting options data
var productData = productData;  //upload products data
var productDataTemporary = productData;
var productsContainer;
var customSelect, selectElement, selectedOption, selectItems;
var dropdown, dropdownLabel, dropdownList, checkboxes;
var filterButton;

productsContainer = document.querySelector("#product-list");
displayProducts(productData);

/*function to display products*/
function displayProducts(productData) {
    productsContainer.innerHTML = `
    <div class="product-list">
      ${productData.map(productTemplate).join("")}
    </div>
    `;
}

/*product container template*/
function productTemplate(productData) {
    return `
    <div class="product">
      <img class="product-photo" src="${productData.Photo}">
      <hr />
      <div class="btns">
        <a class="btn" href="#">add to cart</a>
        <i class="icon-heart far fa-heart"></i>
      </div>
      <div class="product-price">$${productData.Price}</div>
      <div class="product-name">${productData.Product_Name}</div>
    </div>
  `;
}

/*append options elements to select element*/
customSelect = document.querySelector("#custom-select");
selectElement = customSelect.querySelector("#select");

function optionTemplate(sortOptions) {
  return `
  '<option value="${sortOptions.ID}">${sortOptions.Option_Name}</option>`;
}

selectElement.innerHTML = `
  ${sortOptions.map(optionTemplate).join("")}
`;

/*create a new span element that will display selected option*/
selectedOption = document.createElement("span");
selectedOption.setAttribute("class", "select-selected");
selectedOption.innerHTML = selectElement.options[0].innerHTML;
customSelect.appendChild(selectedOption);

/*create a new DIV that will contain the option list:*/
selectItems = document.createElement("DIV");
selectItems.setAttribute("class", "select-items select-hide");

/*create new divs corresponding to option elements*/
for (let j = 0; j < selectElement.length; j++) {

    let selectItemsOption = document.createElement("DIV");
    selectItemsOption.innerHTML = selectElement.options[j].innerHTML;

    /*when an item is clicked, update the original select box, selected item and sort the products*/
    selectItemsOption.addEventListener("click", function (e) {
        for (let i = 0; i < selectElement.length; i++) {
            if (selectElement.options[i].innerHTML == this.innerHTML) {
                selectedOption.innerHTML = this.innerHTML;
                let sameAsSelected = this.parentNode.getElementsByClassName("same-as-selected");
                for (let k = 0; k < sameAsSelected.length; k++) {
                    sameAsSelected[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
            }
        }
        selectedOption.click();
        sortProducts(productDataTemporary);
    });
    selectItems.appendChild(selectItemsOption);
}
customSelect.appendChild(selectItems);

/*function to sort the products*/
function sortProducts (productData) {
  let compareOption, desc = null;
  if (selectedOption.innerHTML === "price-high to low") {
      compareOption = "Price";
      desc = "desc";
  } else if (selectedOption.innerHTML === "price-low to high") {
      compareOption = "Price";
      desc = null;
  } else if (selectedOption.innerHTML === "average ratings") {
      compareOption = "Average_Rating";
      desc = "desc";
  } else if (selectedOption.innerHTML === "best seller") {
      compareOption = "Sold no.";
      desc = "desc";
  } else if (selectedOption.innerHTML === "featured") {
      compareOption = "Feature_Rating";
      desc = "desc";
  } else {
      compareOption = "Product_Name";
  }
  productData.sort(compareValues(compareOption, desc));
  displayProducts(productData);
}

// Sorting function
function compareValues(key, order = 'asc') {
    return function (a, b) {
        if (!a.hasOwnProperty(key) ||
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

/*when the select box is clicked open/close the select box*/
customSelect.addEventListener("click", function (e) {
    e.stopPropagation();
    selectItems.classList.toggle("select-hide");
    customSelect.classList.toggle("select-hide");
});

/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    selectItems.classList.add("select-hide");
    console.log("all");
}

productsContainer.addEventListener("click", function (e) {
    e.target.classList.toggle("far");
    e.target.classList.toggle("fas");
});

/*show/hide filter options*/
filterButton = document.querySelector("#filter-btn");
filterButton.addEventListener("click",function (e) {
  dropdown.classList.toggle("filter-open");
});

/*filter products based on type of product*/
dropdown = document.querySelector("#dropdown");
dropdownLabel = document.querySelector(".dropdown-label");
checkboxes = document.querySelectorAll(".check");
checkAll = document.querySelector(".check-all");
dropdownList = document.getElementById("dropdown-list");

/*when an item is clicked open/close dropdown with list of types of products*/
dropdown.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdown.classList.toggle("type-open");
});

checkAll.addEventListener("click",function() {

  if (checkAll.checked) {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked=true;
    }
  } else {
    for (let j = 0; j < checkboxes.length; j++) {
      checkboxes[j].checked=false;
    }
  }
});

/*when an item is clicked filter products based on checked checkboxes*/
dropdownList.addEventListener("click", function (e) {
    e.stopPropagation();
    productDataTemporary = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            for (let j = 0; j < productData.length; j++) {
                if (productData[j].Type===checkboxes[i].nextElementSibling.innerHTML){
                    productDataTemporary.push(productData[j]);
                }
            }
        }
    }

    displayProducts(productDataTemporary);
    sortProducts(productDataTemporary);
});
