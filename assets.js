const add_btn = document.querySelector(".add_btn")
const main_cont = document.querySelector(".assets")
const inp_crypto = document.querySelector(".crypto")
const inp_value = document.querySelector(".amount")
const invis = document.querySelector(".invis")
var edit_btns = document.getElementsByClassName("edit")
console.log(edit_btns)
var del_btns = document.getElementsByClassName("del_btn")









add_btn.addEventListener("click", function() {
    if (inp_value.value && !(inp_value.value == 0)) {
        const asset_cont = document.createElement("div")
        main_cont.insertBefore(asset_cont,invis)
        asset_cont.classList.add("inp_field")
        asset_cont.classList.add("asset_margin")

        const crypto_div = document.createElement("div")
        const crypto_label = document.createElement("p")
        crypto_div.appendChild(crypto_label)
        asset_cont.appendChild(crypto_div)

        crypto_div.classList.add("asset_crypto")
        crypto_label.textContent = inp_crypto.value
        crypto_label.classList.add("crypto_text")


        const value_div = document.createElement("div")
        const value_label = document.createElement("label")
        value_div.appendChild(value_label)
        asset_cont.appendChild(value_div)
        value_div.classList.add("amount")
        value_label.textContent = inp_value.value
        value_label.classList.add("crypto_text")

        const edit_btn = document.createElement("button")
        asset_cont.appendChild(edit_btn)
        edit_btn.innerHTML = `<img src="edit.png" class="edit_img"></img>`
        edit_btn.classList.add("edit")
        
        const del_btn = document.createElement("button")
        del_btn.classList.add("del_btn")
        asset_cont.appendChild(del_btn)
        del_btn.innerHTML = `<img src="del.png" class="del_img"></img>`

        main_cont.insertBefore(invis,asset_cont)
    }
})