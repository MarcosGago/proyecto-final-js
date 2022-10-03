carrito = JSON.parse(localStorage.getItem("productosAgregadosJSON")) || [];
total = localStorage.getItem(`total`);
total = parseInt(total);
let userName = localStorage.getItem(`userName`);
let userSurname = localStorage.getItem(`userSurname`);
let userEmail = localStorage.getItem(`userEmail`);
let userState = localStorage.getItem(`userState`);
let userAdress = localStorage.getItem(`userAdress`);
let userPostalCode = localStorage.getItem(`userPostalCode`);
let userPhone = localStorage.getItem(`userPhone`);
let shippingMethod = localStorage.getItem(`shippingMethod`);
let paymentMethod = localStorage.getItem(`paymentMethod`);
let addInformation = localStorage.getItem(`addInformation`);
let checkBox = localStorage.getItem(`checkBox`);
let renderizarFormulario = () =>{
  let renderSection = `
  <h1 class="titulo">¡FINALIZA TU COMPRA!</h1>
  <section class="formulario">
    <h2 class="tituloForm"><b>DATOS DEL PEDIDO:</b></h2>
    <form class="was-validated row g-4">
        <div class="col-md-5">
          <label for="name" class="form-label"><b>Nombre:</b><span class="text-danger">*</span></label>
          <input type="text" class="form-control" id="name" name="name" value="" required>
        </div>
        <div class="col-md-5">
          <label for="surname" class="form-label"><b>Apellido:</b><span class="text-danger">*</span></label>
          <input type="text" class="form-control" id="surname" name="surname" value="" required>
        </div>
        <div class="col-md-6">
          <label for="email" class="form-label"><b>Email:</b><span class="text-danger">*</span></label>
          <div class="input-group">
            <input type="email" name="email" class="form-control" id="email"  aria-describedby="inputGroupPrepend2" required>
          </div>
        </div>
        <div class="col-md-4">
            <label for="phone" class="form-label"><b>Teléfono / Celular:</b><span class="text-danger">*</span></label>
            <div class="input-group">
              <input type="tel" name="phone" class="form-control" id="phone" maxlength="15" aria-describedby="inputGroupPrepend2"  required>
            </div>
        </div>
        <div class="col-md-4">
          <label for="opcionesProvincias" class="form-label"><b>Provincia:</b><span class="text-danger">*</span></label>
          <select class="form-select" name="provincia" id="opcionesProvincias" required>
            <option value="">Seleccionar...</option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="adress" class="form-label"><b>Domicilio:</b><span class="text-danger">*</span></label>
          <input type="text" class="form-control" id="adress" required>
        </div>
        <div class="col-md-2">
          <label for="postalCode" class="form-label"><b>C.P.:</b><span class="text-danger">*</span></label>
          <input type="text" class="form-control" name="cp" id="postalCode" required>
        </div>
        
        <div class="col-md-10 metodoEnvio" id="idOpciones2">
          <p><b>Método de envío:</b></p>
          <select id="opcionesEnvios" class="form-select" required aria-label="select example"></select>
          <div class="invalid-feedback">Por favor, seleccione un método de envío</div>
        </div>
        <div class="col-md-10 formaDePago" id="idOpcionesPagos">
          <p><b>Forma de Pago:</b></p>
          <select id="opcionesPagos" class="form-select" required aria-label="select example"></select>
          <div class="invalid-feedback">Por favor, seleccione un método de pago</div>
        </div>
        <div class="indicaciones col-md-10">
          <h4><b>COMENTARIOS:</b></h4>
          <div class="col-12 comentario form-floating">
            <textarea class="form-control col-md-8" placeholder="Leave a comment here" id="idComment" style="height: 100px;"></textarea>
            <label for="idComment">Indicación la entrega...</label>
          </div>
          <div class="buttons">
            <div class="col-4 btnClean" id="btnClean">
              <button class="btn btn-danger" onclick="cleanForm();" type="reset"><p><b>VACIAR FORMULARIO</b></p></button>
            </div>
            <div class="col-4 btnSubmit" id="btnSubmit">
              <button class="btn btn-primary" onclick="confirmarDatos();" type="submit"><p><b>CONFIRMAR DATOS</b></p></button>
            </div>
          </div>
        </div>
    </form>
  </section>
  <section class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header1" id="flush-headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne"><b>RESUMEN DEL PEDIDO</b></button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div id="accordion-body" class="accordion-body">
            <div id="dropa"></div>
            <div class="datallesPedido">
              <ul class="list-group list-group-flush">
                <li class="list-group-item" id="subTotal"></li>
                <li class="list-group-item" id="detalleEnvio"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h5 class="accordion-header2" id="flush-headingTwo">
          <div class="parametro">TOTAL</div>
          <div class="infoTotal" id="verTotal"></div>
        </h5>
      </div>
    </section>   
    `;
  document.getElementById("renderForm").innerHTML = renderSection;
}
renderizarFormulario();
let carritoEnDetalle = ()=> {
  let htm=``;
  for (let i = 0; i < carrito.length; i++){
      html += `
      <div class="contenedorElementos">
        <img src="${carrito[i].imagen}" class="img" alt="imagenes">
        <div class="propiedades">
          <ul class="list-group list-group-flush">
            <li class="detalle list-group-item"><b>ropa:</b> "${carrito[i].ropa}"</li>
            <li class="detalle list-group-item"><b>talle:</b> ${carrito[i].talle}</li>
            <li class="detalle list-group-item"><b>Precio:</b> $${carrito[i].precio}</li>
          </ul>
        </div>
      </div>
      <hr>
      `;
  }
  document.getElementById("dropa").innerHTML = html;
}
carritoDetalle();
let mostrarSubTotal = () =>{
  let subTotal = total;
  let html = `Subtotal <b>$${subTotal}</b>`;
  document.getElementById("subTotal").innerHTML = html;
}
mostrarSubTotal();
let opcionesProvincias = document.getElementById("opcionesProvincias");
let opcionesEnvios = document.getElementById("opcionesEnvios");
let opcionesPagos = document.getElementById("opcionesPagos");
let recorrer = (opciones, valores) =>{
  opcionesEnvios.innerHTML = `<option value="">Selecciona una opción...</option>`;
  for(let i of valores){
    opciones.innerHTML += `
    <option value="${i}">${i}</option>
    `;
  }
}
let mostrarProvincias = () =>{
  fetch("../json/provincias.json")
  .then((res) => res.json())
    .then((provincias) => {
      recorrer(opcionesProvincias, provincias);
  })
  .catch((e) => {
    console.log(e);
  });
}

