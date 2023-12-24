async function getWeatherGif(weatherCondition) {
  const apiKey = 'Q1X1qKEqXpD1txDsPKV6OnyvjhXnhJjS'; // Your Giphy API key
  const query = weatherCondition; // Weather condition to search for a relevant GIF
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${query}`;
  
  try {
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();
    const gifUrl = data.data.images.original.url;
    
    // Select the weather result container
    const weatherResult = document.getElementById('weatherResult');
    // Create a new img element for the GIF
    const gifImg = document.createElement('img');
    gifImg.src = gifUrl;
    gifImg.alt = 'Weather-related GIF';
    gifImg.classList.add('weather-gif'); // Add a class for styling if needed
    
    // Append the GIF img element to the weather result container
    weatherResult.appendChild(gifImg);
  } catch (error) {
    console.error('Error fetching weather GIF:', error);
  }
}






async function getWeatherData(location) {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=1c63b1922ea04f3089a103314232112&q=${location}&aqi=no`);
      // console.log(response); 
      const data = await response.json();
      // console.log(data); 
  
      // Add  "https:"  to Ikon URL 
      const iconUrl = `https:${data.current.condition.icon}`;
  


        // Display on html
        const weatherResult = document.getElementById('weatherResult');
        weatherResult.innerHTML = ''; // Clean up fosur fosur

        const weatherInfo = document.createElement('div');
        weatherInfo.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p>Feels like: ${data.current.temp_c}°C</p>
            <p>${data.current.condition.text}</p>
            <img src="${iconUrl}" alt="Hava Durumu İkonu">
        `;
        weatherResult.appendChild(weatherInfo);

        const weatherCondition = data.current.condition.text; // Use the current weather condition
        getWeatherGif(weatherCondition);



    } catch (error) {
      console.error('Hata:', error);
      // Error msg
      document.getElementById('weatherResult').innerHTML = `<p>Hava durumu bilgisi alınamadı.</p>`;
    }
  }
  






document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('weatherForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // console.log("Form submitted"); 
        const location = document.getElementById('location-input').value;
        getWeatherData(location);
        weatherResult.style.display = 'block'; 
    });
});
