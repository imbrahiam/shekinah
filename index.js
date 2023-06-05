let canciones = []; // Variable global para almacenar todas las canciones

let count = 0;
let counter = document.getElementById('counter');

// Función para generar las cards de canciones
function generarCards(canciones) {
  count = 0;
  const cardContainer = document.getElementById('card-container');

  // Vaciar contenido existente
  cardContainer.innerHTML = '';

  // Generar las cards para cada canción
  canciones.forEach(cancion => {
    count += 1;
    const card = document.createElement('div');
    card.classList.add('card', 'fade-in');

    const imagen = document.createElement('img');
    imagen.src = `${cancion.miniatura}`; // Reemplaza con la ruta de las imágenes de las portadas
    card.appendChild(imagen);

    const titulo = document.createElement('h3');
    titulo.textContent = `${cancion.nombre}`;
    card.appendChild(titulo);

    const autor = document.createElement('p');
    autor.textContent = `${cancion.autor}`;
    card.appendChild(autor);

    const tonalidad = document.createElement('p');
    tonalidad.classList.add('tonalidad');
    tonalidad.textContent = `Tonalidad: ${cancion.tonalidad}`;
    card.appendChild(tonalidad);

    // Agregar evento de clic a la card
    card.addEventListener('click', () => {
      // Abrir enlace de YouTube en una nueva pestaña
      window.open(cancion.youtube_link, '_blank');
    });

    cardContainer.appendChild(card);
  });

  counter.innerHTML = "Actualmente hay " + count + " canciones";
}


// Cargar las canciones desde el archivo JSON
function cargarCanciones() {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      canciones = JSON.parse(this.responseText);
      generarCards(canciones);
    }
  };

  xhttp.open("GET", "songs.json", true); // Reemplaza con el nombre de tu archivo JSON
  xhttp.send();
}

function buscarCanciones() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const cancionesFiltradas = canciones.filter(cancion => {
    const nombre = cancion.nombre.toLowerCase();
    const autor = cancion.autor.toLowerCase();
    return nombre.includes(searchTerm) || autor.includes(searchTerm);
  });

  generarCards(cancionesFiltradas);

  if (cancionesFiltradas.length === 0) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '<p>No se encontraron canciones.</p>';
  }
}

// Cargar las cards al cargar la página
window.addEventListener('load', () => {
  cargarCanciones();
});