// Getting HTML Elements 
const productList = document.getElementById("product-details");
const image = document.getElementById("img");
const name = document.getElementById("name");
const color = document.getElementById("color");
const price = document.getElementById("price");
const seller = document.getElementById("sellerName");
const description = document.getElementById("desc");
const category = document.getElementById("cat");
const productType = document.getElementById("pType");
const type = document.getElementById("type");
const offerSection = document.getElementById("offerSection");
const exImage = document.getElementById("ImageUrl");
const exType = document.getElementById("pExchangeType");
const exDescription = document.getElementById("pExchangeDesc");
const secretID = document.getElementById("secretID");

// Variables
var user_id;
var user_name;
var offer_type;


//Getting Customer Id
// const customer_id = localStorage.getItem("user_id");
const customer_id = localStorage.getItem("user_current");
// localStorage.setItem("product_id", "QuuZQv4NLRRfgi2Mrc7Z");
//localStorage.setItem("product_id", "BFkWDHIlWPMC8nXy8JWz");
const pID = localStorage.getItem("ProductID");
console.log(pID);
// k7ErU5PTGuTYaGSQ9nfS
// jvLis4CZK0mrNKjioIYf

// //Getting Product Data
// db.collection("posting").doc(pID).get().then((doc) => {
//     if (doc.exists) {
//         user_id = doc.data().user_ID;
//         renderProduct(doc);
//         getOfferType(doc);
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });

//#region Getting Product Data {Sherif}

db.collection("posting").doc(pID).get().then((doc) => {
    if (doc.exists) {
        debugger;
        renderProduct(doc);
        getOfferType(doc);
        return user_id = doc.data().user_id;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).then((user_id) => {
    //Getting User Name
    // const user_id=localStorage.getItem("user_id");
    db.collection("user").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            // debugger;
            if (doc.id == user_id) {
                user_name = doc.data().user_fullName;
                seller.innerHTML += user_name;
                // console.log(user_name);
            };
        });
    });
}).catch((error) => {
    console.log("Error getting document:", error);
});

//#endregion



// Setting Data
function renderProduct(doc) {
    // debugger;
    image.src = doc.data().product_image;
    name.innerHTML += doc.data().product_name;
    color.innerHTML += doc.data().product_color;
    price.innerHTML += doc.data().product_price;
    description.innerHTML += doc.data().product_desc;
    category.innerHTML += doc.data().product_category;
    productType.innerHTML += doc.data().product_type;
}

// Getting Offer Types To Choose From
function getOfferType(doc) {
    var pArr = doc.data().process_type;
    for (let p = 0; p < pArr.length; p++) {
        var b = document.createElement("button");
        b.className = "btn btn-dark";
        if (pArr[p] == "sell" || pArr[p] == "Sell") {
            b.textContent = "Buy";
        }
        else {
            b.textContent = pArr[p];
        }
        b.value = pArr[p];
        b.id = pArr[p];
        offerSection.appendChild(b);
        if (p < pArr.length - 1) {

            offerSection.innerHTML += `&nbsp  Or &nbsp`;
        }
    }
    exchangeProduct();
}

// OnPressing Exchange
function exchangeProduct() {
    for (let i = 0; i < offerSection.querySelectorAll("button").length; i++) {
        offerSection.querySelectorAll("button")[i].onclick = function () {
            if (this.id == "exchange" || this.id == "Exchange") {
                this.setAttribute("data-toggle", "modal");
                this.setAttribute("data-target", "#myModal");
                offer_type = 'exchange';
            }
            else if (this.id == "sell" || this.id == "Sell") {
                this.setAttribute("data-toggle", "modal");
                this.setAttribute("data-target", "#myModal2");
                offer_type = 'sell';
            }
        }
    }
}

// Confirm Offer
function confirmExchange() {

    //Confirm when exchange
    if (offer_type == 'exchange')
        db.collection('offer').add({
            exchange_type: exType.value,
            exchange_image: exImage.value,
            exchange_description: exDescription.value,
            customer_id: customer_id,
            offer_type: offer_type
        }).then((docRef) => {
            // console.log(docRef.id);
            return secretID.innerHTML = docRef.id;
        }).then((secID) => {
            try {
                db.collection('posting').doc(pID).update({
                    offersArray: firebase.firestore.FieldValue.arrayUnion(secID)
                });
            }
            catch {
                db.collection('posting').doc(pID).add({
                    offersArray: [secID]
                });
            };
        }).then(() => {
            alert("Your Offer has been confirmed ☻");
        });

    //Confirm when sell
    else if (offer_type == 'sell') {
        db.collection('offer').add({
            customer_id: customer_id,
            offer_type: offer_type
        }).then((docRef) => {
            // console.log(docRef.id);
            return secretID.innerHTML = docRef.id;
        }).then((secID) => {
            try {
                db.collection('posting').doc(pID).update({
                    offersArray: firebase.firestore.FieldValue.arrayUnion(secID)
                });
            }
            catch {
                db.collection('posting').doc(pID).add({
                    offersArray: [secID]
                });
            };
        }).then(() => {
            alert("Your Offer has been confirmed ☻");
        });
    };
};