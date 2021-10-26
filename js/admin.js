import {
  validarCodigo,
  validarCampoRequerido,
  validarNumeros,
  validarURL,
  validaGeneral,
} from "./validaciones.js";
import { Producto } from "./productoClass.js";
// traer los campos que me interesan (los imputs/textarea) alternativa al onblur
let codigo = document.querySelector("#codigo");
let cantidad = document.querySelector("#cantidad");
let url = document.querySelector("#url");
let producto = document.querySelector("#producto");
let descripcion = document.querySelector("#descripcion");
let formulario = document.querySelector("#formProducto");
let arregloProductos = [];
let editarProducto = false; // si esta variable es false significa que tengo que agregar un nuevo producto
// si esta variable estuviera en true significa que debo editar un producto existente
let btnNuevoProducto = document.querySelector("#btnNuevoProducto");

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
btnNuevoProducto.addEventListener("click", limpiarFormulario);

function guardarProducto(e) {
  e.preventDefault();
  // verificar que pase todas las validaciones
  if (validaGeneral()) {
    // aqui pregunto el estado de variable editarProducto
    if (editarProducto === false) {
      // tengo que crear el producto
      console.log("aqui creo el producto");
      agregarProducto();
    } else {
      // tengo que modificar el producto
      console.log("aqui quiero modificar el producto");
      actualizarProducto();
    }
  } else {
    // aqui no hacemos nada
    // console.log("no deberia hacer nada")
  }
}

function agregarProducto() {
  // crear un objeto Producto
  let productoNuevo = new Producto(
    codigo.value,
    producto.value,
    descripcion.value,
    cantidad.value,
    url.value
  );
  console.log(productoNuevo);
  // cargar el producto dentro del arreglo
  arregloProductos.push(productoNuevo);
  console.log(arregloProductos);
  // al arreglo lo almacenamos en la memoria interna del navegador (localstorage)
  localStorage.setItem(
    "listaArregloProductos",
    JSON.stringify(arregloProductos)
  );
  // limpiar el formulario
  limpiarFormulario();
  // cargar el producto nuevo en la fila de la tabla
  crearFilas(productoNuevo);
  // mostrar u mensaje al usuario de que se agrego corectamente
  Swal.fire("Good job!", "You clicked the button!", "success");

  //mostrar el objeto en una tabla
}

function limpiarFormulario() {
  // limpia los value de mis inputs
  formulario.reset();
  // limpiar los estilos
  codigo.className = "form-control";
  // TAREA hacer los mismo (resetear) con el resto de los inputs
  producto.className = "form-control";
  descripcion.className = "form-control";
  cantidad.className = "form-control";
  url.className = "form-control";
  //resetear el valor de la variable booleana
  editarProducto = false;
}

function cargaInicial() {
  // traer los productos de localstorage si existieran, sino dejar el arreglo vacio
  arregloProductos =
    JSON.parse(localStorage.getItem("listaArregloProductos")) || [];
  // si hay productos dentro del arreglo entonces lo muestro en la tabla
  arregloProductos.forEach((itemProducto) => {
    // codigo que se ejecuta por cada elemento del arreglo
    crearFilas(itemProducto);
  });
}

function crearFilas(itemProducto) {
  let tabla = document.querySelector("#tablaProducto");
  console.log(itemProducto);
  tabla.innerHTML += ` 
    <tr>
    <th scope="row">${itemProducto.codigo}</th>
    <td>${itemProducto.nombre}</td>
    <td>${itemProducto.descripcion}</td>
    <td>${itemProducto.cantidad}</td>
    <td>${itemProducto.url}</td>
    <td>
         <button class="btn btn-warning" onclick="prepararEdicion('${itemProducto.codigo}')">Editar</button>
         <button class="btn btn-danger" onclick="eliminarProducto('${itemProducto.codigo}')">Borrar</button>
    </td>
    </tr>`;
}

// window es un objeto global de js, en este caso nos sirve para llegar desde el html al js porque el scrip es modulo
window.prepararEdicion = function (codigoProducto) {
  // redacion alternativa
  //window.prepararEdicion = () =>{

  console.log(codigoProducto);
  // buscar el objeto
  // se utiliza find para realizar un bucle que recorre el objeto
  let productoBuscado = arregloProductos.find((itemProducto) => {
    return itemProducto.codigo == codigoProducto;
  });
  console.log(productoBuscado);

  // mostrar en el formulario
  codigo.value = productoBuscado.codigo;
  cantidad.value = productoBuscado.cantidad;
  descripcion.value = productoBuscado.descripcion;
  url.value = productoBuscado.url;
  producto.value = productoBuscado.producto;
  // cambio el valor de la variable editarProducto
  editarProducto = true;
};

function actualizarProducto() {
  // buscar la posicion del elemento del arreglo
  let posicionProducto = arregloProductos.findIndex((elementosArreglo) => {
    return elementosArreglo.codigo == codigo.value;
  });
  console.log(posicionProducto);

  // modificar los datos de esa posicion del arreglo
  arregloProductos[posicionProducto].nombre = producto.value;
  arregloProductos[posicionProducto].descripcion = descripcion.value;
  arregloProductos[posicionProducto].cantidad = cantidad.value;
  arregloProductos[posicionProducto].url = url.value;

  // modificar el localstorage
  localStorage.setItem("arregloProductos", JSON.stringify(arregloProductos));
  // volver a dibujar la tabla
  borrarFilasTabla();
  arregloProductos.forEach((itemProducto) => {
    crearFilas(itemProducto);
  });

  // limpiar formulario
  limpiarFormulario();

  // mostrar mensaje al usuario
  Swal.fire(
    "Producto Modificado",
    "Su producto se modificó correctamente",
    "success"
  );
}

function borrarFilasTabla() {
  let tabla = document.querySelector("#tablaProducto");
  tabla.innerHTML = " ";
}

// crear funcion borrar, se utilizara un elemento global -window
window.eliminarProducto = (codigo) => {
  Swal.fire({
    title: "¿Estas seguro de eliminar este producto?",
    text: "Una vez eliminado el producto no se puede recuperar el producto",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, deseo eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // agregar el codigo que borra el producto
      console.log(codigo);
      //  aqui borramos el producto dentro del arreglo
      let productoFiltrado = arregloProductos.filter((itemProducto) => {
        return itemProducto.codigo != codigo;
      });

      console.log(productoFiltrado);
      //actualizar el arreglo arregloProducto
      arregloProductos = productoFiltrado;

      //actualizar localStorage
      localStorage.setItem(
        "arregloProductos",
        JSON.stringify(arregloProductos)
      );
      // dibujar nuevamente la tabla
      borrarFilasTabla();
      arregloProductos.forEach((itemProducto) => {
        crearFilas(itemProducto);
      });

      Swal.fire("Producto Eliminado", "Su producto fue eliminado.", "success");
    }
  });
};

window.eliminarProducto = (codigo) => {
console.log(codigo);

}