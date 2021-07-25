const API_KEY = 'k_nr37zkxi';
const BASE_URL = 'https://imdb-api.com/en/API/';
const POPULARS = BASE_URL+'MostPopularMovies/'+API_KEY;
const main = document.getElementById("main");
const searchUrl = BASE_URL+'Search/'+API_KEY+'/';
const form = document.getElementById('form');
const search = document.getElementById("search");
const IMDB_URL = 'https://www.imdb.com/title/';

getMovies(POPULARS)
.catch(err =>{
    console.log("error");
    console.error(error);
});

async function getMovies(url){
    const response = await fetch(url);
    const data=await response.json();
    console.log(data);
    showMovies(data.items);
    
}

async function getSearchMovies(url){
    const response = await fetch(url);
    const data=await response.json();
    console.log(data);
    showSearchMovies(data.results);
    
}

function showSearchMovies(data){
    main.innerHTML = '';
        data.forEach(element => {   
        const {image,title,description,id}=element;
        const url=IMDB_URL+id;
        const movie = document.createElement('div');
        movie.classList.add('container');
        movie.innerHTML = `
        <img src="${image}"
        alt="${title}">
    
        <div id="Movietitle">
        <h3>${title}</h3>
        </div>
    
        <div class="info" id="info">
            <h3>Overview</h3>
            ${description}<br><br>
            <a href=${url} alt="Can't Find Me :(" target="_blank"><button id="find">Find Me On IMDB!</button></a>
        </div>
        `
        main.appendChild(movie);
    });
}

showMovies=(data) =>{
    main.innerHTML = '';
        data.forEach(element => {   
        const {image,imDbRating ,title,crew,year,id}=element;
        const url=IMDB_URL+id;
        const movie = document.createElement('div');
        movie.classList.add('container');
        movie.innerHTML = `
        <img src="${image}"
        alt="${title}">
    
        <div id="Movietitle">
        <h3>${title}</h3>
        <span id="rate" class="${getClass(imDbRating)}">${imDbRating}</span>
        </div>
    
        <div class="info" id="info">
            <h3>Overview</h3>
            Crew: ${crew}
            <br>
            Year: ${year}<br><br>
            <a href=${url} alt="Can't Find Me :(" target="_blank"><button id="find">Find Me On IMDB!</button></a>
        </div>
        `
        main.appendChild(movie);
    });
}

function getClass(rating){
    if(rating>=8)
        return 'green';
    else if(rating>=5)
        return 'yellow';
    else
        return 'red';        
}

form.addEventListener("submit",(res) => {
    res.preventDefault();
    const searched = search.value;

    if(searched)
        getSearchMovies(searchUrl+searched);
    else
    getMovies(POPULARS);   
})