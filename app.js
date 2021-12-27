import { datas } from './source.js';

const itemCount=document.querySelector(".items-count")
const itemCenter=document.querySelector(".item-center")
const itemsCart=document.querySelector(".cart-items")
const clearBtn=document.querySelector(".clearBtn")
const totalSpan=document.querySelector(".total")
let plusBtns=null;
let minusBtns=null;
let trashBtns=null
let additemBtns=[];
let text="";
let chosedItems=[];
let cartItemsData=null;
let chosenItemsId=[];
let arrOfIds2=[]
let chosenItemsIds=[]
let arrOfIds;
let oldData;

class Product{
    
    
    
}



class UI{


static loadProdocts(){
let savedItems=JSON.parse(localStorage.getItem("data"));
savedItems.forEach(item => {
    text+=`<div class="item" data-id=${item.id}>
<img src="images\\${item.img}" alt="product img">
<div class="item-desc">
    <h2>${item.name}</h2>
    <span>${item.price} $</span>
    <button class="item-btn ${item.id}" data-id=${item.id}>add item</button>
</div>
</div>`;
});
itemCenter.innerHTML=text;
additemBtns= [...document.querySelectorAll(".item-btn")]



chosenItemsIds=JSON.parse(localStorage.getItem("cartdata"))
if(chosenItemsIds){
    chosenItemsIds.forEach((e)=>{
    additemBtns[e.id-1].disabled=true
    additemBtns[e.id-1].innerText="added"
})}

}

static cartItemMaker(){
    plusBtns=null
    minusBtns=null
    trashBtns=null
    chosenItemsId=null;
    chosenItemsId=JSON.parse(localStorage.getItem("cartdata"))
    // console.log(chosenItemsId) 
    let txt='';
    let matched=null;
    if(chosenItemsId){
    chosenItemsId.forEach((item)=>{
    matched=datas.find(el=>{return el.id==item.id})
    txt+=`<div class="cart-item " data-id="${matched.id}">
            <img src="images\\${matched.img}" alt="item img">
            <div class="cart-item-desc">
            <h3>${matched.name}</h4>
            <span>${matched.price} $</span>
        </div>
        <div class="xcrement">
        <button><i class="fas fa-plus-square" data-id="${matched.id}"></i></button>
            <span class="item-count">${item.quan}</span>
            <button><i class="fas fa-minus-square" data-id="${matched.id}"></i></button>
            </div>
        <button><i class="fas fa-trash" data-id="${matched.id}"></i></button>
        </div>`
    })

    // console.log(matched)
       
    itemsCart.innerHTML=txt;
    let itemValue=[]
    let total
    let getItemsForTotalPrice=[...document.querySelectorAll(".cart-item")]
    getItemsForTotalPrice.forEach(e=>{
        let itemCount=[...[...e.childNodes][5].childNodes][3].innerText
        let itemPrice=[...[...e.childNodes][3].childNodes][3].innerText[0]
        itemValue.push(itemCount*itemPrice)
    })
        
     if(itemValue[0]){
        total=itemValue.reduce((a,b)=>{
        return a + b })
    }else{total=0}
    totalSpan.innerHTML=`total:${total}$` ;



    plusBtns=[...document.querySelectorAll(".fa-plus-square")]
    minusBtns=[...document.querySelectorAll(".fa-minus-square")]
    trashBtns=[...document.querySelectorAll(".fa-trash")]
    //   console.log(plusBtns,minusBtns)
    plusBtns.forEach(btn=>btn.addEventListener('click',(e)=>{
        let parElId=e.target.dataset.id
        let getdata=JSON.parse(localStorage.getItem('cartdata'))
        getdata.forEach(data=>{
        if(data.id==parElId){
            data.quan++;
            // console.log(getdata)
            localStorage.setItem("cartdata",JSON.stringify(getdata));
            UI.cartItemMaker()
        }})})) 
    minusBtns.forEach(btn=>btn.addEventListener('click',(e)=>{
        let parElId=e.target.dataset.id        
        let getdata=JSON.parse(localStorage.getItem('cartdata'))
        getdata.forEach(data=>{
        if(data.id==parElId && data.quan>1){
            data.quan--;
            // console.log(getdata)
            localStorage.setItem("cartdata",JSON.stringify(getdata));                UI.cartItemMaker()
            }})}))  
    trashBtns.forEach(btn=>btn.addEventListener('click',(e)=>{
        let parElId=e.target.dataset.id        
        let getdata=JSON.parse(localStorage.getItem('cartdata'))
        getdata.forEach(data=>{
        if(data.id==parElId){
            getdata.splice(getdata.indexOf(data),1)
            additemBtns.forEach(e=>{
                
                if(e.dataset.id==parElId){
                //     console.log(e)
                   e.disabled=false
                   e.innerText="add cart"
                }
            })
            localStorage.setItem("cartdata",JSON.stringify(getdata));                UI.cartItemMaker()
            }})
        // console.log(e.target)
        }))
        
}
    countSp()
    }
}

class Storage{
    static saveItems(){
        localStorage.setItem("data",JSON.stringify(datas));
        UI.loadProdocts()
    }
    


    // static loadChosen(){
        
    // }
    static saveChosen(e){
        arrOfIds=null;
        oldData=null;
        if(e){
        chosedItems.push({id:e,quan:1})
        // console.log(chosedItems)
        oldData=JSON.parse(localStorage.getItem('cartdata'))
        if(oldData){
            arrOfIds=[...new Set([...oldData,{id:e,quan:1}])]
            // console.log(arrOfIds)
            localStorage.setItem("cartdata",JSON.stringify(arrOfIds))
            UI.cartItemMaker()
            return
        }
        // console.log(chosedItems,"dd")
        localStorage.setItem("cartdata",JSON.stringify(chosedItems))
        UI.cartItemMaker()
    }
    }
}

document.addEventListener("DOMContentLoaded",Storage.saveItems())
document.addEventListener("DOMContentLoaded",UI.cartItemMaker())
additemBtns.forEach(e=>{
    e.addEventListener("click",(el)=>{
        el.target.disabled=true;
        el.target.innerText="added";
        // console.log(chosedItems)
        Storage.saveChosen(el.target.dataset.id)
        
    })
})

// count total price



//item count span
document.addEventListener('DOMContentLoaded',countSp)
function countSp(){
    let savedItems=JSON.parse(localStorage.getItem("cartdata"))
    if(savedItems){
    itemCount.innerHTML=savedItems.length
    return
}
    itemCount.innerHTML="0";
}


// clear button\/
clearBtn.addEventListener('click',()=>{
    
    localStorage.setItem("cartdata",JSON.stringify(null))
    itemsCart.innerHTML="";
    cartholder.style.top="-100vh";
    cart.style.top="-100%";
    document.body.style.overflow="auto";
    additemBtns.forEach((e)=>{
        e.disabled=false
        e.innerText="add item"
    })
countSp();
})



//start cart
const cart=document.querySelector(".cart")
const cartBtn=document.querySelector(".fa-shopping-cart")
const cartholder=document.querySelector(".cartholder")


cartBtn.addEventListener("click",()=>{
    cartholder.style.top="0";
    cart.style.top="50%";
    document.body.style.overflow="hidden";
})

cartholder.addEventListener("click",(e)=>{
let clickedClass=[...e.target.classList];
if(clickedClass=="cartholder"){
cartholder.style.top="-100vh";
cart.style.top="-100%";
document.body.style.overflow="auto"}
})

//end cart



// document.addEventListener("click",(e)=>console.log(e.target))
