
//E-commerce

//DECLARACION CLASE PRODUCTO
class Item {
  constructor(id, nombre, precio, tag, oferta, URL) {
             this.id = parseInt(id);
             this.nombre = nombre.toUpperCase();
             this.precio = parseFloat(precio) * 1.21;
             this.tag = tag;
             this.oferta = oferta;
             this.img = URL;
             this.cantidad = 1;
  }
  addCantidad(){
             this.cantidad++;
  }
  ofertaLabel(){
    return this.oferta ? '50% OFF' : "NEW ARRIVAL";
  }
}

// OBJECTOS Y ARRAY
const products = [];
const carrito = [];


products.push(new Item(1, "Nike Air Zoom", 3000, 'Running', true, 'assets/img/running-01.png'));
products.push(new Item(2, "Nike Pegasus", 3000, 'Running', false, 'assets/img/running-02.png'));
products.push(new Item(3, "Nike React", 4000, 'Walking', true, 'assets/img/walking-01.png'));
products.push(new Item(4, "Nike Flex", 4000, 'Walking', false, 'assets/img/walking-02.png'));
products.push(new Item(5, "Nike Vapor", 5000, 'Football', true, 'assets/img/football-01.png'));
products.push(new Item(6, "Nike Alpha", 5000, 'Football', false, 'assets/img/football-02.png'));
products.push(new Item(7, "Nike Renew", 6000, 'Training Gym', true, 'assets/img/gym-01.png'));
products.push(new Item(8, "Nike SuperRep", 6000, 'Training Gym', false, 'assets/img/gym-02.png'));

const divProd = document.getElementById("bsItems");
const divCarr = document.getElementById ('carrito');
const filtroItems = document.getElementById('filtroItems');
const bsText = document.getElementById ('bsText');

productsUI(products);
filtroUI(products);

//UI
function productsUI(products) {
  bsItems.innerHTML = '';
  for (const Item of products) {
       
       let divProducts = document.createElement("div");
      
       divProducts.innerHTML = `<img id="images" src='${Item.img}'>
                                <h2 id='textProd'>${Item.nombre}</h2>
                                <label>Size:&nbsp</label><select><option>38</option><option>39</option><option>40</option><option>41</option></select>
                                <h3 id='textPrecio'>$ ${Item.precio}</h3>
                                <h5>${Item.ofertaLabel()}</h5>
                                <h6>${Item.tag}</h6>
                                <button id="${Item.id}" class = "btnShop">Comprar</button>
                                <hr>`;
       
       divProd.append(divProducts);
      }
      eventoBoton();
}


//BOTON
function eventoBoton(){
  let botones = document.getElementsByClassName('btnShop');
  for (const boton of botones) {
    boton.addEventListener('click', function () {

           let selection = carrito.find(Item => Item.id == this.id);
           
           if(selection){
                 selection.addCantidad();
           }else{
                 selection = products.find(Item => Item.id == this.id);
                 bsText.innerHTML = 'Producto Seleccionado:<hr> '+selection.nombre+' $'+selection.precio;
                 carrito.push(selection);
           }
           console.log(carrito);
           localStorage.setItem('Carrito', JSON.stringify(carrito));
    })


  }
}


//FILTROS
const filtroNombre = document.getElementById ('filtroNombre');
      filtroNombre.addEventListener('input', function () {
      const filtrados = products.filter(Item=> Item.nombre.includes(filtroNombre.value.toUpperCase()))
      productsUI(filtrados);
    })
let limpiar = document.getElementById('limpiar');
limpiar.onclick=()=>{
  filtroNombre.value= '';
  productsUI(products);
}

function filtroUI(Item) {
         filtroItems.innerHTML='';
         filtroItems.append('Categorias: ');
         const porCategorias = Item.map (Item => Item.tag);
         crearSelect(arraySinDuplicados(porCategorias), 'tag');

         filtroItems.append(' Precio: $');
         const porPrecio = Item.map (Item => Item.precio);
         crearSelect(arraySinDuplicados(porPrecio), 'precio');      
}

//SELECT
function crearSelect(lista, clave) {
        
         let newSelect = document.createElement('select');
         newSelect.innerHTML = '<option>'+lista.join('</option><option>')+ '</option>';
         filtroItems.append(newSelect);
         
         newSelect.addEventListener('change', function(){
                  const filtrados = products.filter(Item => Item[clave] == this.value);
                  productsUI(filtrados);
         })
}

//NO DUPLICADOS
function arraySinDuplicados(lista) {
         let unicos =[];
         lista.forEach(Item => {
               if(!unicos.includes(Item)){
                          unicos.push(Item);
               }
         });
         return unicos;
}
