// URL  parametres --> ?correctCount=2&incorrectCount=8

document.addEventListener('DOMContentLoaded', () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const correctCount = parseInt(urlParams.get('correctCount'));
  const incorrectCount = parseInt(urlParams.get('incorrectCount'));

  const scoreTextElement = document.querySelector('#scoreText');
  // scoreTextElement.textContent = `Your score is: ${correctCount} correct answers and ${incorrectCount} incorrect answers of 10 questions`;
  scoreTextElement.textContent = `Your score is: ${correctCount} of 10`;

  const scorePoints = document.querySelector('#scorePoints');
  const totalPoints = correctCount * 10;
  // console.log(totalPoints);
  // scorePoints.textContent = `${totalPoints} points`;
  // Crear un elemento de imagen
  const trophyImage = document.createElement('img');
  trophyImage.src = '../img/trophy.png';
  trophyImage.alt = 'Trophy';

  // Agregar la imagen al contenido del elemento de puntuación
  scorePoints.innerHTML = `${totalPoints} points`;
  scorePoints.prepend(trophyImage);

  // Obtener el elemento de la imagen
  const resultImage = document.querySelector('.result-image img');

  // Definir el objeto con las imágenes correspondientes a cada rango de puntos
  const imageMap = {
    0: {
      src: '../img/dead-mode.png',
      alt: 'Dead Mode',
    },
    10: {
      src: '../img/dead-mode.png',
      alt: 'Dead Mode',
    },
    20: {
      src: '../img/angry-mode.png',
      alt: 'Angry Mode',
    },
    30: {
      src: '../img/angry-mode.png',
      alt: 'Angry Mode',
    },
    40: {
      src: '../img/monkey-mode.png',
      alt: 'Monkey Mode',
    },
    50: {
      src: '../img/monkey-mode.png',
      alt: 'Monkey Mode',
    },
    60: {
      src: '../img/buddha-mode.png',
      alt: 'Budhha Mode',
    },
    70: {
      src: '../img/buddha-mode.png',
      alt: 'Budhha Mode',
    },
    80: {
      src: '../img/ninja-mode.png',
      alt: 'Ninja Mode',
    },
    90: {
      src: '../img/ninja-mode.png',
      alt: 'Ninja Mode',
    },
    100: {
      src: '../img/hero-mode.png',
      alt: 'Hero Mode',
    },
  };
  // Obtener el contenedor del div result-image
  const resultImageContainer = document.querySelector('.result-image');

  // Verificar si el resultado de totalPoints está definido en el mapa de imágenes
  if (totalPoints in imageMap) {
    // Obtener la imagen correspondiente al totalPoints
    const resultImageInfo = imageMap[totalPoints];

    // Crear el elemento de imagen
    const resultImage = document.createElement('img');

    // Configurar los atributos src y alt de la imagen
    resultImage.src = resultImageInfo.src;
    resultImage.alt = resultImageInfo.alt;

    // Agregar la imagen al div result-image
    resultImageContainer.appendChild(resultImage);
  } else {
    console.log('No hay una imagen definida para el resultado de totalPoints:', totalPoints);
  }

  // Obtener el elemento del mensaje de título
  const resultMessageTitle = document.querySelector('#resultMessageTitle');
  // console.log(resultMessageTitle);

  // Obtener el elemento del mensaje de subtítulo
  const resultMessageSubtitle = document.querySelector('#resultMessageSubtitle');
  // console.log(resultMessageSubtitle);

  // Definir los mensajes correspondientes a cada rango de puntuación
  const messageMap = {
    0: {
      title: 'Dead Mode',
      subtitle: 'Fatality ☠️ !',
    },
    10: {
      title: 'Dead Mode',
      subtitle: 'Dancing with the night',
    },
    20: {
      title: 'Angry Mode',
      subtitle: 'Is this all you know?',
    },
    30: {
      title: 'Angry Mode',
      subtitle: 'Wake Up!',
    },
    40: {
      title: 'Monkey Mode',
      subtitle: 'Waiting for the right time',
    },
    50: {
      title: 'Monkey Mode',
      subtitle: 'But you have to keep improving',
    },
    60: {
      title: 'Buddha Mode',
      subtitle: 'Keep calm and carry on',
    },
    70: {
      title: 'Buddha Mode',
      subtitle: 'Keep going no matter what',
    },
    80: {
      title: 'Ninja Mode',
      subtitle: 'Almost there!',
    },
    90: {
      title: 'Ninja Mode',
      subtitle: "It's time to LEVEL UP!",
    },
    100: {
      title: 'Hero Mode',
      subtitle: 'You are on another level. Respect!',
    },
  };

  // Verificar si la puntuación está definida en el mapa de mensajes
  if (totalPoints in messageMap) {
    // Obtener el mensaje correspondiente a la puntuación
    const messageInfo = messageMap[totalPoints];

    // Cambiar el contenido del mensaje de título
    resultMessageTitle.textContent = messageInfo.title;

    // Cambiar el contenido del mensaje de subtítulo
    resultMessageSubtitle.textContent = messageInfo.subtitle;
  } else {
    console.log('No hay un mensaje definido para la puntuación:', totalPoints);
  }
});
