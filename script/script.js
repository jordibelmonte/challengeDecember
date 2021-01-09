fetch("https://apipetshop.herokuapp.com/api/articulos")
.then(respuesta => respuesta.json())
.then(data => {
        programa(data)
        
    })

function programa(data){
    /* ---------- ALMACENO DATOS FILTRADOS ----------- */
    var datos = []    
    const contenedor = document.getElementById("juguetes") || document.getElementById("farmacia")

    for (var i =0; i<data.response.length; i++){

        if (document.getElementById("juguetes") && data.response[i].tipo == "Juguete"){
            datos.push(data.response[i])
        
        } else if(document.getElementById("farmacia") && data.response[i].tipo == "Medicamento"){
            datos.push(data.response[i])
            
        } 
    }
    crearCard(datos)
    agregarACarrito()


    function crearCard(datos){
            /* -------- RECORRO ARRAY DE OBJETOS --------*/
            for(var i= 0 ; i<datos.length; i++){  
                /* -------- CREO CARDS DE PRODUCTOS --------- */       
                const card = document.createElement("div")
                card.className = "outterCard"
                card.innerHTML = `<div class="image">
                <img src=${datos[i].imagen}>
                </div>
                <div class="productName">
                <h4>${datos[i].nombre}</h4>
                </div>
                <div class="productPrice">
                <p>$ ${datos[i].precio}</p>
                </div>
                <div class="stock">
                <p class="pocoStock"></p>
                </div>
                <div class="btnContainer">
                <button class="btnComprar">Comprar</button>
                </div>
                <div class="productDesc">
                <button class="list-item" id="${datos[i]._id}">Ver más</button>
                </div>`  
                /* -------- APEND CHILD AL CONTENEDOR PADRE ------- */
                contenedor.appendChild(card) 
                /* -------- ALMACENO EN UNA VARIABLE A LOS ELEMENTOS QUE LES AGREGO EL EVENTLISTENER ------ */
                var botones = document.getElementById(`${datos[i]._id}`)
                /* -------- AGREGO EL EVENTLISTENER Y EL TARGET DEL EVENTO --------- */
                botones.addEventListener('click', (e)=> {
                var idBoton = e.target.id
                /* -------- RECORRO EL ARRAY CON .MAP --------- */
                datos.map(item => {
                    if (item._id == idBoton){
                        var modal = document.getElementById("modal")
                        /* -------- ABRO MODAL AGREGANDO CLASE -------- */
                        modal.classList.add("active")
                        document.getElementById("title").innerHTML = `${item.nombre}`
                        document.getElementById("modalBody").innerHTML = `<div><img src=${item.imagen}><p>${item.descripcion}</p></div>`
                        /* -------- CIERRO MODAL BORRANDO CLASE --------- */
                        var botonCerrar= document.getElementById("close-button")
                        botonCerrar.addEventListener('click', () =>{
                            modal.classList.remove("active")
                            })
                        }
                    })        
                })
                /* -------- ALMECENO EN UNA VARIABLE LA CANT DE STOCK DE LOS ELEMENTOS -------- */
                var pocoStock = document.getElementsByClassName("pocoStock")
                if (datos[i].stock < 5){
                    pocoStock[i].innerHTML = `Quedan menos de ${datos[i].stock} unidades!!!`
                    pocoStock[i].classList.add("red")                
                } else {
                    pocoStock[i].innerHTML = `Quedan ${datos[i].stock} unidades`
                }
            }             
        }   
}


const nav= document.getElementById("boton")  
nav.addEventListener("click", e => {
    document.getElementById("top").classList.toggle("rotate")
    document.getElementById("middle").classList.toggle("rotate")
    document.getElementById("bottom").classList.toggle("rotate")
    document.getElementById("navigation").classList.toggle("cerrado")
    document.getElementById("nav").classList.toggle("cerrado")
    document.getElementById("header").classList.toggle("cerrado")
    document.getElementById("responsive").classList.toggle("cerrado")
    })
