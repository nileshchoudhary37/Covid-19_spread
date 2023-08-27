function updateMap() {
    fetch("/data.json")
        .then(response => response.json())
        .then(rsp => {
            // console.log(rsp.data)
            console.log("Updating map with real time data")
            rsp.data.forEach(element => {
                latitude = element.latitude;
                longitude = element.longitude;
                cases = element.infected;
                if (cases > 255) {
                    color = "rgb(255,0,0)";
                }
                else {
                    color = `rgb(${cases},0,0)`;
                }
                
                // create the popup
                const popup = new mapboxgl.Popup({ offset: 25 }).setText(
                      `"infected": ${element.infected},
                      "recovered": ${element.recovered},
                      "dead": ${element.dead},
                      "sick": ${element.sick},
                      ${element.name}`
                    );
                //Mark on the map
                new mapboxgl.Marker({
                    draggable: false,
                    color: color
                })
                    .setLngLat([longitude, latitude])
                    .addTo(map)
                    .setPopup(popup);

            });
        })
}
const interval = 2000;
setInterval(updateMap, interval);
