const add_btn = document.querySelector(".add_btn")
const main_cont = document.querySelector(".assets")
const inp_crypto = document.querySelector(".crypto")
const inp_value = document.querySelector(".amount")
const invis = document.querySelector(".invis")



add_btn.addEventListener("click", function() {
    
    const asset_cont = document.createElement("div")
    main_cont.appendChild(asset_cont)
    asset_cont.classList.add("inp_field")
    asset_cont.classList.add("asset_margin")
    const crypto_label = document.createElement("label")
    asset_cont.appendChild(crypto_label)
    crypto_label.classList.add("crypto")
    crypto_label.textContent = inp_crypto.value
    const value_label = document.createElement("label")
    asset_cont.appendChild(value_label)
    value_label.classList.add("amount")
    value_label.textContent = inp_value.value
})