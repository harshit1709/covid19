let arr = [];
let tableBody = document.getElementById("tableBody");
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
            arr.push(element);
            
        });
        
            
        })
    .catch(err => {
        console.error(err);
    });
    
    }

function hide(){
    var x = document.querySelector(".buttons");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}


//comparable function
// function GetSortOrder(prop) {    
//     return function(a, b) {    
//         if (a[prop] > b[prop]) {    
//             return 1;    
//         } else if (a[prop] < b[prop]) {    
//             return -1;    
//         }    
//         return 0;    
//     }    
// }  


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

//comparable function for sorting data as Deaths or Cases Per Million
function compareDeathOrCasePerMillion( a, b ) {
    if(a.deaths["1M_pop"] === null){
        a.deaths["1M_pop"] = "-1";
    }
    if(b.deaths["1M_pop"] === null){
        b.deaths["1M_pop"] = "-1";
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

fetchData();
console.log(arr);

//display data on web page sorted on the basis of new cases
setTimeout( function getData(){
    arr.sort(compareNewCases);
    
    arr.forEach((element, index) => {
        tableBody.innerHTML = tableBody.innerHTML + 
        `<tr>
        <th>${element.country}</th>
        <td>${(element.cases.new === "+-1") ? "NA" : element.cases.new}</td>
        <td>${element.cases.total}</td>
        <td>${element.cases.active}</td>
        <td>${(element.cases.critical === null) ? "NA" : element.cases.critical}</td>
        <td>${(element.cases["1M_pop"] === null) ? "NA" : element.cases["1M_pop"]}</td>
        <td>${element.cases.recovered}</td>
        <td>${element.deaths.total}</td>
        <td>${(element.deaths["1M_pop"] === null) ? "NA" : element.deaths["1M_pop"]}</td>
        </tr>`
    })
},2000)
//filter data on web page sorted on the basis of deaths per million
function getDataByDeathsPerMillion(){
    tableBody.innerHTML = "";
    arr.sort(compareDeathPerMillion);

    arr.forEach((element, index) => {
        tableBody.innerHTML = tableBody.innerHTML + 
        `<tr>
        <th>${element.country}</th>
        <td>${(element.cases.new === "+-1") ? "NA" : element.cases.new}</td>
        <td>${element.cases.total}</td>
        <td>${element.cases.active}</td>
        <td>${(element.cases.critical === null) ? "NA" : element.cases.critical}</td>
        <td>${(element.cases["1M_pop"] === null) ? "NA" : element.cases["1M_pop"]}</td>
        <td>${element.cases.recovered}</td>
        <td>${element.deaths.total}</td>
        <td>${(element.deaths["1M_pop"] === "-1") ? "NA" : element.deaths["1M_pop"]}</td>
        </tr>`
    })    

}

//filter data on web page sorted on the basis of cases per million
function getDataByCasesPerMillion(){
    tableBody.innerHTML = "";
    arr.sort(compareDeathOrCasePerMillion);

    arr.forEach((element, index) => {
        tableBody.innerHTML = tableBody.innerHTML + 
        `<tr>
        <th>${element.country}</th>
        <td>${(element.cases.new === "+-1") ? "NA" : element.cases.new}</td>
        <td>${element.cases.total}</td>
        <td>${element.cases.active}</td>
        <td>${(element.cases.critical === null) ? "NA" : element.cases.critical}</td>
        <td>${(element.cases["1M_pop"] === "-1") ? "NA" : element.cases["1M_pop"]}</td>
        <td>${element.cases.recovered}</td>
        <td>${element.deaths.total}</td>
        <td>${(element.deaths["1M_pop"] === "-1") ? "NA" : element.deaths["1M_pop"]}</td>
        </tr>`
    })    

}










 