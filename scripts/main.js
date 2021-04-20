


/////////////////////////////MAIN//////////////////////////////////

var listadoCartas = fetch("datos.json")
    .then(response => response.json())
    .then(data => cargarJSON(data))
    .catch(function (error) {
    });
generarTabla();

document.getElementById('registrar').addEventListener('click', function () {
    guardarCarta();
    generarTabla();
});

escucharCartas();



//////////////////////////FUNCTIONS////////////////////////////////

function generarTabla() {
    var datos = window.localStorage.getItem('datos');
    datos = JSON.parse(datos);
    let listado = document.querySelector('#listado');
    listado.innerHTML = '';
    for (let i in datos.mazo) {
        const tr = document.createElement('tr')
        const tdNumero = document.createElement('td')
        tdNumero.textContent = datos.mazo[i].numero
        tr.appendChild(tdNumero)
        const tdCarta = document.createElement('td')
        tdCarta.textContent = datos.mazo[i].carta
        tr.appendChild(tdCarta)
        const tdCant = document.createElement('td')
        tdCant.textContent = datos.mazo[i].cantidad
        tr.appendChild(tdCant)
        listado.appendChild(tr)
    }
}

function cargarJSON(data) {
    objeto = getObjetoOrdenado(data)
    localStorage.setItem('datos', JSON.stringify(data));
}

function getObjetoOrdenado(objeto) {
    var aux;
    for (var i = 0; i < objeto.mazo.length; i++) {
        for (var j = i + 1; j < objeto.mazo.length; j++) {
            if (objeto.mazo[i].cantidad > objeto.mazo[j].cantidad) {
                aux = objeto.mazo[j]
                objeto.mazo[j] = objeto.mazo[i]
                objeto.mazo[i] = aux
            }
        }
    }
    return objeto;
}

function guardarCarta() {
    var numero = document.querySelector('#numero').value;
    var carta = document.querySelector('#carta').value;
    var datos = window.localStorage.getItem('datos');
    datos = JSON.parse(datos);

    var cartaEncontrada = false;
    for (var i = 0; i < datos.mazo.length; i++) {
        if (datos.mazo[i].numero == numero) {
            alert("Carta ya ingresada");
            cartaEncontrada = true;
            break;
        }
    }

    if (!cartaEncontrada) {
        var dato = { numero: numero, carta: carta, cantidad: 0 };
        datos.mazo.push(dato);
        datos = getObjetoOrdenado(datos);
        window.localStorage.setItem('datos', JSON.stringify(datos));
    }
}

function escucharCartas() {
    
    //apuntamos a las cartas
    const imgSelector = '.row img';
    const imgs = document.querySelectorAll(imgSelector);
    //recorremos las cartas en busca de la clickeada
    imgs.forEach(function (imgs) {
        imgs.addEventListener('click', function (event) {
            if (!event.target.matches(imgSelector)) {
                return;
            }
            const targetImg = event.target;
            var id = targetImg.id;
            incrementarCarta(id);
            generarTabla();
        });
    });
    
    
}

function incrementarCarta(id)
{
    //sacamos datos del local storage para manipularlos
    var datos = window.localStorage.getItem('datos');
    datos = JSON.parse(datos);
    //recorremos datos para incrementar carta clickeada
    for(var i = 0; i<datos.mazo.length;i++)
    {
        if(id==datos.mazo[i].numero)
        {
            datos.mazo[i].cantidad++;
            alert("carta " + datos.mazo[i].numero + " incrementada");
            datos = getObjetoOrdenado(datos);
            window.localStorage.setItem('datos', JSON.stringify(datos));
            return;
        }    
    }
    alert("carta " + id + " no ingresada");
}



