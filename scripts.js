const imageContainer = document.getElementById('image-container');

imageContainer.addEventListener('scroll', async function () {
  if (imageContainer.scrollTop + imageContainer.clientHeight >= imageContainer.scrollHeight) {
    await fetchRandomCatImages();
  }
});

async function fetchRandomCatImages() {
  const apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=5';

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    displayImages(data);
  } catch (error) {
    console.error(error);
  }
}

function displayImages(images) {
  images.forEach(image => {
    const img = document.createElement('img');
    img.src = image.url;
    img.alt = 'Random cat image';
    img.style.margin = '10px';
    img.style.width = '200px';
    img.style.height = 'auto';
    imageContainer.appendChild(img);
  });
}

fetchRandomCatImages();