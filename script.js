let searchBtn = document.getElementById("searchBtn");
let inputField = document.getElementById("inputfield");
 

const data = null;
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function(){
    if(this.readyState === this.DONE){
        console.log(this.responseText);
    }
})

searchBtn.addEventListener("click", function()
{ 
    var remObj = document.getElementById("artist");
    var childObj = remObj.lastElementChild;
    var remPct = document.getElementById("artistImg");
    var childPct = remPct.lastElementChild;
    while(childObj){
        remObj.removeChild(childObj);
        childObj = remObj.lastElementChild;
    }
    while(childPct){
        remPct.removeChild(childPct);
        childPct = remPct.lastElementChild;
    }
    
    if(inputField.value==='')
    {
        alert("To short");
    }
    else
    {
        fetch("https://genius.p.rapidapi.com/search?q=" + inputField.value, {
	        "method": "GET",
	        "headers": {
		    "x-rapidapi-host": "genius.p.rapidapi.com",
		    "x-rapidapi-key": "c9c24948cdmsh9fa30bcfe629321p1ded71jsn0c342a18e721"
	        }
        })
        .then(response => {
            return response.json();
        })
        .then(data =>{
            if(inputField.value.toLowerCase() != data.response.hits[0].result.primary_artist.name.toLowerCase()){
                alert("Wrong Input")
            }
            else{
                const html = data.response.hits.map(hits => {
                    return `<div class = "artistCont" id = "artistContainer">
                    <p><img src="${hits.result.header_image_thumbnail_url}"></p>
                    <p>Title: ${hits.result.title}</p>
                    </div>
                    `;
                }).join("");
                document.querySelector("#artistImg").insertAdjacentHTML("afterbegin", `<img src="${data.response.hits[0].result.primary_artist.image_url}" id="artistPct">`);
                document.querySelector("#artistImg").insertAdjacentHTML("afterbegin", `<h1 id = "h1Pct">${data.response.hits[0].result.primary_artist.name}</h1>`);
                document.querySelector("#artist").insertAdjacentHTML("afterbegin", html);
            }
	        
        })
        .catch(err => {
            console.error(err);
        });
    }  
})