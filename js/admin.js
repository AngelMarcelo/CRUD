import {validarCodigo, validarCampoRequerido, validarNumeros, validarURL, validaGeneral} from "./validaciones.js"
// traer los campos que me interesan (los imputs/textarea) alternativa al onblur
let codigo = document.querySelector("#codigo");
let cantidad = document.querySelector("#cantidad");
let url = document.querySelector("#url");
let producto = document.querySelector("#producto");
let descripcion = document.querySelector("#descripcion");
let formulario = document.querySelector("#formProducto");


// le agregamos un elemento
codigo.addEventListener("blur", () => {
    validarCodigo(codigo);
  });
  cantidad.addEventListener("blur", () => {
    validarNumeros(cantidad);
  });
  url.addEventListener("blur", () => {
    validarURL(url);
  });
  producto.addEventListener("blur", () => {
    validarCampoRequerido(producto);
  });
  descripcion.addEventListener("blur", () => {
    validarCampoRequerido(descripcion);
  });
  formulario.addEventListener("submit", validaGeneral);

  function guardarProducto(e){
      e.preventDefault();
      // verificar que pase todas las validaciones
      if(validaGeneral()){
          // tengo que crear el producto
          console.log("aqui creo el producto")
      }else{
          // aqui no hacemos nada
          console.log("no deberia hacer nada")
      }
  }