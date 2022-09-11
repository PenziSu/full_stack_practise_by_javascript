console.log("Joke API Test");

async function getJoke() {
    let data = await fetch("https://v2.jokeapi.dev/joke/Coding")
    let joke = await data.json();
    console.log("show joke");
    console.log(joke);
}

getJoke();
