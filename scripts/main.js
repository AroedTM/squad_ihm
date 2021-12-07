//logout()
//communication avec la bdd (leaderboard)
//calcul ratio partie gagnées/ partie jouées

//definition url de l'API'
//const url_api = "URL TO DEFINE / localhost - 127.0.0.1";

/*async function getapi(url){
	const data = await fetch(url);
}*/


//getapi(url_api);

console.log("script called");

function leaderboard(){
	console.log("function leaderboard start");
	const mock_answer = {
		"player":[
			{"username": "user1", "games_played": 6, "games_won": 2},
			{"username": "user2", "games_played": 6, "games_won": 4},
		]
	};
	let tab;
	let count=0
	for (let r of mock_answer){
		 tab +=`<tr>
			<td>${r.player.username}</td>
			<td>${r.player.games_played}</td>
			</tr>`; //ratio a calculer
		}
	document.getElementById("top10").innerHTML = tab;
}

function test(){
	let test = `<p>test</p>`
	document.getElementById("testp").innerHTML = test;
}