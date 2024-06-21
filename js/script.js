
var modal = document.getElementById('myModal');

// Obtenemos la imagen dentro del modal y el elemento para el caption
var modalImg = document.getElementById("modal-img");
var captionText = document.getElementById("caption");

// Añadimos eventos click a cada imagen en la galería
var images = document.querySelectorAll('.post-thumbnail img');
images.forEach(function(image) {
    image.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    };
});

// Obtenemos el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario hace click en <span> (x), cierra el modal
span.onclick = function() { 
    modal.style.display = "none";
};

// Cierra el modal cuando el usuario hace click fuera de la imagen
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var mensaje = document.getElementById('textarea').value;

    var data = {
        nombre: nombre,
        email: email,
        mensaje: mensaje
    };

    fetch('https://fir-6d6e1-default-rtdb.firebaseio.com/coleccion/-O-1YtQ2Ybz8cVnNp8On/coleccion.json', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Mensaje enviado correctamente');
        document.getElementById('contactForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error al enviar el mensaje');
    });
});