if (document.getElementById("contacto")){
    const send = document.getElementById("send")
    send.addEventListener("click", e => {
        var modal = document.getElementById("modal")
        modal.classList.add("active")
        document.getElementById("title").innerHTML = "Mensaje enviado con éxito!"
        document.getElementById("modalBody").innerHTML = "Gracias por comunicarse con nosotros. En la brevedad responderemos su mensaje. Muchas Gracias!!"})
        var botonCerrar= document.getElementById("close-button")
        botonCerrar.addEventListener('click', () =>{
        modal.classList.remove("active")
    })
}



function agregarACarrito(){
    var addToCartButtons = document.getElementsByClassName("btnComprar")
    for(var i = 0; i < addToCartButtons.length; i++){    
    var button = addToCartButtons[i]   
    button.addEventListener("click", addToCartClicked) 
    }
}
if(document.getElementById("juguetes") || document.getElementById("farmacia")){

    var botonCarrito = document.getElementById("botonCarrito")
    botonCarrito.addEventListener("click", function(){
    var carrito = document.getElementById("carrito")
    carrito.classList.toggle("active")
})
}
function abrirCarrito(){
    var carrito = document.getElementById("carrito")
    carrito.classList.toggle("active")
    console.log(carrito)

}


function addToCartClicked(e){
    var button = e.target
    var imagen = button.parentElement.parentElement.children[0].innerHTML
    var title = button.parentElement.parentElement.children[1].innerText
    var price = button.parentElement.parentElement.children[2].innerText
    var producto = document.getElementById("productosCarrito")
    var item = document.createElement("div")
    item.innerHTML= `    
    <div class="productoCarrito">
    ${imagen}
    <h4 class="tituloProductoCarrito">${title}</h4>
    <p class="priceItem">${price}</p>
        <div class="elementosProductosCarrito">
            <button class="eliminarProductoCarrito" >&times;</button>
        </div>
    </div>`   
    producto.appendChild(item)
    document.getElementById("precioDeTodo").innerHTML= `<p id="precioTotal"></p>`
    
    function borrarItem(){
        var removeCartItem = document.getElementsByClassName("eliminarProductoCarrito")
        for (var i=0; i< removeCartItem.length; i++){
        var button = removeCartItem[i]
        button.addEventListener("click", e => {
            var buttonClicked = e.target
            buttonClicked.parentElement.parentElement.remove()
        })
    }
    
    }
    vaciarCarrito()
    totalCarrito()
    borrarItem()
    modalComprar()
    setTimeout(modalComprar, 1000)
    finalizarCompra()
    setTimeout(finalizarCompra, 1000)
}

function vaciarCarrito(){
    var botonVaciar = document.getElementById("vaciarCarrito")
    botonVaciar.addEventListener("click", ()=>{
        document.getElementById("productosCarrito").innerHTML= ""
        document.getElementById("cantidadProductosCarrito").classList.remove("active")
        document.getElementById("precioDeTodo").innerHTML= ""
    })
}
function finalizarCompra(){
    var botonFinalizar = document.getElementById("finalizarCompraBoton")
    botonFinalizar.addEventListener("click", ()=>{
        console.log("gola")
        var modalComprar =document.getElementById("finalizarCompraBoton")
        modalComprar.classList.toggle("active")
    })
}

function totalCarrito(){
    var carritoContainer = document.getElementById("productosCarrito") 
    var cartItems =carritoContainer.getElementsByClassName("productoCarrito")
    var cantidadDeProductos = cartItems.length
    var total = 0
    if(cantidadDeProductos != 0) {
        document.getElementById("numeroProductosCarrito").innerText= cantidadDeProductos
        document.getElementById("cantidadProductosCarrito").classList.add("active")}    
        var precioTotal = document.getElementsByClassName("priceItem")
        var precioFinal = 0
    for(var i = 0; i< precioTotal.length; i++){
        var total = precioTotal[i].innerText
        var nuevoTotal = parseInt(total.replace("$", ""))
        precioFinal += nuevoTotal
    }

    document.getElementById("precioTotal").innerText= `Total: $ ${precioFinal}`
}
function modalComprar(){
    var modalComprar =document.getElementById("agregadoProducto")
    modalComprar.classList.toggle("active")
    
}

    