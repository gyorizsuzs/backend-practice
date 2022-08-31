window.addEventListener('load', () => {
  console.log('Loaded from a public directory');

  const formElement = document.querySelector('form');
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const imgName = event.target.querySelector('input[type="text"]').value;
    const imgFile = event.target.querySelector('input[type="file"]').files[0];

    const formData = new FormData();
    formData.append('imageName', imgName);
    formData.append('imageFile', imgFile);

    const fetchSettings = {
      method: 'POST',
      body: formData,
    };

    fetch('/uploadImg', fetchSettings)
      .then(async (data) => {
        if (data.status === 200) {
          const response = await data.json();
          event.target.outerHTML = `<img src="public/${response.imageName}.jpg">`;
        } else {
          event.target.outerHTML = 'picsábaa';
        }
      })
      .catch((error) => {
        event.target.outerHTML = 'picsába';
        console.log(error);
      });

    console.log(event.target, imgName, imgFile);
  });

  document.getElementById('get-nasa').addEventListener('click', async () => {
    const response = await fetch(
      'https://api.nasa.gov/planetary/apod?api_key=cK2CR2YdWKZXd82Bo0Vne4VeowgvXdTm5q0hmjvm&date=2022-08-31&thumbs="true")'
    );
    if (response.status === 200) {
      const data = await response.text();
      const explanation = data.explanation;
      console.log(data);
    } else {
      console.log('no data received');
    }
  });
});
