// Favourite Heroes Page

// Getting Ids And Storing It In Array
var arr = JSON.parse(localStorage.getItem("favourites"));

// Redirecting To Details Page Of Hero onClick
function showDetails(idnumber) {
  localStorage.setItem("id", idnumber);
  window.location = "detailsPage.html";
}

// Function For Removing Id From Array And Reloading Array/Window
function removeHero(id) {
  var index = arr.indexOf(id);
  arr.splice(index, 1);
  localStorage.setItem("favourites", JSON.stringify(arr));
  location.reload();
}

// Function For Fetching Heroes Details By Using Array Of Ids Store In LocalStorage
let html = "";
function fetchData() {
  let loader = `<div class="spinner-border text-dark" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;
  document.getElementById("fv-main").innerHTML = loader;
  for (let i = 0; i < arr.length; i++) {
    fetch(
      `https://gateway.marvel.com:443/v1/public/characters/${arr[i]}?ts=1&apikey=5903c31f8fd15bc15a1c1c13369d0bbe&hash=d582d640bee27cb28d3d5fd309ee18a7`
    )
      .then((response) => response.json())
      .then((data) => {
        html += `
                <div class="card" style="width: 20rem;">
                <div>
                  <img onclick="showDetails(${
                    arr[i]
                  })" class="card-img-top" style="height:20rem" src="${
          data.data.results[0].thumbnail.path +
          "." +
          data.data.results[0].thumbnail.extension
        }"></div>
                  <div class="card-body">
                      <h5 class="card-title"  onclick="showDetails(${
                        arr[i]
                      })">${data.data.results[0].name}</h5>
                      <span><i class="fa-solid fa-xmark icon" onclick="removeHero(${
                        arr[i]
                      })"></i></span>
                  </div>
                  
                </div>
                    `;
        document.getElementById("fv-main").innerHTML = html;
      });
  }
}
