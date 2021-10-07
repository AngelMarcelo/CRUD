export function validarCampoRequerido(input) {
  //console.log("desde la funcion validar campo requerido");
  if (input.value.trim() != "" && input.value.trim().length > 0) {
    //if(input.value.trim() != "") alternativa de expresar..
    //console.log("el dato es correcto");
    input.className = "form-control is-valid";
    return true;
  } else {
    //console.log("corregir el dato");
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarCodigo(input) {
 // console.log("desde la funcion validar campo requerido");
  if (input.value.trim() != "" && input.value.trim().length >= 3) {
   // console.log("el dato es correcto");
    input.className = "form-control is-valid";
    return true;

    //input.value.trim().length > 0) {
    //if(input.value.trim() != "") alternativa de expresar..
  } else {
   //console.log("corregir el dato");
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarNumeros(input) {
  let patron = /^[0-9]{1,3}$/;
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarURL(input) {
  // crear una expresion regular
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (
    patron.test(input.value.trim() != "" && patron.test(input.value.trim()))
  ) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

//export function validaGeneral(event) {
export function validaGeneral() {
  //previee que recarge la pagina
  //event.preventDefault();
  //console.log("desde la funcion valida general");
  //if (true/false) 
  let alerta = document.querySelector('#mensajeDeAlerta');
  if (
    validarCodigo(codigo) &&
    validarCampoRequerido(
      producto) &&
        validarCampoRequerido(
          descripcion) &&
            validarCampoRequerido(cantidad) &&
            validarCampoRequerido(url)
           
    
        )
    
  {
    alerta.className = "alert alert-danger d-none";
    return true;
    //console.log("aqui tengo que crear el producto");
  } else {
    //console.log("corregir datos");
    
    // aqui mostrar el alert del html
        alerta.className = "alert alert-danger";
        return false;
  }
}

// traer los campos que me interesan (los imputs/textarea) alternativa al onblur

//let codigo = document.querySelector("#codigo");
//let cantidad = document.querySelector("#cantidad");
//let url = document.querySelector("#url");
//let producto = document.querySelector("#producto");
//let descripcion = document.querySelector("#descripcion");
//let formulario = document.querySelector("#formProducto");

//console.log(producto);
//console.log(descripcion);
//console.log(formulario);

// le agregamos un elemento

//codigo.addEventListener("blur", () => {
//  validarCodigo(codigo);
//});
//cantidad.addEventListener("blur", () => {
  //validarNumeros(cantidad);
//});
//url.addEventListener("blur", () => {
//  validarURL(url);
//});
//producto.addEventListener("blur", () => {
 // validarCampoRequerido(producto);
//});
//descripcion.addEventListener("blur", () => {
 // validarCampoRequerido(descripcion);
//});
//formulario.addEventListener("submit", validaGeneral);
