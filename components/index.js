console.log("Hello World")

fetch("http://localhost:3000/teachers")
    .then(r => r.json())
    .then(data => console.log(data))
    .catch(err => console.warn(err))