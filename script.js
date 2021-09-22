let arr = [];
let tableBody = document.getElementById("tableBody");

let total = document.getElementById("total");
let active = document.getElementById("active");
let recovered = document.getElementById("recovered");
let death = document.getElementById("death");

let totalVal;
let activeVal;
let recoveredVal;
let deathVal;

//fetch data function
function fetchData(){
    fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "340e3cfb56msh5140df09976c570p18afc4jsn6464ef9709a9"
        }
    })
    .then(response => response.json())
    .then(result => {
        // console.log(result);
        result.response.forEach(element => {
            if(element.country == "All"){
                totalVal = element.cases.total;
                activeVal = element.cases.active;
                recoveredVal = element.cases.total;
                deathVal = element.deaths.total;
                
            }else{
            arr.push(element);
            }
            
        });
        total.innerHTML = `<b>${totalVal}</b>`;
        active.innerHTML = `<b>${activeVal}</b>`;
        recovered.innerHTML = `<b>${recoveredVal}</b>`;
        death.innerHTML = `<b>${deathVal}</b>`;

        getData();
            
        })
    .catch(err => {
        console.error(err);
    });
    
    }

function toggle(){
    var x = document.querySelector(".buttons");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}


//comparable function
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}  


//comparable function for sorting data as new cases
function compareNewCases( a, b ) {
    if(a.cases.new === null){
        a.cases.new = "+-1";
    }
    if(b.cases.new === null){
        b.cases.new = "+-1";
    }
    if(a.cases.new != null && b.cases.new != null){
    if ( parseInt(a.cases.new.substring(1)) < parseInt(b.cases.new.substring(1)) ){
      return 1;
    }
    if ( parseInt(a.cases.new.substring(1)) > parseInt(b.cases.new.substring(1)) ){
      return -1;
    }
    }
    
    return 0;
  }


//comparable function for sorting data as Deaths Per Million
function compareDeathPerMillion( a, b ) {
    if(a.deaths["1M_pop"] === null){
        a.deaths["1M_pop"] = "0";
    }
    if(b.deaths["1M_pop"] === null){
        b.deaths["1M_pop"] = "0";
    }
    if(a.deaths["1M_pop"] != null && b.deaths["1M_pop"]!= null){
    if ( parseInt(a.deaths["1M_pop"]) < parseInt(b.deaths["1M_pop"]) ){
      return 1;
    }
    if ( parseInt(a.deaths["1M_pop"]) > parseInt(b.deaths["1M_pop"]) ){
      return -1;
    }
    }
    
    return 0;
  }
 

//comparable function for sorting data as Cases Per Million
function compareCasePerMillion( a, b ) {
    if(a.cases["1M_pop"] === null){
        a.cases["1M_pop"] = "0";
    }
    if(b.cases["1M_pop"] === null){
        b.cases["1M_pop"] = "0";
    }
    if(a.cases["1M_pop"] != null && b.cases["1M_pop"]!= null){
    if ( parseInt(a.cases["1M_pop"]) < parseInt(b.cases["1M_pop"]) ){
      return 1;
    }
    if ( parseInt(a.cases["1M_pop"]) > parseInt(b.cases["1M_pop"]) ){
      return -1;
    }
    }
    
    return 0;
  }  

fetchData();
console.log(arr);


//display data on web page sorted on the basis of new cases
function getData(){
    tableBody.innerHTML = "";
    arr.sort(compareNewCases);
    
    arr.forEach((element, index) => {
        tableBody.innerHTML = tableBody.innerHTML + 
        `<tr>
        <td>${element.continent}</td>
        <td class = "country">${element.country}</td>
        <td class="newCases">${(element.cases.new === "+-1") ? "+0" : element.cases.new}</td>
        <td>${element.cases.total}</td>
        <td>${(element.cases.active === null)? "0" : element.cases.active}</td>
        <td>${(element.cases.critical === null) ? "0" : element.cases.critical}</td>
        <td class = "recovered">${(element.cases.recovered === null) ? "NA" : element.cases.recovered}</td>
        <td>${(element.cases["1M_pop"] === null) ? "0" : element.cases["1M_pop"]}</td>
        <td>${(element.deaths.total === null) ? "0" : element.deaths.total}</td>
        <td>${(element.deaths["1M_pop"] === null) ? "0" : element.deaths["1M_pop"]}</td>
        </tr>`
    })
}
// setTimeout(getData ,2000);


