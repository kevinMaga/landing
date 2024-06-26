let loaded = ( eventLoaded ) => {

    const formulario= document.getElementById('form');
    
    formulario.addEventListener('submit', ( eventSubmit ) => { 

        eventSubmit.preventDefault();
        
        var nombre = document.getElementById("nombre").value.trim();
        var email = document.getElementById("email").value.trim();
        var mensaje = document.getElementById("textarea").value.trim();

        if (nombre.length == 0) {
            window.alert("Nombre requerido")
            document.getElementById("nombre").focus();
            return;
        }
        if (email.length == 0) {
            window.alert("Email requerido")
            document.getElementById("email").focus();
            return;
        }

        if (mensaje.length == 0) {
            window.alert("Mensaje requerido")
            document.getElementById("textarea").focus();
            return;
        }
        const datos = {
            nombre: nombre,
            email: email,
            mensaje: mensaje,
        };
    
        fetch("https://equipos-a240f-default-rtdb.firebaseio.com/equipos.json", {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
            
        })
            .then(respuesta => respuesta.json())
            .then(datos => {
                console.log(datos);
                window.location.href = 'index.html'
            })
            .catch(error => console.error(error));
            
  
    })
    
    obtenerDatos();
    
  }
  
  window.addEventListener("DOMContentLoaded", loaded );



var modal = document.getElementById('myModal');

// Obtenemos la imagen dentro del modal y el elemento para el caption
var modalImg = document.getElementById("modal-img");
var captionText = document.getElementById("caption");

// Añadimos eventos click a cada imagen en la galería
var images = document.querySelectorAll('.post-thumbnail img');
images.forEach(function (image) {
    image.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    };
});

// Obtenemos el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario hace click en <span> (x), cierra el modal
span.onclick = function () {
    modal.style.display = "none";
};

// Cierra el modal cuando el usuario hace click fuera de la imagen
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

async function obtenerDatos() {
    const url = "https://equipos-a240f-default-rtdb.firebaseio.com/equipos.json";
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            console.error("Error", respuesta.status);
            return;
        }
        const datosJSON = await respuesta.json();
        const mapaJuegosFav = new Map();
        
        for (const key in datosJSON) {
            const { nombre, email, mensaje } = datosJSON[key];
            mapaJuegosFav.set(key, { nombre, email, mensaje });
        }

        // Obtener referencia al cuerpo de la tabla
        const tableBody = document.getElementById('tablebody');

        // Limpiar cualquier fila existente
        tableBody.innerHTML = '';

        // Llenar la tabla con datos
        mapaJuegosFav.forEach((value, key) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${value.nombre}</td>
                <td>${value.email}</td>
                <td>${value.mensaje}</td>
            `;
            tableBody.appendChild(newRow);
        });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

// Llamar a obtenerDatos al cargar la página para mostrar los datos existentes
document.addEventListener("DOMContentLoaded", obtenerDatos);

