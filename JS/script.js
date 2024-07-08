const array_video_header = [

    {
        nom: "Bleach",
        img: "bleach",
        video: "Bleach_video",
        titre: "Bleach"
    },
    {
        nom: "Cityhunter",
        img: "cityhunter",
        video: "Cityhunter",
        titre: "City hunter"
    },
    {
        nom: "Deadpool",
        img: "deadpool",
        video: "deadpool",
        titre: "Deadpool"
        
    },
    {
        nom: "Dragonball",
        img: "dragonball",
        video: "dragonball",
        titre: "Dragon ball Z"

    },
    {
        nom: "House of the dragon",
        img: "House-of-the-Dragon",
        video: "House of the dragon",
        titre: "House of the dragon",
        
    },
    {
        nom: "Naruto",
        img: "naruto",
        video: "Naruto",
        titre: "Naruto",

    },
    {
        nom: "Onepiece",
        img: "onepiece",
        video: "Onepiece",
        titre: "One piece"

    },
    {
        nom: "Peaky-blinders",
        img: "Peaky-Blinders",
        video: "Peakyblindres",
        titre: "Peaky blinders",

    },

];


const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjhmMWUxM2VjYTc5OWQxMmVmNmNjZWViZjVjNjQ5MyIsInN1YiI6IjY0ZTBlNTE0MzcxMDk3MDEzOTQ4ZTM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y_sZyDJi2cnH15uAdvP_VZDKBf0z9Kqa6zEqkh0PhfM';


const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'accept': 'application/json'
};


// Fonction pour trier un tableau du plus grand au plus petit nombre
function trierTableau(arr) {
    return arr.sort(function(a,b) {
        return b.vote_average - a.vote_average;
    });
}

/**
 * ***********************************  VIDEO LOGO NETFLIX ACCEUIL ********************************************
 */

let page_acceuil = document.getElementById('page_acceuil'); /** le contenu de la page */
let image_container = document.querySelector('.image-container'); /* div de la video logo */

document.addEventListener('DOMContentLoaded', (event) => { 

    setTimeout(() => {

        image_container.style.display = "block";

        setTimeout(() => {
            
            image_container.style.display = "none";
            page_acceuil.style.display = "block";
            



            
        }, 3915); //  durée de l'image GIF
    }, 200); // durés avant l'affichage de la page d'acceuil

});



/**
 * ***********************************  Header ********************************************
 */
let header = document.getElementById('header');

let title_video = document.getElementById('title_video');

document.addEventListener('DOMContentLoaded', (event) => {

    let number_random = Math.floor(Math.random() * array_video_header.length);
    let serie = array_video_header[number_random];

    console.log(serie.img);
    console.log(serie.nom);

    let image = document.createElement('img');
    image.src = `Assets/Video_header/${serie.nom}/${serie.img}.jpeg`;
    image.alt = `${serie.nom}`;
    image.classList.add('blurred');
    console.log(image.src);

    header.appendChild(image);

    setTimeout(() => {
        // Ajout de la classe pour appliquer l'effet de flou
        image.classList.add('apply-blur');

        // Attendre la fin de la transition avant de remplacer par la vidéo
        setTimeout(() => {
            // Suppression de l'image
            header.removeChild(image);
            

            let video = document.createElement('div');
            
            video.innerHTML = `
            <video autoplay muted loop width="100">
            <source src="Assets/Video_header/${serie.nom}/${serie.video}.mp4" type="video/webm" />
          </video>
`

            // Ajout de la vidéo au conteneur
            header.appendChild(video);
            title_video.textContent = serie.titre;
            let button_show = document.createElement('a');
            button_show.classList.add('btn_header')
            button_show.href = '';
            button_show.textContent = "Voir +";
            title_video.appendChild(button_show);
        }, 2000); // 1500 millisecondes = 1,5 secondes (durée de la transition de flou)
    }, 6000); // 2000 millisecondes = 2 secondes avant de commencer la transition de flou

});



/**
 * ***********************************  FILMS TENDANCES ********************************************
 */

let film_tendence = document.getElementById('film_tendence');

function filmPopulaire() {

   
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-US&page=1&sort_by=popularity.desc';

    fetch(url, { method: 'GET', headers })
        .then(response => response.json())
        .then(data => {
            // Le résultat de la requête est dans la variable data
            const results = data.results;

            // Parcours des données et affichage des identifiants (id) de chaque élément
            for (let i = 0; i < results.length; i++) {


                let img = document.createElement('div');
                img.classList.add('img_film_tendance');

                img.innerHTML = `<a href="film_id.html?id=${results[i].id}&name=${results[i].original_title}"><img src ="${IMG_URL + results[i].poster_path}"></a>`

                film_tendence.appendChild(img);

            }


        })
        .catch(error => {
            console.error(error);
        });
}


// appel de la fonction

filmPopulaire();

