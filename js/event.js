//Entrega 02
//E-commerce

//Entrada Prompt + Condiciones
let validar = prompt("Ingrese cualquier tecla para cargar o ESC para salir");

while (validar != "ESC") {
  let accesorio = prompt("Ingresar Accesorio");
  if (accesorio == "") {
    alert("No cargaste correctamente");
    break;
  }
  let precio = parseFloat(prompt("Ingresar Precio"));
  if (precio == "") {
    alert("No cargaste correctamente");
    break;
  }
  let cantidad = parseFloat(prompt("Ingresar Cantidad"));
  if (cantidad == "") {
    alert("No cargaste correctamente");
    break;
  }

  alert('Accesorio: '+ accesorio + '\nPrecio: $' + precio + '\nCantidad: ' +cantidad);

  //Descuento e Impuestos
  iva = 0.21;

  function descuento(valor1, valor2) {
    return valor1 * valor2 * 0.3;
  }
  function impuesto(valor1, tax) {
    return valor1 * tax;
  }

  //Operaciones
  operacion1 = precio * cantidad - descuento(precio, cantidad); //Descuento
  operacion2 = impuesto(operacion1, iva); //IVA

  pagar = operacion1 + operacion2;

  total = pagar.toFixed(2);
  descuento = descuento(precio, cantidad).toFixed(2);
  iva = operacion2.toFixed(2);

  alert( "Descuento (30%): -$" + descuento + "\nI.V.A. (21%): $" + iva + "\nTotal a pagar: $" + total + "\n\n✨ Gracias por su compra! ✨");

  validar = prompt("Ingrese Producto o ESC para salir");
}

