//PRODUCTOS
const productos = [
    //Aceites
    {
        id:"aceite-01",
        titulo: "MS-150",
        imagen:"img/p1-moto.jpg",
        categoria:{
            nombre: "Aceite para motos",
            id: "motos"
        },
        precio: 1100
    },
    {
        id:"aceite-02",
        titulo: "MS-160",
        imagen:"img/p2-moto.jpg",
        categoria:{
            nombre: "Aceite para motos",
            id: "motos"
        },
        precio: 1200
    },
    {
        id:"aceite-03",
        titulo: "MS-170",
        imagen:"img/p1-auto.jpg",
        categoria:{
            nombre: "Aceite para autos",
            id: "autos"
        },
        precio: 1300
    },
    {
        id:"aceite-04",
        titulo: "MS-180",
        imagen:"img/p2-auto.jpg",
        categoria:{
            nombre: "Aceite para autos",
            id: "autos"
        },
        precio: 1400
    },
    {
        id:"aceite-05",
        titulo: "MS-190",
        imagen:"img/p3-auto.jpg",
        categoria:{
            nombre: "Aceite para autos",
            id: "autos"
        },
        precio: 1500
    },
    {
        id:"aceite-06",
        titulo: "MS-200",
        imagen:"img/p1-camion.jpg",
        categoria:{
            nombre: "Aceite para camiones",
            id: "camiones"
        },
        precio: 1600
    },
    {
        id:"aceite-07",
        titulo: "MS-500",
        imagen:"img/p2-camion.jpg",
        categoria:{
            nombre: "Aceite para camiones",
            id: "camiones"
        },
        precio: 2000
    },
];


//Variables
/*Tener cuidado "." o "#" id o clase*/
/*Iniciar todas las variables al inicio por que se pueden llamar funciones desde el final del codigo*/
const contenedorProductos = document.querySelector("#contenedor-productos");

const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");

let botonesAgregar = document.querySelectorAll(".producto-agregar");

const numerito = document.querySelector(".numerito");


//Funcion 1
function cargarProductos(arrayProductosElegidos){

    contenedorProductos.innerHTML="";

    arrayProductosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = 
        `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">S/. ${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}"> Agregar</button>
        </div>
        `;
/* de la clase producto se extra esto para insertar en la funcion
<div class="producto">
    <img class="producto-imagen" src="../img/producto 1 aceite para auto.jpg" alt="">
    <div class="producto-detalles">
        <h3 class="producto-titulo">Abrigo 1</h3>
        <p class="producto-precio">$1000</p>
        <button class="producto-agregar">Agregar</button>
    </div>
</div>*/

        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
    console.log(botonesAgregar);
}
cargarProductos(productos);


//Funcion 2. Boton categoria y cambio de titulo
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            
            tituloPrincipal.innerHTML=productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);    
        } else {
            tituloPrincipal.innerHTML="Todos los productos";
            cargarProductos(productos);
        }
        
    })
});


//Funcion 3. 
function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}


let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else{
    productosEnCarrito = [];
}

function agregarAlCarrito (e){    
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
       const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
}

//Funcion 4. Numerito
function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad, 0);
    numerito.innerText=nuevoNumerito;
}






