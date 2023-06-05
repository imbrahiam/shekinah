let canciones = [];

let count = 0;
let counter = document.getElementById('counter');

function generarCards(canciones) {
  count = 0;
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  canciones.forEach(cancion => {
    count += 1;
    const card = document.createElement('div');
    card.classList.add('card', 'fade-in');

    const imagen = document.createElement('img');
    imagen.src = `${cancion.miniatura}`;
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

    card.addEventListener('click', () => {
      window.open(cancion.youtube_link, '_blank');
    });

    cardContainer.appendChild(card);
  });

  counter.innerHTML = "ACTUALMENTE HAY " + count + " CANCIONES";
}

function cargarCanciones() {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      canciones = JSON.parse(this.responseText);
      canciones.forEach((song) => {
        if (!song.miniatura) {
          let link = String(song.youtube_link);
          let videoId = link.substring(link.indexOf("=") + 1, 43);
          song.miniatura = `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
        }
      });
      generarCards(canciones);
    }
  };

  xhttp.open("GET", "./src/songs.json", true);
  xhttp.send();
}

function buscarCanciones() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const cancionesFiltradas = canciones.filter(cancion => {
    const nombre = cancion.nombre.toLowerCase();
    const autor = cancion.autor.toLowerCase();
    const tonalidad = cancion.tonalidad.toLowerCase();
    return nombre.includes(searchTerm) || autor.includes(searchTerm) || tonalidad.includes(searchTerm);
  });

  generarCards(cancionesFiltradas);

  if (cancionesFiltradas.length === 0) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '<p>No se encontraron canciones.</p>';
  }
}

window.addEventListener('load', () => {
  cargarCanciones();
});