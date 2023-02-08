var title = [];
var rating = [];


const APIKEY = "b97b623533e54e27a4e1f9410f673a54";

async function fetchData() {
    return (await fetch(`https://api.rawg.io/api/games?key=${APIKEY}`)).json();
}
document.addEventListener("DOMContentLoaded", async () => {
    let games = [];
    try 
    {
        games = await fetchData();
    } catch (e) 
    {
        console.log("Error!");
        console.log(e);
    }
    
    for (let i = 0; i < games.results.length; i++) 
    {
        title.push(games.results[i].name);
        rating.push(games.results[i].rating);
        
    }
    rating.splice(4,4);
    title.splice(4,4);
    
    let add = document.getElementById('table');
    let insert = "";
    for (let j = 0; j < 10; j++) 
    {
        
        let name = title[j];
        let score = rating[j];
        
        
        insert += `
            <tr>
                <h3><td>${name}</td></h3>
                
                <h3><td>${score}</td></h3>
            </tr>`;

    }


    heading = `
    <tr>
        <th>Name</th>
        <th>Rating</th>
    </tr>`;
    add.innerHTML = heading;
    add.innerHTML += insert;
    

});
    


    



    


