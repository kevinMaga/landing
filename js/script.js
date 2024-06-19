
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

