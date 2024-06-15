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
        titre: "Dead pool"
        
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
        titre: "Peaky blindres",

    },

];


const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjhmMWUxM2VjYTc5OWQxMmVmNmNjZWViZjVjNjQ5MyIsInN1YiI6IjY0ZTBlNTE0MzcxMDk3MDEzOTQ4ZTM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y_sZyDJi2cnH15uAdvP_VZDKBf0z9Kqa6zEqkh0PhfM';


const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'accept': 'application/json'
};


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
    }, 3000); // 2000 millisecondes = 2 secondes avant de commencer la transition de flou

});



/**
 * ***********************************  FILMS TENDANCES ********************************************
 */

let film_tendence = document.getElementById('film_tendence');

function filmPopulaire() {

    var angle = 0;
    function galleryspin(sign) {
        spinner = document.querySelector("#spinner");
        if (!sign) { angle = angle + 45; } else { angle = angle - 45; }
        spinner.setAttribute("style", "-webkit-transform: rotateY(" + angle + "deg); -moz-transform: rotateY(" + angle + "deg); transform: rotateY(" + angle + "deg);");
    }
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