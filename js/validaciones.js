function validarCampoRequerido(input) {
    console.log("desde la funcion validar campo requerido")
    if (input.value.trim().length > 0) {
        //if(input.value.trim() != "") alternativa de expresar..
        console.log("el dato es correcto");
        input.className = "form-control is-valid";

    } else {
        console.log("corregir el dato");
        input.className = "form-control is-invalid";
    }
};


function validarNumeros(imput) {
    let patron = /^[0-9]{1,3}$/;
    if (patron.test(input.value)) {
        input.className = "form-control is-valid";
    } else {
        input.className = "form-control is-invalid";
    }
}


// traer los campos que me interesan (los imputs/textarea) alternativa al onblur

let codigo = document.querySelector("#codigo");
let cantidad = document.querySelector("#cantidad");


// le agregamos un elemento

codigo.addEventListener("blur", () => { validarCampoRequerido(codigo) })
cantidad.addEventListener("blur", () => { validarNumeros(cantidad) });
