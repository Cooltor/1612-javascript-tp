"use strict";



// Affiche l'heure au format HH:ii:ss dans la console toute les secondes
// -> 15:16:32
// -> 15:16:33
// -> 15:16:34

setInterval( 
    () => { 
        var date     = new Date;
        var hours    = date.getHours();
        var minutes  = date.getMinutes();
        var secondes = date.getSeconds();

            hours    = hours < 10    ? `0${hours}` : hours;
            minutes  = minutes < 10  ? `0${minutes}` : minutes;
            secondes = secondes < 10 ? `0${secondes}` : secondes;

        console.log(`${hours}:${minutes}:${secondes}`);
    }, 
    1000 
);