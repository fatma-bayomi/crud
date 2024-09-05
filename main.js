let title = document.getElementById("title");
let price = document.getElementById("price");
let quantity = document.getElementById("quantity");
let category = document.getElementById("category");
let create = document.getElementById("create");

let mode='create';
let temp;
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

create.onclick = function () {
  let newpro = {
    title: title.value,
    price: price.value,
    quantity: quantity.value,
    category: category.value,
  };
  console.log(newpro);
  if (title.value!=''&&price.value!=''&&category.value!=''){
    if(mode==='create'){
    
      datapro.push(newpro)
  
}else{
datapro[temp]=newpro;
mode='create';
create.innerHTML='Create';
// quantity.style.display="block";
}
clearData();
  }
  
 
  localStorage.setItem("product", JSON.stringify(datapro));
  // clearData();
  showData();
};
function clearData() {
  title.value = "";
  price.value = "";
  quantity.value = "";
  category.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `<tr>
        <td>${datapro[i].title}</td>
        <td> ${datapro[i].price}</td>
        <td>${datapro[i].quantity}</td>
        <td>${datapro[i].category}</td>
     
      <td> <button onclick="update(${i})"  class="btn update">update</button></td> 
     <td> <button onclick="deleteData(${i})" class="btn delete"> delete</button></td>
      </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete=document.getElementById('deleteAll')
  if(datapro.length>0){
btnDelete.innerHTML=`<button onclick="deleteAll()" class='btn'> delete all</button> `
  }
  else{
    btnDelete.innerHTML=''
  }
}
showData();
function deleteData(i) {
console.log(i)
datapro.splice(i,1)
localStorage.product=JSON.stringify(datapro)
showData();
}

function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
    showData()

}
function update(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    category.value = datapro[i].category;
    quantity.value = datapro[i].quantity;
    create.innerHTML = 'update'; 
    mode='update';
    temp=i;
    scroll({
        top:0,
        behaviour:'smooth'
    })
}

let searchMode='title';
function getSearchMode(id){
  let search=document.getElementById("search")
if(id='searchbtn'){
  searchMode='title';
}
search.value='';
showData();
}
function searchData(value){
  let table='';
 if(searchMode=='title'){
  for(let i=0;i<datapro.length;i++){
    if(datapro[i].title.includes(value)){
      table += `<tr>
      <td>${datapro[i].title}</td>
      <td> ${datapro[i].price}</td>
      <td>${datapro[i].quantity}</td>
      <td>${datapro[i].category}</td>
   
    <td> <button onclick="update(${i})"  class="btn update">update</button></td> 
   <td> <button onclick="deleteData(${i})" class="btn delete"> delete</button></td>
    </tr>`;
    
    
    }
  }
 }
 document.getElementById("tbody").innerHTML = table;
}