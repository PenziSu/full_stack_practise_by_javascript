function getData(name, callback) {
    setTimeout(() => {
        callback({
            name: name,
            height: 172,
            age: Math.floor(Math.random() * 30)
        });
    }, 2000)
}

function getMovies(age, callback) {
    if (age < 12) {
        setTimeout(() => {
            callback("Cartoon Movies");
        }, 1500)
    } else if (age < 18) {
        setTimeout(() => {
            callback("Teen Movies");
        }, 1500)
    } else {
        setTimeout(() => {
            callback("Adult Movies");
        }, 1500)
    }
}


getData("Dennis", (obj) => {
    console.log(obj);
    getMovies(obj.age, (str) => {
        console.log(str);
    });
});
