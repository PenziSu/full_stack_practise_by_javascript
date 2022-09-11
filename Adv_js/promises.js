function getData(name) {
    if (name == "Dennis") {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    name: "Dennis Su",
                    age: Math.floor(Math.random() * 30),
                    height: 172
                });
            }, 2000);
        });
    } else {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Not allowed to access data."));
            }, 2000);
        });
    }
}

function getMovies(age) {
    if (age < 12) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Cartoon Movie");
            }, 2000);
        });
    } else if (age < 18) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Teen Movie");
            }, 2000);
        });
    } else {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Adule Movie");
            }, 2000);
        });
    }
}


// getData("Dennis").then(obj => {
//     console.log(obj);
//     return getMovies(obj.age);
// }).then((msg) => {
//     console.log(msg);
// }).catch((e) => {
//     console.log(e);
// })

async function showMovie() {
    const obj = await getData("Dennis");
    const movie = await getMovies(obj.age);
    console.log(obj.age + ": " + movie);
}

showMovie();
