login_btn = document.getElementById("login-btn")
signup_btn = document.getElementById("signup-btn")

username = document.getElementById("username")
password = document.getElementById("password")



login_btn.addEventListener("click" , function(){
    if (username.value == "Soham") {
        if (password.value == "Soham") {
            localStorage.setItem("username", "Soham")
            window.location.href = "./assets.html"
        }
    }
})

signup_btn.addEventListener("click", function() {
    if (username.value && password.value) {
        localStorage.setItem("username" , username.value)
        window.location.href = "./assets.html"
    }
})