let mostrarTotal = () =>{
  let html = `$${total}`;
  document.getElementById("verTotal").innerHTML = html;
}
mostrarTotal();
let saveDataUser = () =>{
  userName = document.getElementById("name").value;
  localStorage.setItem("userName", userName);
  userSurname = document.getElementById("surname").value;
  localStorage.setItem("userSurname", userSurname);
  userEmail = document.getElementById("email").value;
  localStorage.setItem("userEmail", userEmail);
  userState = document.getElementById("opcionesProvincias").value;
  localStorage.setItem("userState", userState);
  userAdress = document.getElementById("adress").value;
  localStorage.setItem("userAdress", userAdress);
  userPostalCode = document.getElementById("postalCode").value;
  localStorage.setItem("userPostalCode", userPostalCode);
  userPhone = document.getElementById("phone").value;
  localStorage.setItem("userPhone", userPhone);
  shippingMethod = document.getElementById("opcionesEnvios").value;
  localStorage.setItem("shippingMethod", shippingMethod);
  paymentMethod = document.getElementById("opcionesPagos").value;
  localStorage.setItem("paymentMethod", paymentMethod);
  addInformation = document.getElementById("idComment").value;
  localStorage.setItem("addInformation", addInformation);
  checkBox = document.getElementById("idCheck").checked;
  localStorage.setItem("checkBox", checkBox);
}
let renderizarForm = () =>{
  document.getElementById("name").value = userName;
  document.getElementById("surname").value = userSurname;
  document.getElementById("email").value = userEmail;
  document.getElementById("phone").value = userPhone;
  document.getElementById("adress").value = userAdress;
  document.getElementById("postalCode").value = userPostalCode;
  document.getElementById("idComment").value = addInformation;
}
renderizarForm();
let confirmarDatos = () =>{
  saveDataUser();
  if ((userName !== ``) && (userSurname !== ``) && (userEmail !== ``) && (userPhone !== ``) && (userState !== ``) && (userAdress !== ``) && (userPostalCode !== ``) && (shippingMethod !== ``) && (paymentMethod !== ``) && (checkBox !== false)){
    let html = `<button class="btn btnConfirm btn-success" onclick="finalizar();"><p><b>FINALIZAR COMPRA</b></p></button>`;
    document.getElementById("btnSubmit").innerHTML = html;
  }
}

let cleanForm = () =>{
  let html = `<button class="btn btn-primary" onclick="confirmarDatos();" type="submit"><p><b>CONFIRMAR DATOS</b></p></button>`;
  document.getElementById("btnSubmit").innerHTML = html;
  setTimeout(()=>{
    saveDataUser();
  });
}