import {validarCodigo, validarCampoRequerido, validarNumeros, validarURL, validaGeneral} from "./validaciones.js"; 
import {Producto} from "./productoClass.js";
// traer los campos que me interesan (los imputs/textarea) alternativa al onblur
let codigo = document.querySelector("#codigo");
let cantidad = document.querySelector("#cantidad");
let url = document.querySelector("#url");
let producto = document.querySelector("#producto");
let descripcion = document.querySelector("#descripcion");
let formulario = document.querySelector("#formProducto");
let  arregloProductos = [ ];

cargaInicial();


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
  formulario.addEventListener("submit", guardarProducto);

  function guardarProducto(e){
      e.preventDefault();
      // verificar que pase todas las validaciones
      if(validaGeneral()){
          // tengo que crear el producto
          console.log("aqui creo el producto")
          agregarProducto();
      }else{
          // aqui no hacemos nada
          console.log("no deberia hacer nada")
      }
  }

  function agregarProducto(){
      // crear un objeto Producto
      let productoNuevo = new Producto(codigo.value, cantidad.value, url.value, producto.value,  descripcion.value, formulario.value);
      console.log(productoNuevo); 
      // cargar el producto dentro del arreglo
      arregloProductos.push(productoNuevo);
      console.log(arregloProductos);
      // al arreglo lo almacenamos en la memoria interna del navegador (localstorage)
      localStorage.setItem("listaArregloProductos", JSON.stringify(arregloProductos));
      // limpiar el formulario
      limpiarFormulario();
      // cargar el producto nuevo en la fila de la tabla
      crearFilas(productoNuevo);
      // mostrar u mensaje al usuario de que se agrego corectamente

      //mostrar el objeto en una tabla
  }

  function limpiarFormulario(){
    // limpia los value de mis inputs
    formulario.reset();
    // limpiar los estilos
    codigo.className = "form-control";
    // TAREA hacer los mismo (resetear) con el resto de los inputs
    producto.className = "form-control";
    descripcion.className = "form-control";
    cantidad.className = "form-control";
    url.className = "form-control";
    
  }

  function cargaInicial(){
    // traer los productos de localstorage si existieran, ino dejar el arreglo vacio
    arregloProductos = JSON.parse(localStorage.getItem("listaArregloProductos")) || [ ];
    // si hay productos dentro del arreglo entonces lo muestro en la tabla
    arregloProductos.forEach((itemProducto) => {
           // codigo que se ejecuta por cada elemento del arreglo      
            crearFilas(itemProducto);
    });
   
  }

  function crearFilas(itemProducto){
    let tabla = document.querySelector("#tablaProducto");
    console.log(itemProducto)
    tabla.innerHTML += ` 
    <tr>
    <th scope="row">${itemProducto.codigo}</th>
    <td>${itemProducto.producto}</td>
    <td>${itemProducto.descripcion}</td>
    <td>${itemProducto.cantidad}</td>
    <td>${itemProducto.url}</td>
    <td>
         <button class="btn btn-warning" onclick="prepararEdicion('${itemProducto.codigo}')">Editar</button>
         <button class="btn btn-danger">Borrar</button>
    </td>
    </tr>`

  }

  // window es un objeto global de js, en este caso nos sirve para llegar desde el html al js porque el scrip es modulo
  window.prepararEdicion = function(codigoProducto){
    // redacion alternativa
    //window.prepararEdicion = () =>{
      
     console.log(codigoProducto);
     // buscar el objeto
     // se utiliza find para realizar un bucle que recorre el objeto
     let productoBuscado = arregloProductos.find((itemProducto)=>{return itemProducto.codigo == codigoProducto})
     console.log(productoBuscado);

     // mostrar en el formulario
     codigo.value = productoBuscado.codigo;
     cantidad.value = productoBuscado.cantidad;
     descripcion.value = productoBuscado.descripcion;
     url.value = productoBuscado.url;
     producto.value = productoBuscado.producto;
  }