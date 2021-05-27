// @Todo: know which variable name to store in local storage as product id (2 functions)
// @Todo: put the where function within fetching data (the same 2 functions)
// @Todo: show num of results and could change page title to category name

// variables
const list = document.querySelector('#product_list');

const startPrice = document.querySelector('#start_price');
const endPrice = document.querySelector('#end_price');
const color = document.querySelector('#color');
const type = document.querySelector('#type');

const sell = document.querySelector('#sell');
const rent = document.querySelector('#rent');
const exchange = document.querySelector('#exchange');


// const category = 'clothes';
const category=localStorage.getItem("category")
console.log(localStorage.getItem("category"));

db.collection('posting').where('product_category', '==',category).get().then((snapshot) => {
    // create fragment to contain all products
    const fragment = document.createDocumentFragment();
console.log(snapshot.docs);
    snapshot.docs.forEach(doc => {
        const p_card = document.createElement('div');
        p_card.className = 'card my-5';
        p_card.setAttribute('style', 'width: 400px; border-radius: 50px 20px;');
        p_card.setAttribute('data-id', doc.id);

        // get product processes
        let processes = ``;
        for (const process of doc.data().process_type)
            processes += `[<span class="bg-light">${process}</span>] `;

        p_card.innerHTML = `
        <img class="card-img-top" height="300px" style=" padding:10px; border-radius: 50px 20px;"
            src="${doc.data().product_image}"
            alt="${doc.data().product_category}">
        <hr class="mx-4">
        <div class="card-body">
            <div class="row">
                <h4 class="card-title col">${doc.data().product_name}</h4>
                <p class="card-text col">${doc.data().product_type}</p>
            </div>
            <p class="card-text" style="color: ${doc.data().product_color};">${doc.data().product_color}</p>
            <div class="row">
                <div class="col">
                    <div>process-type:</div>
                    <div>
                        ${processes}
                    </div>
                </div>
                <p class="col">
                    ${doc.data().product_price}
                </p>
            </div>
        </div>`;

        fragment.appendChild(p_card);
    });

    list.appendChild(fragment);
});

list.addEventListener('click', product_clicked);

// clicklistener function
function product_clicked(e) {
    if (e.target.id == 'product_list') {
        return;
    }
    else {
        localStorage.setItem('ProductID', get_data_id(e.target));
        console.log(localStorage.getItem('ProductID'));
        location.assign('../ProductDetails/Product Details.html');
    }
}

// function with recursion to get data-id out of any card's child
function get_data_id(element) {
    if (element.getAttribute('data-id') != null)
        return element.getAttribute('data-id');
    else
        return get_data_id(element.parentElement);
}

document.querySelector('#btnFind').onclick = (e) => {
    e.preventDefault();

    
    db.collection('posting').where('product_category','==', category).get().then((snapshot) => {

        let docs = snapshot.docs;

        // start price filter
        if (startPrice.value != "") {

            // if used with =>{} insted of => only, I should write return inside {} to return each value pass the condition
            docs = docs.filter(doc => doc.data().product_price >= parseFloat(startPrice.value));
        }

        // end price filter
        if (endPrice.value != "") {

            // if used with =>{} insted of => only, I should write return inside {} to return each value pass the condition
            docs = docs.filter(doc => doc.data().product_price <= parseFloat(endPrice.value));
        }

        // color filter
        if (color.value != "") {

            // if used with =>{} insted of => only, I should write return inside {} to return each value pass the condition
            docs = docs.filter(doc => doc.data().product_color.toLowerCase() == color.value.toLowerCase());
        }

        // type filter
        if (type.value != "") {

            // if used with =>{} insted of => only, I should write return inside {} to return each value pass the condition
            docs = docs.filter(doc => doc.data().product_type.toLowerCase().includes(type.value.toLowerCase()));
        }

        // sell filter
        if (sell.checked) {

            // if used with =>{} insted of => only, I should write return inside {} to return each value pass the condition
            docs = docs.filter(doc => doc.data().process_type.toString().toLowerCase().includes(sell.value.toLowerCase()));
        }

        // rent filter
        if (rent.checked) {

            // if used with =>{} insted of => only, I should write return inside {} to return each value pass the condition
            docs = docs.filter(doc => doc.data().process_type.toString().toLowerCase().includes(rent.value.toLowerCase()));
        }

        // exchange filter
        if (exchange.checked) {

            // if used with =>{} insted of => only, I should write return inside {} to return each value pass the condition
            docs = docs.filter(doc => doc.data().process_type.toString().toLowerCase().includes(exchange.value.toLowerCase()));
        }

        // create fragment to contain all products
        const fragment = document.createDocumentFragment();

        // display filter results
        docs.forEach(doc => {
            const p_card = document.createElement('div');
            p_card.className = 'card my-5 rounded';
            p_card.setAttribute('style', 'width: 400px;');
            p_card.setAttribute('data-id', doc.id);

            // get product processes
            let processes = ``;
            for (const process of doc.data().process_type)
                processes += `[<span class="bg-light">${process}</span>] `;

            p_card.innerHTML = `
            <img class="card-img-top" height="400px"
                src="${doc.data().product_image}"
                alt="${doc.data().product_category}">
            <hr class="mx-4">
            <div class="card-body">
                <div class="row">
                    <h4 class="card-title col">${doc.data().product_name}</h4>
                    <p class="card-text col">${doc.data().product_type}</p>
                </div>
                <p class="card-text" style="color: ${doc.data().product_color};">${doc.data().product_color}</p>
                <div class="row">
                    <div class="col">
                        <div>process-type:</div>
                        <div>
                            ${processes}
                        </div>
                    </div>
                    <p class="col">
                        ${doc.data().product_price}
                    </p>
                </div>
            </div>`;

            fragment.appendChild(p_card);
        });

        list.innerHTML = "";
        list.appendChild(fragment);
    });
}