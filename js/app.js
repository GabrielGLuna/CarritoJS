const listaCursos = document.querySelector('#lista-cursos');
const tabla = document.querySelector('#lista-carrito tbody');

let carrito = [];

function getCurso(e){

    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const item = {}
        item.id = e.target.getAttribute('data-id');
        const padre = e.target.parentElement;
        item.name = padre.querySelector('h4').innerText;
        item.price = padre.querySelector('p span').innerText;
        item.image = padre.parentElement.querySelector('img').src;
        item.cantity = 1;
        // Verificar si el objeto existe
        addItem(item);
        showTable();
    }
}
function addItem(item){
    if(carrito.some(itemCarrito => item.id === itemCarrito.id)){
        /* carrito = carrito.map(itemCarrito => {
             if(itemCarrito.id === item.id){
                 itemCarrito.cantity++;
                 
                 return itemCarrito;
             } else {
                 return itemCarrito;
             }
         })*/
         carrito.forEach(itemCarrito => {
             if(itemCarrito.id === item.id){
                 itemCarrito.cantity ++;
             }
         });
     }else{
         carrito.push(item);
     }
     console.log(carrito);
}
function showTable(){
// Limpiar tabla
tabla.innerHTML = '';
//Iterar carrito insertar
carrito.forEach(item => {
    tabla.appendChild(createRow(item));
});
}
function createRow(item){
    const row = document.createElement('tr');
    let rowHTML = '';
    rowHTML += `<td><img src =" ${ item.image }" width = "100px"></td>`;
    rowHTML += `<td> ${ item.name } </td>`;
    rowHTML += `<td> ${ item.price } </td>`;
    rowHTML += `<td> ${ item.cantity } </td>`;
    const buttton = document.createElement('button');
    buttton.setAttribute('data-id', item.id);
    buttton.classList.add('btn');
    buttton.innerHTML = 'X';
    const td = document.createElement('td');
    td.appendChild(buttton);
    row.innerHTML = rowHTML;
    row.appendChild(td);
    return row;

}

function btnDEItem(e){
    if(e.target.classList.contains('btn')){
        const id = e.target.getAttribute('data-id');
        //eliminar del carrito}
        carrito = carrito.filter(itemCarrito => itemCarrito.id !== id);
        showTable();
    }
}

listaCursos.addEventListener('click', getCurso);
tabla.addEventListener('click', btnDEItem);