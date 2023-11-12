//home page javascript
// make a favourites key for storing all favourites hero's id in local storage if not available
if (localStorage.getItem("favourites") == null) {
  localStorage.setItem("favourites", JSON.stringify([]));
} else {
  var arr = JSON.parse(localStorage.getItem("favourites"));
}

// function for show heros full details in a new page
function showDetails(idnumber) {
  localStorage.setItem("id", idnumber);
  window.location = "detailsPage.html";
}
const toastLiveExample = document.getElementById("liveToast");
const toastExist = document.getElementById("existToast")

  

// function for adding id value in local storage favourites key if not available this id
function addFavourite(id) {
  if (!arr.includes(id) == true) {
    arr.push(id);
    localStorage.setItem("favourites", JSON.stringify(arr));
    const toastBootstrap =
  bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
  } else {
    const toastBootstrap =
  bootstrap.Toast.getOrCreateInstance(toastExist);
  toastBootstrap.show();
  }
}

//function for show heros depends on search also filter heros depends on key press
const showCorrespondingHeros = () => {
  let inputValue = document.getElementById("my-search").value;
  if (inputValue.length > 0) {
    let loader = `<div class="spinner-border text-dark" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;
    document.getElementById("cards-group").innerHTML = loader;
  } else {
  }
  fetch(
    `http://gateway.marvel.com/v1/public/characters?&ts=1&apikey=5903c31f8fd15bc15a1c1c13369d0bbe&hash=d582d640bee27cb28d3d5fd309ee18a7&nameStartsWith=${inputValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.data.results) {
        data.data.results.forEach((element) => {
          html += `
              <div class="card" style="width:20rem">
              <div>
                <img class="card-img-top" style="height:20rem" onclick="showDetails(${
                  element.id
                })" src="${
            element.thumbnail.path + "." + element.thumbnail.extension
          }"></div>
                <div class="card-body">
                    <h5 class="card-title" onclick="showDetails(${
                      element.id
                    })">${element.name}</h5>
                    <span><i id="${
                        element.id
                      }" class="fa-regular fa-heart icon" onclick="addFavourite(${
                      element.id
                    })"></i></span>
                </div>
              </div>
                  `;
        });
      } 
      document.getElementById("cards-group").innerHTML = html;
    });
};
