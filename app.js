window.addEventListener('load', function (){
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone')
    let key = '36d467843dca50a28f57a8c155289c4e'

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            let proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/${key}/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                temperatureDegree.textContent = temperature;  
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                setIcons(icon, document.querySelector('.icon'));
            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});