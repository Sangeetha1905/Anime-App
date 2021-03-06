const apiurl = "https://api.jikan.moe/v3";

//------------------------  Topnav anf from function  ----------------------
function Topnav_And_Form() {
  //navbar
  const nav = document.createElement("nav");
  const img = document.createElement("img");
  img.setAttribute(
    "src",
    "https://aux.iconspalace.com/uploads/117428211619219278.png"
  );
  img.style.position = "absolute";
  img.style.top = "5px";
  img.style.width = "50px";
  img.style.height = "50px";

  const h1 = document.createElement("h1");
  h1.textContent = "Anime";
  h1.setAttribute("class", "title");
  nav.append(img, h1);

  const formdiv = document.createElement("div");
  formdiv.setAttribute("class", "conatiner");
  formdiv.innerHTML = `
     <form>
        <input type="text" name="search" id="search" placeholder="Enter anime name">
        <button type="button" onclick="searchAnime(event)">search</button>
     </form>`;

  document.querySelector(".form").append(nav, formdiv);
}
Topnav_And_Form();
//------------------------ searching Anime name in the search box ----------------------
function searchAnime(event) {
  event.preventDefault();
  let inputtext = document.getElementById("search");
  let tobefindtext = inputtext.value;
  // getAnime(tobefindtext);

  if (tobefindtext == "") {
    alert("please!!! Enter Anime Name 🦹 🦹 🦹");
  } else {
    getAnime(tobefindtext);
  }
}
var inputtext = document.getElementById("search");
inputtext.addEventListener("keypress", function (e) {
  if (e.key === "Enter") searchAnime(event);
});

//-------------------------- setting  initial API to be loaded ---------------------------
async function getAnime(find) {
  try {
    const data = await fetch(`${apiurl}/search/anime?q=${find}&page=1`, {
      method: "GET",
    });
    const initial_datas = await data.json();
    console.log(initial_datas);
    document.querySelector(".image-conatiner").innerHTML = "";
    displayAnime(initial_datas.results);
  } catch (err) {
    document
      .querySelector(".image-conatiner")
      .append("Details Cannot be  Found. 😒");
  }
}
//-------------------------- displayAnime  ---------------------------
function displayAnime(animes) {
  animes.forEach((anime) => {
    var image_box = document.createElement("div");
    image_box.innerHTML = `
<div class="card">
        <div class="image">
          <img src=${anime.image_url} alt="image">
        </div>
        <div class="content">
          <h2><strong>Titile:</strong> ${anime.title}</h2>
          <p><strong>Start Date:</strong>    ${new Date(
            anime.start_date
          ).toDateString()}</p>
          <p><strong>End Date:</strong>      ${new Date(
            anime.end_date
          ).toDateString()}</p>
          <p><strong>Type of series:</strong>          ${anime.type}</p>    
          <p><strong>IMDB Rating:</strong> <i class="fas fa-star"></i> ${
            anime.score
          }</p> 
        </div>
</div>`;
    document.querySelector(".image-conatiner").append(image_box);
  });
}

const loader_div = document.createElement("div");
loader_div.setAttribute("class", "loader");
const loader_image = document.createElement("img");
loader_image.setAttribute(
  "src",
  "http://lindseyfurniture.com/zira/loading.gif"
);
loader_div.append(loader_image);
document.querySelector(".page_loader").append(loader_div);

const loader = document.querySelector(".loader");
const main = document.querySelector(".main");

function init() {
  setTimeout(() => {
    loader.style.opacity = 0;
    loader.style.display = "none";

    main.style.display = "block";
    setTimeout(() => (main.style.opacity = 1), 50);
  }, 5000);
}
init();
