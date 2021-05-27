var i=0;
var i_offer=0; //itration on offers
var cln;
var cln_offer;
var iid="product-card-0";
var iido="offer-card-0";
var itm__offer;
document.getElementById("offer-card-0").style.display = "none";
var user_id= localStorage.getItem('user_current');
var offer_array=[];
//var user_id="3FJdT681qROPRUZ8bCN5";
//y5PFonNC0CKZjYamNMT8
const pdescription = document.getElementById("product-description-0");
const pimage = document.getElementById("product-img-0");
const pname = document.getElementById("product-title-0");
const pcolor = document.getElementById("product-color-0");
const ptype = document.getElementById("product-type-0");
const pcategory = document.getElementById("product-category-0");
const pprice = document.getElementById("product-price-0");

var uname=document.getElementById("user-name");
var umail=document.getElementById("user-email");
var uphone=document.getElementById("user-phone");


function renderDashboardProduct(doc) {
        itm = document.getElementById("product-card-0");
        cln = itm.cloneNode(true);
        cln.id="product-card-"+parseInt(i+1);
        iid="product-card-"+parseInt(i+1);

        document.getElementById("products").appendChild(cln);
//console.log(iid);
    var c = document.getElementById(iid).childNodes;
    var d1 = c[1].childNodes;
    var d2 = c[3].childNodes;
    var d2_2=d2[3].childNodes;
//    console.log(d2_2);
    
    d1[1].src = doc.data().product_image;
    d2[1].innerHTML += doc.data().product_name;
    d2_2[5].innerHTML += doc.data().product_price;
    d2_2[3].innerHTML += doc.data().product_color;
    d2_2[7].innerHTML += doc.data().product_type;
    d2_2[9].innerHTML += doc.data().product_category;
    d2_2[1].innerHTML += doc.data().product_desc;   
    i++;
}


function renderDashboardOffer(doc) {
  console.log(doc.data());
  iido="product-card-"+parseInt(i_offer+1);

//     itm_offer = document.getElementById("offer-card-0");
//     cln_offer = itm_offer.cloneNode(true);
//     cln_offer.id="offer-card-"+parseInt(i_offer+1);
//     iido="offer-card-"+parseInt(i_offer+1);
//     document.getElementById("offers").appendChild(cln_offer);

 var c = document.getElementById(offer_array[i_offer]).childNodes;
 //console.log(iido);
 var d1 = c[7].childNodes;
 var d2 = d1[1].childNodes;
 var card_1= d2[1].childNodes;

 card_1=card_1[1].childNodes;
 var card_2= d2[3].childNodes;
 card_2=card_2[1].childNodes;
   
 console.log(card_1);
 d2[1].style.display = "block";
//  d1[1].src = doc.data().product_image;
//if((doc.data().offer_type== "sell") ||(doc.data().offer_type== "exchange") ){
  
    card_1[3].innerHTML += doc.data().offer_type;
    
    if(doc.data().exchange_description!=undefined){
        card_1[5].innerHTML += doc.data().exchange_description;
    }

    if(doc.data().exchange_image!=undefined){
        card_1[1].src = doc.data().exchange_image;
    }
    else
    card_1[1].src="sell.jfif";
//}

// card_1[4].innerHTML = doc.data().offer_type;
// card_1[5].innerHTML = doc.data().offer_type;
// card_1[6].innerHTML = doc.data().offer_type;

// card_1[5].innerHTML = doc.data().offer_type;
// card_1[6].innerHTML = doc.data().offer_type;

// console.log(doc.data().offer_type);

 // d2_2[5].innerHTML += doc.data().exchange_image;
//  d2_2[3].innerHTML += doc.data().product_color;
//  d2_2[7].innerHTML += doc.data().product_type;
//  d2_2[9].innerHTML += doc.data().product_category;
//  d2_2[1].innerHTML += doc.data().product_desc;   

//  var d1 = c[1].childNodes;
//  console.log(d1);
//  var d2 = c[3].childNodes;
// var d2_2=d2[3].childNodes;
// d1[4].innerHTML += doc.data().offer_type;
// d1[6].innerHTML += doc.data().offer_type;

// document.getElementById(iido).style.display = "block";


// c[1].src = doc.data().exchange_image;
// d2_2[7].innerHTML += doc.data().exchange_type;
//alert(doc.data().exchange_description);
//  d2_2[1].innerHTML += doc.data().exchange_description;   
i_offer++;
}

function renderUserData(doc){
    uname.innerHTML += doc.data().user_fullName;
    umail.innerHTML += doc.data().user_mail;
    uphone.innerHTML += doc.data().user_phoneNumber;
}

db_product.collection("user").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {        
        if(doc.id==user_id){
            renderUserData(doc);
        }
    });
});


db_product.collection("posting").where('user_id', '==', user_id).get().then((snapshot) => {
// db_product.collection("posting").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderDashboardProduct(doc);
//       console.log(doc.data())       
       var offer_arr=doc.data().offersArray;
       if(offer_arr!=undefined)
       {
           offer_array.push(iid);
        console.log(offer_array);
//        console.log(offer_arr.length);

         for(let i=0;i<offer_arr.length;i++){
        //     console.log(offer_arr[i])
//        db_product.collection("offer").where('user_id', '==', user_id).get().then((snapshot) => {
            db_product.collection("offer").get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                     if(doc.id==(offer_arr[i])){
                        renderDashboardOffer(doc);
//                        console.log(doc.data())                    
                    }
                });
//            document.getElementById("offer-card-0").style.display = "none";
        });
        }
    }


 //       console.log(doc.data())
    });

    document.getElementById("product-card-0").style.display = "none";
});

// signout() function
function signout(){
    window.open("../signIn/sign_in.html","_self")
    localStorage.setItem('user_id',"");
}