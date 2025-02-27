let title = document.querySelector('title');
let presentationTitle = document.querySelector('.presentation-title');
let presentationSubTitle = document.querySelector('.presentation-subtitle');
let background = document.querySelector('.main-container');
let synopsis = document.querySelector('.nav-synopsis-text');
let navBottomList = document.querySelector('.nav-bottom-list');

function onLoadTvShowData(){
    requestTvShowData();
}

function requestTvShowData(){
    const request = new Request("https://agile-releases.s3.us-east-1.amazonaws.com/tests/tv-shows/SHOW123.json", {
        method: "GET",
      });
    fetch(request).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Something went wrong on API server!");
        }
      })
      .then((response) => {
        background.style.setProperty('--background', 'url(' + response.Images.Background + ')');
        title.innerHTML = `${response.Title}`;
        presentationTitle.innerHTML = `${response.Title}`;
        presentationSubTitle.innerHTML = `${getSubtitle(response)}`;
        synopsis.innerHTML = `${response.Synopsis}`;
        navBottomList.innerHTML = `${getCast(response)}`;
      })
      .catch((error) => {
        console.error(error);
      });
}

function getSubtitle(response){
    let subtitle = "";
    response.Genres.map((values)=>{
      subtitle += `${values.Title} e `;
    });

    subtitle = subtitle.slice(0, subtitle.length - 2);
    subtitle += response.Year;
    return subtitle;
}

function getCast(response){
    let cast = ``;
    response.Cast.map((values)=>{
      cast += `<li class="cursor-pointer">${values.Name}</li>`
    });
    return cast;
}