/**
 * ***********************************  SERIES TENDANCES ********************************************
 */


let serie_tendence = document.getElementById('serie_tendence');

function seriePopulaire() {

   
    const url = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';

    fetch(url, { method: 'GET', headers })
        .then(response => response.json())
        .then(data => {
            // Le résultat de la requête est dans la variable data
            const results = data.results;

            // Parcours des données et affichage des identifiants (id) de chaque élément
            for (let i = 0; i < results.length; i++) {


                let img = document.createElement('div');
                img.classList.add('img_serie_tendance');

                img.innerHTML = `<a href="film_id.html?id=${results[i].id}&name=${results[i].original_title}"><img src ="${IMG_URL + results[i].poster_path}"></a>`

                serie_tendence.appendChild(img);

            }


        })
        .catch(error => {
            console.error(error);
        });
}

// appel de la fonction

seriePopulaire();



/**
 * ***********************************  LES FILMS MIEUX NOTES ********************************************
 */



let top_films = document.getElementById('top_films');

function meilleur_film(){

let url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&vote_average.gte=8&vote_average.lte=10';

fetch(url, { method: 'GET', headers })
.then(response => response.json())
.then(data => {
    // Le résultat de la requête est dans la variable data
    const results = data.results;

    // Tableau trier
    let tableau_trier = trierTableau(results);

    // Parcours des données et affichage des identifiants (id) de chaque élément
    for (let i = 0; i < 10; i++) {


        let img = document.createElement('div');
        img.classList.add('img_top_film');

        img.innerHTML = `<a href="film_id.html?id=${tableau_trier[i].id}&name=${tableau_trier[i].original_title}"><span>${i+1}</span><img src ="${IMG_URL + tableau_trier[i].poster_path}"></a>`

        top_films.appendChild(img);

    }


})
.catch(error => {
    console.error(error);
});
}

// appel de la fonction
meilleur_film();


/**
 * ***********************************  Les films qui sort Bientôt ********************************************
 */

let film_bientot = document.getElementById('film_bientot');


function Bientôt_Film(){

    let url = "https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1";
    
    fetch(url, { method: 'GET', headers })
    .then(response => response.json())
    .then(data => {
        // Le résultat de la requête est dans la variable data
        const results = data.results;
    
    
        // Parcours des données et affichage des identifiants (id) de chaque élément
        for (let i = 0; i < results.length; i++) {
    
    
            let img = document.createElement('div');
            img.classList.add('img_Bientot_film');
    
            img.innerHTML = `<a href="film_id.html?id=${results[i].id}&name=${results[i].original_title}"><img src ="${IMG_URL + results[i].poster_path}"></a>`
    
            film_bientot.appendChild(img);
    
        }
    
    
    })
    .catch(error => {
        console.error(error);
    });
    }

// appel de la fonction
Bientôt_Film();


/**
 * ***********************************  LES SERIES ET EMISSION TV MIEUX NOTES ********************************************
 */

let top_series = document.getElementById('top_series');

function meilleur_series(){

let url = 'https://api.themoviedb.org/3/tv/top_rated?language=fr-FR&page=1';


fetch(url, { method: 'GET', headers })
.then(response => response.json())
.then(data => {
    // Le résultat de la requête est dans la variable data
    const results = data.results;

    // Tableau trier
    let tableau_trier = trierTableau(results);

    // Parcours des données et affichage des identifiants (id) de chaque élément
    for (let i = 0; i < 10; i++) {


        let img = document.createElement('div');
        img.classList.add('img_top_serie');

        img.innerHTML = `<a href="film_id.html?id=${tableau_trier[i].id}&name=${tableau_trier[i].original_title}"><span>${i+1}</span><img src ="${IMG_URL + tableau_trier[i].poster_path}"></a>`

        top_series.appendChild(img);

    }


})
.catch(error => {
    console.error(error);
});
}

// appel de la fonction
meilleur_series();


/**
 * ***********************************  Acteurs et actrices en vogue ********************************************
 */

let acteur_top = document.getElementById('acteur_top');


function acteur_tendance(){

    let url = "https://api.themoviedb.org/3/person/popular?language=fr-FR&page=1";
    
    fetch(url, { method: 'GET', headers })
    .then(response => response.json())
    .then(data => {
        // Le résultat de la requête est dans la variable data
        const results = data.results;
    
    
        // Parcours des données et affichage des identifiants (id) de chaque élément
        for (let i = 0; i < 6; i++) {
    
    
            let img = document.createElement('div');
            img.classList.add('img_top_acteur');
    
            img.innerHTML = `<a href="film_id.html?id=${results[i].id}&name=${results[i].original_title}"><img src ="${IMG_URL + results[i].profile_path}"><span>${results[i].name}</span></a>`
    
            acteur_top.appendChild(img);
    
        }
    
    
    })
    .catch(error => {
        console.error(error);
    });
    }

// appel de la fonction
acteur_tendance();
