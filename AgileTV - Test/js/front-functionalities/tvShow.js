let episodesList = document.querySelector('.presentation-bottom-list');
let episodesMenu = document.querySelector('.presentation-bottom-menu');

let btnGeneral = document.querySelector('#btn-general');
let componentsGeneral = document.querySelector('#components-general');
let btnCast = document.querySelector('#btn-cast');
let componentsCast = document.querySelector('#components-cast');

function onLoadTvShow(){;
    loadComponents();
}

function loadComponents(){
    onLoadEpisodesData();
    onLoadTvShowData();
}

function loadEpisodesSeason(season){
    resetSeason();
    showSeason(season);
}

btnGeneral.addEventListener('click', ()=>{
    resetNavMenu();
    showComponents(btnGeneral, componentsGeneral);
});

btnCast.addEventListener('click', ()=>{
    resetNavMenu();
    showComponents(btnCast, componentsCast);
});

function resetSeason(){
    for (let i = 0; i < episodesList.children[0].children.length; i++) {
        episodesList.children[0].children[i].classList.add('is-invisible');
        episodesList.children[0].children[i].classList.remove('animate__fadeInUp');
    }
    resetMenu();
}

function resetMenu(){
    for (let i = 0; i < episodesMenu.children[0].children.length; i++) {
        episodesMenu.children[0].children[i].classList.remove('selected-menu-border');
    }
}

function showSeason(season){
    for (let i = 0; i < episodesList.children[0].children.length; i++) {
        if (episodesList.children[0].children[i].classList.contains('T' + season)){
            episodesList.children[0].children[i].classList.remove('is-invisible');
            episodesList.children[0].children[i].classList.add('animate__fadeInUp');
        }
    }
    episodesMenu.children[0].children[season - 1].classList.add('selected-menu-border');
}

function showEpisodeDetails(season, episode){
    let episodeDetails = document.querySelector('#T' + season + '-' + 'EPI-' + episode.toString().padStart(2, '0'));
    episodeDetails.classList.contains('is-invisible') ? resetEpisodeDetails() : '';
    episodeDetails.classList.toggle('is-invisible');
    episodeDetails.classList.add('animate__fadeIn');
}

function resetEpisodeDetails(){
    let episodeDetailsAll = document.querySelectorAll('.presentation-episode');
    episodeDetailsAll.forEach((episode) =>{
        episode.classList.add('is-invisible');
        episode.classList.remove('animate__fadeIn');
    });
}

function resetNavMenu(){
    btnGeneral.classList.remove('selected-menu-border');
    btnCast.classList.remove('selected-menu-border');
    componentsGeneral.classList.add('is-invisible');
    componentsCast.classList.add('is-invisible');
    componentsGeneral.classList.remove('animate__fadeInLeft');
    componentsCast.classList.remove('animate__fadeInLeft');
}

function showComponents(btn, components){
    btn.classList.add('selected-menu-border');
    components.classList.remove('is-invisible');
    components.classList.add('animate__fadeInLeft');
}
