let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [59.93, 30.31],
        zoom: 11,
        controls: []
    });

    const coords = [
        [59.943018, 30.224744],
        [59.945138, 30.310042],
        [59.944137, 30.468684]
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false, // и их можно перемещать
        iconLayout: 'default#image',
        iconImageHref: './img/marker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-35, -52]
    }); 

    coords.forEach(coords => {
        myCollection.add(new ymaps.Placemark(coords));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init)