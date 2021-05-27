const form = document.getElementById('form_id');
// localStorage.setItem("user_id",'3FJdT681qROPRUZ8bCN5');
var userID;
var localID;
localID = localStorage.getItem('user_current');
// find the user name of that id 
db.collection('user').get().then((snap) => {
    snap.docs.forEach(doc => {
        if (doc.id == localID) {
            // console.log(doc.data().Name)
            userID = doc.data().user_fullName;
            form.product_user.value = userID;
        }
    })
});


// getting the data from the fireStore and show it in the console, "just for checking.."
db.collection('posting').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        // console.log(doc.data().product_name)
    });
})

// Posting the data we add from the form to the firestore data base at posting collection
form.addEventListener('submit', (e) => {
    e.preventDefault();
    var opt = document.getElementById("processType");
    var x = [];
    for (var op of opt.options) {
        if (op.selected) {
            x.push(op.value)
        }
    }


    db.collection('posting').add({
        product_name: form.product_name.value,
        product_category: form.product_category.value,
        process_type: x,
        product_type: form.product_type.value,
        product_color: form.product_color.value,
        product_price: form.product_price.value,
        product_image: form.product_image.value,
        product_desc: form.product_desc.value,
        user_id: localID

    })
    window.location.replace("http://localhost:5500/dashboard/dashboard.html");

});

