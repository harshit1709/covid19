
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
    console.log(result);
    
    let tableBody = document.getElementById("tableBody");
    result.response.forEach((element, index) => {
        tableBody.innerHTML = tableBody.innerHTML + 
        `<tr>
        <th>${element.country}</th>
        <td>${element.cases.total}</td>
        <td>${element.cases.active}</td>
        <td>${(element.cases.critical === null) ? "NA" : element.cases.critical}</td>
        <td>${element.cases.recovered}</td>
        <td>${element.deaths.total}</td>
        </tr>`
        
    });
    

})
.catch(err => {
	console.error(err);
});

}
fetchData();