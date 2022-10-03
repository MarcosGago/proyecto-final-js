let carrito = JSON.parse(localStorage.getItem("productosAgregadosJSON")) || [];
let total = localStorage.getItem(`total`);
total = parseInt(total);
let renderizarTienda = () =>{
  let html = `
        <h1 class="titulo">TIENDA DE ROPAS</h1>
        
       
        <div class="carrito">
            <table class="table table-striped ">
                <thead class="contenedorEncabezado">
                  <tr class="encabezados">
                    <th class="encabezado" scope="col">Etiqueta</th>
                    <th class="encabezado" scope="col">Nombre</th>
                    
                    <th class="encabezado" scope="col">Precio</th>
                    <th class="encabezado" scope="col">Eliminar</th>
                  </tr>
                </thead>
                <tbody id="carritoLista" class="table-group-divider"></tbody>
                <tr class="costo">
                  <td colspan="3" class="table-active"><b>SUBTOTAL:</b></td>
                  <td id="subTotal"></td>
                </tr>
              </table>
        </div>
        <div class="finalizarCompra">
            <button class="btn btn-danger botonReset" onclick="vaciarCarrito()" type="button"><b>VACIAR CARRITO ♻️</b></button>
            <button class="btn btn-success botonFinalizar" onclick="finalizarCompra();" type="button"><b>IR A PAGAR ✔️</b></button>
        </div>
  `;
  document.getElementById("main_tienda").innerHTML = html;
}
renderizarTienda();
let renderizarCarrito = ()=> {
  let html =``;
  for (let i = 0; i < carrito.length; i++){
      html += `
      <tr class="contenedorElementos">
        <th class="imgContenedor" scope="row"><img src="${carrito[i].imagen}" class="card-img-top rounded-circle" alt="imagenes"></th>
        <td><p class="propiedades">"${carrito[i].ropa}"</p></td>
        <td><p class="propiedades">${carrito[i].talle}</p></td>
        <td><p class="propiedades">$${carrito[i].precio}</p></td>
        <td class="propiedades"><a class="btn btn-primary" onclick="removerDelCarrito(${i});"><b>❌</b></a></td>
      </tr>
      `;
  }
  document.getElementById("carritoLista").innerHTML = html;
}
renderizarCarrito();
let saveToLocalStorage = () =>{
  let storageJSON = JSON.stringify(carrito);
  localStorage.setItem("productosAgregadosJSON", storageJSON);
  localStorage.setItem(`total`, total);
}
function traerProductosAlHtml() {
  fetch("json/ropas.json")
    .then((res) => res.json())
    .then((stock) => {
      let html = '';
      for (let i = 0; i < stock.length; i++) {
        html += `
          <div class="card">
              <img style="" src="${stock[i].imagen}" class="card-img-top" alt="imagenesEnVenta">
              <div class="card-body">
                  <h5 class="card-title">"${stock[i].ropa}"</h5>
                  <p class="card-text">
                      
                      <b>Talle:</b> ${stock[i].talle}<br>
                      <b>Precio:</b> $${stock[i].precio}
                  </p>
                  <a class="btn btn-primary" id="addToCart" onclick="agregarAlCarrito(${stock[i].id});"><b>AGREGAR AL CARRITO 🛒</b></a>
              </div>
          </div>
        `;
      };
      document.getElementById("listaropa").innerHTML = html;
    })
    .catch((e) => {
      console.log(e);
    });
}
traerProductosAlHtml();
let agregarAlCarrito = (id) =>{
  fetch("json/ropas.json")
    .then((res) => res.json())
    .then((stock) => {
      const ropaAgregado = stock.find((item)=> item.id == id);
      carrito.push(ropaAgregado);
      renderizarCarrito();
      saveToLocalStorage();
      costoTotal();
    })
    .catch((e) => {
      console.log(e);
    });
}
let removerDelCarrito = (id) =>{
    carrito.splice(id, 1);
    renderizarCarrito();
    saveToLocalStorage();
    costoTotal();
  }
let costoTotal = () =>{
  total = carrito.map((item) => item.precio).reduce((acumulado, suma) => acumulado + suma, 0);
  document.getElementById("subTotal").innerHTML = `<b>$${total}</b>`;
  total > 0 ? Toastify({text: `Llevas gastando $${total}`, duration: 3000, gravity: `bottom`, position: `right`}).showToast() : Toastify({text: `CARRITO VACIO`, duration: 3000, gravity: `bottom`, position: `right`}).showToast();
  saveToLocalStorage();
}
let vaciarCarrito = () =>{
  carrito.length != 0 ?
        Swal.fire({
            title: `ESTAS POR VACIAR EL CARRITO`,
            text: `¿Estas seguro que queres eliminar todos los productos?`,
            icon: `warning`,
            showCancelButton: true,
            confirmButtonText: `Si, eliminar todo`,
            cancelButtonText: `No, dejarlo como está`,
        }).then((result) =>{
            if (result.isConfirmed){
                carrito.length = 0;
                total = 0;
                renderizarCarrito();
                saveToLocalStorage();
                renderizarSubTotal();
                Swal.fire({
                    title: `CARRITO VACIO`,
                    icon: `success`,
                    text: `CARRITO VACIO`
                });
            } else {
                Swal.fire({
                    title: `SIN CAMBIOS`,
                    icon: `success`,
                });
            }
        })
    :
        Toastify({text: `NO AGREGASTE NINGUN PRODUCTO`, duration: 3000, gravity: `bottom`, position: `right`}).showToast();
}
let finalizarCompra = () =>{
    carrito.length != 0 ?
      Swal.fire({
        title: `ESTAS POR FINALIZAR TU COMPRA`,
        text: `¿Queres elegir algo mas o ir a pagar?`,
        icon: `warning`,
        showCancelButton: true,
        confirmButtonText: `Ir a pagar`,
        cancelButtonText: `Seguir eligiendo`,
      }).then((result) =>{
        if (result.isConfirmed){
          let timerInterval;
          Swal.fire({
          title: 'Completa tus datos para finalizar la compra',
          html: 'Redirigiendo en <strong></strong> segundos.<br/><br/>',
          icon: 'info',
          timer: 3000,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              Swal.getHtmlContainer().querySelector('strong')
                .textContent = (Swal.getTimerLeft() / 1000)
                  .toFixed(0);
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        })
          setTimeout(()=>{
            saveToLocalStorage();
            renderizarSubTotal();
            window.location.href = "formulario.html"; }, 3000 );
          } else {
              Swal.fire({
                  title: `👍`,
                  icon: `success`,
              });
          }
      })
    :
        Toastify({text: `NO AGREGASTE NINGUN PRODUCTO`, duration: 3000, gravity: `bottom`, position: `right`}).showToast();
}

   



