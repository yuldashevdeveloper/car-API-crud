const btnEl = document.querySelector(".nav_btn")
const moduleEl = document.querySelector(".module")
const btnCLose = document.querySelector(".btn_close")


btnEl.addEventListener("click",() =>{
    moduleEl.classList.add("show")
})

btnCLose.addEventListener("click",() =>{
    moduleEl.classList.remove("show")
})

const API_URL = "https://6852a7200594059b23ce857f.mockapi.io"

async function fetchData(endpoint,callback) {
    try{
        const response = await fetch(`${API_URL}${endpoint}`,{method:"GET"})
        const data = await response.json()
        callback(data)
    }catch(err){
        console.log(err);
        
    }
    
}

window.onload = ()=>{
    fetchData("car",createCard)
}

const wrapperEl = document.querySelector(".wrapper")
function createCard(data){
    const fr = document.createDocumentFragment()
    data.forEach((car)=>{
        const div = document.createElement("div")
        div.classList.add("card")
        div.innerHTML = `
        <img src=${car.image} alt="">
            <h3>${car.name}</h3>
            <p>${car.brand}</p>
            <p>${car.guarantee}</p>
            <strong>${car.price}</strong>
            <button data-id=${car.id} name="delete-btn">delete</button>
        `
        fr.appendChild(div)
    })

    wrapperEl.appendChild(fr)
}


const inputNameEl = document.querySelector(".input_name")
const inputPriceEl = document.querySelector(".input_price")
const inputBrandEl = document.querySelector(".input_brand")
const inputGuarantEl = document.querySelector(".input_guarant")
const inputImageEl = document.querySelector(".input_image")
moduleEl.addEventListener("submit", (event) => {
    event.preventDefault()
    let newBlog = {
        name: inputNameEl.value, 
        price: Number(inputPriceEl.value), 
        brand:inputBrandEl.value ,
        image:inputImageEl.value,
        guarant:inputGuarantEl,
    }

    fetch(`${API_URL}/car`,{
        method:"POST",
        body:JSON.stringify(newBlog),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res =>{
        inputNameEl.value = ""
        inputPriceEl.value = ""
        inputBrandEl.value = ""
        inputGuarantEl.value = ""
        inputImageEl.value = ""
        wrapperEl.innerHTML = null
        moduleEl.classList.remove("show")
        fetchData("/car",createCard)
    })
    
})

wrapperEl.addEventListener("click",(event)=>{
    if(event.target.name ==="delete-btn"){
       if(confirm("are you sure?")){
        const id = event.target.dataset.id
        fetch(`${API_URL}/car/${id}`,{method:"DELETE"})
            .then(()=>{
                wrapperEl.innerHTML = null
                fetchData("car",createCard)
            })
       }
    }
})