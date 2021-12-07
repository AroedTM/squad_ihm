//logout()
//communication avec la bdd (leaderboard)
//calcul ratio partie gagnées/ partie jouées

//definition url de l'API'
//const url_api = "URL TO DEFINE / localhost - 127.0.0.1";

/*async function getapi(url){
	const data = await fetch(url);
}*/


//getapi(url_api);

leaderboard();

function leaderboard(){
	console.log("function leaderboard start");

	const mock_answer = [
			{"username": "user1", "games_played": 6, "games_won": 2},
			{"username": "user2", "games_played": 6, "games_won": 4},
		];
	let tab = `<tr>`;
	let count=0
	for (let r of mock_answer){
		 tab +=`
			<td>${r.username}</td>
			<td>${r.games_won}</td>`; //ratio a calculer
		};
		console.log("boucle for working");
	tab += `</tr>`;
	console.log(tab);
	document.getElementById("top10").innerHTML = tab;
};

function test(){
	$(document).ready(function(){
		$("#button2j").click(function(){
			$("#myModal").modal();
		});
	});
}