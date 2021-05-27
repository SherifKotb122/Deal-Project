// signout() function
function signout(){
    window.open("../signIn/sign_in.html","_self")
    localStorage.setItem('user_id',"");
}