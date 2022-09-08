
const init=()=>{
    const searchBar=document.querySelector('#search');
    const artist=searchBar.value
    let section=document.querySelector('#tracks');
    while(section.hasChildNodes()){
        section.removeChild(section.firstChild);
    }
    searchBar.addEventListener('click',searchMusic(artist),false);
    let menuBtn=document.querySelector('#menu-icon');
    menuBtn.addEventListener('click',menuToggle);
}

// AJAX call by old method (XMLHttpRequest)
const loadTracks=()=>{
    let xml=new XMLHttpRequest();
    xml.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            const json=this.responseText;
            const tracks=JSON.parse(json);
            displayTracks(tracks.results);
        }
    }
    
    const URL='http://itunes.apple.com/search?term=sean+paul&limit=30'
    xml.open('GET',URL);
    xml.send();
}

// AJAX call by new method (fetch)
const searchMusic=(artistName)=>{
    const URL=`https://itunes.apple.com/search?term=${artistName}&limit=30`;
    const promise=fetch(URL);
    promise.then(response=>{
       const pr=response.json()
        pr.then(data=>{
            displayTracks(data.results);
        }).catch(error=>error).catch(error=>error)
    })
}

// display all tracks/songs

const displayTracks=(tracks)=>{
    let arr=tracks;
    let section=document.querySelector('#tracks');
    section.classList='row music-tracks-container'
    let message=document.getElementById('message');
    arr.forEach(track => {
        section.appendChild(displayOneTrack(track));
    });
     
}

// display one track/song

const displayOneTrack=(track)=>{
    let pDiv=document.createElement('div');
    let img=document.createElement('img');
    let cDiv=document.createElement('div');
    let h6=document.createElement('h6');
    let p=document.createElement('p');
    let disc=document.createElement('i');
    let artist=document.createElement('i');
    let span1=document.createElement('span');
    let span2=document.createElement('span');

    pDiv.classList='card col-lg-3 col-md-4 col-sm-6';
    pDiv.style.width='13rem';
    cDiv.className='card-body';
    img.className='card-img-top';
    disc.classList='fa fa-compact-disc';
    artist.classList='fa fa-user';
    h6.className='card-title';
    p.className='card-text';
    span1.className='ml-3';
    span2.className='ml-3';
    span1.innerHTML=track.trackName;
    span2.innerHTML=track.artistName;


    img.src=track.artworkUrl100;
    pDiv.appendChild(img);
    pDiv.appendChild(cDiv);
    cDiv.appendChild(audioPlayer(track));
    cDiv.appendChild(h6);
    cDiv.appendChild(p);
    h6.appendChild(disc);
    h6.appendChild(span1);
    p.appendChild(artist);
    p.appendChild(span2);
    // cDiv.appendChild(artist);
    // p.appendChild(track.artistName);

    // h6.innerText=disc+track.trackName;
    // p.innerText=artist.track.artistName;
    return pDiv;
}

const audioPlayer=(track)=>{
    let audio=document.createElement('audio');
    audio.src=track.previewUrl;
    audio.controls=true;
    audio.type='audio/mp4'
    audio.style.width='100%';
    return audio;
}

const resultsClear=()=>{
    document.querySelector('#tracks').innerHTML=''
}

const menuToggle=()=>{
    let sidebar=document.querySelector('.nav-menu');
    sidebar.style.left=='0px'? sidebar.style.left='-250px' : sidebar.style.left='0px'
}

// developer info
(function () {
    let year = new Date();
    document.querySelector('#copyright').innerHTML = `© Copyright ${year.getFullYear()}. All Rights Reserved`;
    document.querySelector('#developer-info').innerText = 'Designed and Developed by Anish Verma';
    document.querySelector('#contact-link').innerText = 'Github Link';
}
)();

window.addEventListener('load',init);

searchMusic('pop');
