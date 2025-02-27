function onLoadEpisodesData(){
    requestEpisodesData();
}

function requestEpisodesData(){
    const request = new Request("https://agile-releases.s3.us-east-1.amazonaws.com/tests/episodes/SHOW123.json", {
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
        response.map((episodeInfo)=>{
            if (episodeInfo != null){
                setNumberOfSeasons(episodeInfo);
                setEpisodes(episodeInfo);
            }
        });
        loadEpisodesSeason(1);
      })
      .catch((error) => {
        console.error(error);
      });
}

function setNumberOfSeasons(episodeInfo){
    let seasonList = "";
    let menu = document.querySelector(".presentation-bottom-menu");
    if (menu.children[0].lastElementChild.innerHTML.replace("T", "") < episodeInfo.SeasonNumber){
        seasonList += `
            <li class="l-textBold cursor-pointer" onclick="loadEpisodesSeason(${episodeInfo.SeasonNumber})">T${episodeInfo.SeasonNumber}</li>
        `;
    }
    menu.children[0].innerHTML += seasonList
}

function setEpisodes(episodeInfo){
    let episodesList = "";
    episodesList += `
                <li class="cursor-pointer animate__animated T${episodeInfo.SeasonNumber}" onclick="showEpisodeDetails(${episodeInfo.SeasonNumber}, ${episodeInfo.ID.slice(-1)})">
                    <div class="presentation-list-top">
                        <p class="presentation-list-title">${episodeInfo.EpisodeNumber + ` - ` + episodeInfo.Title}</p> 
                        <i class="fa-solid fa-play iconWhite"></i>
                    </div>
                    <div class="presentation-episode animate__animated is-invisible" id="T${episodeInfo.SeasonNumber}-${episodeInfo.ID}">
                        <img src="${episodeInfo.Image}" class="presentation-list-img" alt="Episode ${episodeInfo.EpisodeNumber + ` - ` + episodeInfo.Title}">
                        <h4 class="presentation-list-text">
                            ${episodeInfo.Synopsis != undefined ? episodeInfo.Synopsis : "Não foi encontrada uma sinopse."}
                        </h4>
                    </div>
                </li>
    `;
    document.querySelector(".presentation-bottom-list").children[0].innerHTML += episodesList;
}