//filter data on web page sorted on the basis of deaths per million
function getDataByDeathsPerMillion(){
    tableBody.innerHTML = "";
    arr.sort(compareDeathPerMillion);

    arr.forEach((element, index) => {
        tableBody.innerHTML = tableBody.innerHTML + 
        `<tr>
        <td>${element.continent}</td>
        <td  class = "country">${element.country}</td>
        <td class="newCases">${(element.cases.new === "+-1") ? "+0" : element.cases.new}</td>
        <td>${element.cases.total}</td>
        <td>${(element.cases.active === null)? "0" : element.cases.active}</td>
        <td>${(element.cases.critical === null) ? "0" : element.cases.critical}</td>
        <td class = "recovered">${(element.cases.recovered === null) ? "NA" : element.cases.recovered}</td>
        <td>${(element.cases["1M_pop"] === null) ? "0" : element.cases["1M_pop"]}</td>
        <td>${(element.deaths.total === null) ? "0" : element.deaths.total}</td>
        <td>${(element.deaths["1M_pop"] === "-1") ? "0" : element.deaths["1M_pop"]}</td>
        </tr>`
    })    

}


//filter data on web page sorted on the basis of cases per million
function getDataByCasesPerMillion(){
    tableBody.innerHTML = "";
    arr.sort(compareCasePerMillion);

    arr.forEach((element, index) => {
        tableBody.innerHTML = tableBody.innerHTML + 
        `<tr>
        <td>${element.continent}</td>
        <td  class = "country">${element.country}</td>
        <td class="newCases">${(element.cases.new === "+-1") ? "+0" : element.cases.new}</td>
        <td>${element.cases.total}</td>
        <td>${(element.cases.active === null)? "0" : element.cases.active}</td>
        <td>${(element.cases.critical === null) ? "0" : element.cases.critical}</td>
        <td class = "recovered">${(element.cases.recovered === null) ? "NA" : element.cases.recovered}</td>
        <td>${(element.cases["1M_pop"] === "-1") ? "0" : element.cases["1M_pop"]}</td>
        <td>${(element.deaths.total === null) ? "0" : element.deaths.total}</td>
        <td>${(element.deaths["1M_pop"] === "-1") ? "0" : element.deaths["1M_pop"]}</td>
        </tr>`
    })    

}

//filter data on web page sorted on the basis of continent
function SortByContinent(){
    tableBody.innerHTML = "";
    arr.sort(GetSortOrder("continent"));

    arr.forEach((element, index) => {
        tableBody.innerHTML = tableBody.innerHTML + 
        `<tr>
        <td>${element.continent}</td>
        <td  class = "country">${element.country}</td>
        <td class="newCases">${(element.cases.new === "+-1") ? "+0" : element.cases.new}</td>
        <td>${element.cases.total}</td>
        <td>${(element.cases.active === null)? "0" : element.cases.active}</td>
        <td>${(element.cases.critical === null) ? "0" : element.cases.critical}</td>
        <td class = "recovered">${(element.cases.recovered === null) ? "NA" : element.cases.recovered}</td>
        <td>${(element.cases["1M_pop"] === "-1") ? "0" : element.cases["1M_pop"]}</td>
        <td>${(element.deaths.total === null) ? "0" : element.deaths.total}</td>
        <td>${(element.deaths["1M_pop"] === "-1") ? "0" : element.deaths["1M_pop"]}</td>
        </tr>`
    })    

}

//filter data on web page sorted on the basis of country
function SortByCountry(){
    tableBody.innerHTML = "";
    arr.sort(GetSortOrder("country"));

    arr.forEach((element, index) => {
        tableBody.innerHTML = tableBody.innerHTML + 
        `<tr>
        <td>${element.continent}</td>
        <td  class = "country">${element.country}</td>
        <td class="newCases">${(element.cases.new === "+-1") ? "+0" : element.cases.new}</td>
        <td>${element.cases.total}</td>
        <td>${(element.cases.active === null)? "0" : element.cases.active}</td>
        <td>${(element.cases.critical === null) ? "0" : element.cases.critical}</td>
        <td class = "recovered">${(element.cases.recovered === null) ? "NA" : element.cases.recovered}</td>
        <td>${(element.cases["1M_pop"] === "-1") ? "0" : element.cases["1M_pop"]}</td>
        <td>${(element.deaths.total === null) ? "0" : element.deaths.total}</td>
        <td>${(element.deaths["1M_pop"] === "-1") ? "0" : element.deaths["1M_pop"]}</td>
        </tr>`
    })    

}