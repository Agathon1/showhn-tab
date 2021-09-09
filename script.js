const storyDiv = document.querySelector("#stories");

var stories = "";

var handle1;
var handle2;


if (!localStorage.getItem("1")) {
	fetch("https://hacker-news.firebaseio.com/v0/showstories.json")
		.then(response => response.text())
		.then((response) => {
			stories = response;
			stories = stories.substring(1);
			stories = stories.substring(0, stories.length - 1);
			stories = stories.split(",");
			for (let i = 0; i <= 24; i++) {
				fetch("https://hacker-news.firebaseio.com/v0/item/" + stories[i] + ".json")
					.then(response => response.json())
					.then((response) => {
						handle1 = document.createElement("li");
						handle2 = JSON.stringify(response.url);
						handle2 = handle2.substring(1);
						handle2 = handle2.substring(0, handle2.length - 1);
						handle1.innerHTML = "<a href='" + handle2 + "'> READ</a>       " + JSON.stringify(response.title).substring(10).replace('"', ' ');
						storyDiv.appendChild(handle1);
					})
			}	
	})
} else {
	document.querySelector("#panel").innerHTML = localStorage.getItem("1");
}

if (Math.floor(Math.random() * 42) === 5) {
	localStorage.removeItem("1");
}

setTimeout( function() { 
	localStorage.setItem("1", document.querySelector("#panel").innerHTML);
}, 1500);

