var form = document.getElementById("formk");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('user').add({
        user_userName: form.user_name.value,
        user_password: form.user_password.value,
        user_mail: form.user_mail.value,
        user_fullName: form.user_full_name.value,
        user_phoneNumber: form.user_phone.value
    });
    window.location.replace("../signIn/sign_in.html");
});