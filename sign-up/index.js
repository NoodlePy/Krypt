login_btn = document.getElementById("login-btn")
signup_btn = document.getElementById("signup-btn")

username = document.getElementById("username")
password = document.getElementById("password")



login_btn.addEventListener("click" , function(){
    if (username.value == "Soham") {
        if (password.value == "Soham") {
            window.location.href = "../assets"
        }
    }
})

signup_btn.addEventListener("click", function() {
    if (username.value && password.value) {
        window.location.href = "../assets"
    }
})