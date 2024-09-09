
const data = get_data();
const komponisten = get_komponisten();
const stücke = get_stücke();

fillKomponistenDataList()
fillStückeDataList()



//check()
let min = 0;
let max = 39;
let rand = false;
let currentSongId = min;

let doneIds = []

function newSong(){
    if (doneIds.length == max - min){
        doneIds = []
        id = 0
    }

    if (rand == true){
        do{
            id = min + Math.floor(Math.random()* (max-min))
        }while(!(doneIds.indexOf(id) == -1))
        doneIds.push(id);

    }else{
        if (currentSongId == max){
            id = 0;
        }
        id = currentSongId + 1
    }

    

    currentSongId = id;
    let path = "/musikquiz/music/id/" + data[id].id + ".mp3"
    let audiosrc = document.createElement("source");
    audiosrc.src = path;
    audiosrc.type = "audio/mpeg";
    audiosrc.id = "audiosrc";
    document.getElementById("audiosrc").replaceWith(audiosrc)
    document.getElementById("audioplayer").load()
}

function go(){
    document.getElementById("landing").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    min = document.getElementById("rangeMin").value - 1;
    max = document.getElementById("rangeMax").value - 1;
    rand = document.getElementById("random").checked;
    console.log(rand)
    currentSongId = -1;
    doneIds = []
    newSong()
    resetInputs()
}

function resetInputs(){
    let werkname = document.getElementById("werknameInput").value = "";
    document.getElementById("werknameInput").style.border = "1px solid var(--border)"
    document.getElementById("werknameLabel").innerHTML = "";
    let komponist = document.getElementById("komponistenInput").value = "";
    document.getElementById("komponistenInput").style.border = "1px solid var(--border)"
    document.getElementById("komponistenLabel").innerHTML = "";
    let epoche = document.getElementById("epoche").value = "none";
    document.getElementById("epoche").style.border = "1px solid var(--border)"
    document.getElementById("epochenLabel").innerHTML = "";
    document.getElementById("checkButton").innerHTML = "CHECK"


}


function check(){
    if (document.getElementById("checkButton").innerHTML == "WEITER"){
        newSong();
        resetInputs();
        return;
    }
    let werkname = document.getElementById("werknameInput").value;
    let komponist = document.getElementById("komponistenInput").value;
    let epoche = document.getElementById("epoche").value;

   
    let stück = data[currentSongId]
    if (werkname == stück.werkname){
        document.getElementById("werknameInput").style.border = "3px solid lime";
    } 
    else{
        document.getElementById("werknameInput").style.border = "3px solid red"; 
        document.getElementById("werknameLabel").innerHTML = stück.werkname;
    }
    if ((komponist == stück.komponist )|| (komponist == "Petermän")){
        document.getElementById("komponistenInput").style.border = "3px solid lime";
    }
    else{
        document.getElementById("komponistenInput").style.border = "3px solid red";
    }   document.getElementById("komponistenLabel").innerHTML = stück.komponist;
    if (epoche == stück.epoche){
        document.getElementById("epoche").style.border = "3px solid lime";
    }
    else{
        document.getElementById("epoche").style.border = "3px solid red";
        document.getElementById("epochenLabel").innerHTML = stück.epoche;
    }

    document.getElementById("checkButton").innerHTML = "WEITER"
    
}
//old: 1px solid var(--border)


function fillKomponistenDataList(){
    
    i = 0,
    len = komponisten.length;
    let dl = document.createElement("datalist");
    dl.id = "komponistenDataList";
    for (;i<len;i+=1){
        let option = document.createElement("option");
        option.value = komponisten[i];
        dl.appendChild(option);
    }
    document.getElementById("quiz").appendChild(dl);

}
function fillStückeDataList(){
    
    i = 0,
    len = stücke.length;
    let dl = document.createElement("datalist");
    dl.id = "stückeDataList";
    for (;i<len;i+=1){
        let option = document.createElement("option");
        option.value = stücke[i];
        dl.appendChild(option);
    }
    document.getElementById("quiz").appendChild(dl);

}