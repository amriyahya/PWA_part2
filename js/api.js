// window.onload = function() {
 
var league_id = 2015;
var token = '16d85bf702974259b17e4dff4faeade4';
var endPointbase_url = "https://api.football-data.org/v2/";
var endPointstanding_url = `${endPointbase_url}competitions/${league_id}/standings`;

var fetchApi = url => {
  return fetch(url, 
    {
     headers: {'X-Auth-Token': token }
    });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getStandings() {
  // window.onload = function() {
    if ("caches" in window) {
      caches.match(endPointstanding_url).then(function(response) {
        if (response) {
          response.json().
          then(function(data) {
            var klasmenHTML = `
            <div class="card " style="padding:0px; margin-top: 30px;margin-right: -20px; margin-left: -20px;">
                    <table style="font-size:14px;" class="responsive-table">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Logo</th>
                          <th>CLUB</th>
                          <th>PG</th>
                          <th>W</th>
                          <th>D</th>
                          <th>L</th>
                          <th>PTS</th>
                          <th>DT</th>
                        </tr>
                      </thead>
                      <tbody>
                `;
              data.standings["0"].table.forEach(function (atribut) {
                klasmenHTML += `
                        <tr>
                          <td>${atribut.position}</td>
                          <td><img style="width:20px;" src="${atribut.team.crestUrl}"></td>
                          <td>${atribut.team.name}</td>
                          <td>${atribut.playedGames}</td>
                          <td>${atribut.won}</td>
                          <td>${atribut.draw}</td>
                          <td>${atribut.lost}</td>
                          <td>${atribut.points}</td>
                          <td><a href="./team.html?id=${atribut.team.id}">Detail</a></td>
                        </tr> `;
              });
              klasmenHTML += `</tbody>
                        </table> </div>`;
   
            document.getElementById("standings").innerHTML = klasmenHTML;

          });
        }
      });
    }

    fetchApi(endPointstanding_url)
      .then(status)
      .then(json)
      .then(function(data) {
        console.log(data);
        var klasmenHTML = `
        <div class="card " style="padding:0px; margin-top: 30px;margin-right: -20px; margin-left: -20px;">
                <table style="font-size:14px;" class="responsive-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Logo</th>
                      <th>CLUB</th>
                      <th>PG</th>
                      <th>W</th>
                      <th>D</th>
                      <th>L</th>
                      <th>PTS</th>
                      <th>DT</th>
                    </tr>
                  </thead>
                  <tbody>
            `;
          data.standings["0"].table.forEach(function (atribut) {
            klasmenHTML += `
                    <tr>
                      <td>${atribut.position}</td>
                      <td><img style="width:20px;" src="${atribut.team.crestUrl}"></td>
                      <td>${atribut.team.name}</td>
                      <td>${atribut.playedGames}</td>
                      <td>${atribut.won}</td>
                      <td>${atribut.draw}</td>
                      <td>${atribut.lost}</td>
                      <td>${atribut.points}</td>
                      <td><a href="./team.html?id=${atribut.team.id}">Detail</a></td>
                    </tr> `;
          });
          klasmenHTML += `</tbody>
                    </table> </div>`;
       
       
            console.log(klasmenHTML);
        document.getElementById("standings").innerHTML = klasmenHTML

      })
      .catch(error);
}
function getTeamById() {
  return new Promise(function(resolve) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    var team_id_url = `${endPointbase_url}teams/${idParam}`;
    if ("caches" in window) {
      caches.match(team_id_url).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var teamHTML = `
            <div class="col s12 m8 offset-m2 l6 offset-l3">
            <div class="card-panel grey lighten-5 z-depth-1">
              <div class="row valign-wrapper">
                <div class="col s2">
                  <img src="${data.crestUrl.replace(
                    /^http:\/\//i,
                    "https://"
                  )}" alt="" class="circle responsive-img"> 
                </div>
                <div class="col s10">
                  <span class="black-text">
                  <h5 ${data.name}></h5>
                  <h5> ${data.shortName}  is short name from ${data.name}</h5>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
          <div class="col s12 "><h1 class="center-align">Detail Information</h1>
          </div>
          <div class="col s6">
      <div class="card">
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${
          data.name
        }<i class="material-icons right">more_vert</i></span>
        <p><a href="${data.website}">Website</a></p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${data.name }<i class="material-icons right">close</i></span>
        <p>Club Colors: ${data.clubColors}</p>
        <p>Last Updated: ${data.lastUpdated}</p>
        <p>Venue: ${data.venue}</p>
        </div>
        </div>
          </div>
          <div class="col s6"> 
          <div class="card">
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${data.area.name}<i class="material-icons right">more_vert</i></span>
        <p><a href="${data.website}">Website</a></p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">
        Founded: ${data.founded }<i class="material-icons right">close</i></span>
        <p>Address: ${data.address}</p>
        <p>Phone: ${data.phone}</p>
        </div>
        </div>
          </div>
        </div> `;
            document.getElementById("body-content").innerHTML = teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetchApi(team_id_url)
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek/array JavaScript dari response.json() masuk lewat data.
        console.log(data);
        var teamHTML = `
        <div class="col s12 m8 offset-m2 l6 offset-l3">
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper">
            <div class="col s2">
              <img src="${data.crestUrl.replace(
                /^http:\/\//i,
                "https://"
              )}" alt="" class="circle responsive-img"> 
            </div>
            <div class="col s10">
              <span class="black-text">
              <h5 ${data.name}></h5>
              <h5> ${data.shortName}  is short name from ${data.name}</h5>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
      <div class="col s12 "><h1 class="center-align">Detail Information</h1>
      </div>
      <div class="col s6">
  <div class="card">
  <div class="card-content">
    <span class="card-title activator grey-text text-darken-4">${data.name}<i class="material-icons right">more_vert</i></span>
    <p><a href="${data.website}">Website</a></p>
  </div>
  <div class="card-reveal">
    <span class="card-title grey-text text-darken-4">${data.name }<i class="material-icons right">close</i></span>
    <p>Club Colors: ${data.clubColors}</p>
    <p>Last Updated: ${data.lastUpdated}</p>
    <p>Venue: ${data.venue}</p>
    </div>
    </div>
      </div>
      <div class="col s6"> 
      <div class="card">
  <div class="card-content">
    <span class="card-title activator grey-text text-darken-4">${data.area.name}<i class="material-icons right">more_vert</i></span>
    <p><a href="${data.website}">Website</a></p>
  </div>
  <div class="card-reveal">
    <span class="card-title grey-text text-darken-4">
    Founded: ${data.founded }<i class="material-icons right">close</i></span>
    <p>Address: ${data.address}</p>
    <p>Phone: ${data.phone}</p>
    </div>
    </div>
      </div>
    </div> `;
        document.getElementById("body-content").innerHTML = teamHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
    }
)}

function getSavedTeams() {
  getAll().then(function(data) {
    console.log(data);
    // Menyusun komponen card artikel secara dinamis
    var teamsHTML = "";
    data.forEach(function(data) {
      teamsHTML += `
      <div class="col s12 m8 offset-m2 l6 offset-l3">
      <div class="card-panel grey lighten-5 z-depth-1">
        <div class="row valign-wrapper">
          <div class="col s2">
            <img src="${data.crestUrl.replace(
              /^http:\/\//i,
              "https://"
            )}" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
          </div>
          <div class="col s10">
            <span class="black-text">
            <h5 ${data.name}></h5>
            <h5> ${data.shortName}  is short name from ${data.name}</h5>
            <p class="center-align"> 
            <button class="btn-floating btn-large red" id="delete" value="${data.id}">
            <i class="material-icons">delete_forever</i>
            </button>
            </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamsHTML;

    let btn = document.querySelectorAll(".btn-floating");
    for(let button of btn) {
        button.addEventListener("click", function () {
            let id = Number(button.value);
            console.log(id);
            dbDeleteTeam(id).then(() => {
                getSavedTeams()
            })
        }
        )
    }
  });
}

