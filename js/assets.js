const add_btn = document.querySelector(".add_btn")
const main_cont = document.querySelector(".assets")
const inp_crypto = document.querySelector(".crypto")
const inp_value = document.querySelector(".amount")
const invis = document.querySelector(".invis")
var del_btns = document.getElementsByClassName("del_btn")




function clearAssets(){
    console.log("clearing Assets")
    for (var i = 0; i < main_cont.children.length; i++) {
        if (main_cont.children[i].id == "invis"){} else {
            main_cont.children[i].remove()
        }
    }  
}


function createAsset(crypto,value){
    console.log("creating asset")
    const asset_cont = document.createElement("div")
        main_cont.insertBefore(asset_cont,invis)
        asset_cont.classList.add("inp_field")
        asset_cont.classList.add("asset_margin")

        const crypto_div = document.createElement("div")
        const crypto_label = document.createElement("p")
        crypto_div.appendChild(crypto_label)
        asset_cont.appendChild(crypto_div)

        crypto_div.classList.add("asset_crypto")
        crypto_label.textContent = crypto
        crypto_label.classList.add("crypto_text")


        const value_div = document.createElement("div")
        const value_label = document.createElement("label")
        value_div.appendChild(value_label)
        asset_cont.appendChild(value_div)
        value_div.classList.add("amount")
        value_label.textContent = value
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

        edit_btn.addEventListener("click" , function(){
            const amount_div = edit_btn.parentElement.children[1]
            console.log("Click Recieved")
            const edit_inp = document.createElement("input")
            edit_inp.classList.add("amount")
            edit_inp.classList.add("editing_border")
            asset_cont.appendChild(edit_inp)
            asset_cont.insertBefore(edit_inp,amount_div)
            amount_div.remove()
            edit_inp.setAttribute("type","number")
            edit_inp.setAttribute("placeholder","Press Enter to Save")
            edit_inp.focus()
            edit_inp.select()
            edit_inp.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    const value_div = document.createElement("div")
                    const value_label = document.createElement("label")
                    value_div.appendChild(value_label)
                    asset_cont.appendChild(value_div)
                    value_div.classList.add("amount")
                    localStorage.setItem(crypto,edit_inp.value)
                    value_label.textContent = edit_inp.value
                    value_label.classList.add("crypto_text")
                    asset_cont.insertBefore(value_div,edit_inp)
                    edit_inp.remove()
                    
                }
            })
        })
        del_btn.addEventListener("click",function(){
            localStorage.removeItem(crypto)
            console.log(localStorage)
            del_btn.parentElement.remove()
        })
}

function loadAssets() {
    console.log("loading assets")
    clearAssets()
    Object.keys(localStorage).forEach(key => {
        createAsset(key,localStorage.getItem(key))
    });
}

function updateAssets() {
    console.log("Updating assets")
    clearAssets()
    console.log("cleared assets")
    loadAssets()
    console.log("loaded assets")
}

window.onload = function() {
    loadAssets()
    console.log("loaded assets onload")
}


add_btn.addEventListener("click", function() {
    if (inp_value.value && !(inp_value.value == 0)) {
        if (!(localStorage.getItem(inp_crypto.value))){
            window.localStorage.setItem(inp_crypto.value,inp_value.value)
            createAsset(inp_crypto.value,inp_value.value)
            console.log(localStorage)
        } else {
            console.log("key alr exists")
            localStorage.setItem(inp_crypto.value , +localStorage.getItem(inp_crypto.value)+(+inp_value.value))
            console.log(localStorage.getItem(inp_crypto.value))
            updateAssets()
        }
    }
})