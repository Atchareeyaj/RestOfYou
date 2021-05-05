let history = [];
let index = {};
let keys = [];
let searched = [];
let visited = [];
let titles = [];
let obj;
let line = 20;
//let histories = [];
let numInput;
let count = 0;
let row = 0;
let state = 1;


function preload() {
    console.log("loading");
    console.log(history.length);
    //history = loadJSON("BrowserHistory.json");
    // you need to put your file in the same folder and put name here
    obj = loadJSON("Search.json");
    //console.log(history.length);
}

function setup() {
    createCanvas(2500, 5000);
    //get length of json object
    var count = Object.keys(obj).length;
    console.log(count);
    //push JSON into an array
    for (let i = 0; i < count; i++) {
        history.push(obj[i]);
    }

    //history = history['Browser History'];  //browser history is one level in
    //history = history['myActivity']; //if you surround your json with {"myActivity": ...... millions of lines ... }  you will get length to work
    //otherwise you have to hard code the length in like 100000 in for loop, go figure.

    for (var i = 0; i < history.length; i++) {
        // var date = new Date(history[i].time_usec/1000); // create Date object if time is given in milliseconds or even usecs
        //var date = history[i].time;
        //let words = history[i].title.split(" ");
        // console.log(history[i]);
        titles.push(history[i].title);
        // }
    }
    for (let i = 0; i < titles.length; i++) {
        let checked = titles[i].split(" ");
        if (checked[0] == "Searched") {
            searched.push(titles[i]);

            // pushing splited word into key
            for (var j = 2; j < checked.length; j++) {
                let thisWord = checked[j];

                if (index[thisWord] == null) {
                    index[thisWord] = 1;
                    keys.push(thisWord);
                } else {
                    index[thisWord] += 1;
                }
            }

        } else if (checked[0] == "Visited") {
            visited.push(titles[i]);
        }

    }
    //console.log(searched);
    //console.log(visited);
    console.log(keys.length);
    keys.sort(function(a, b) {
        return index[b] - index[a];
    });

    document.getElementById("submit").addEventListener("click", function() {
        numInput = document.getElementById('numInput').value;
        //console.log(numInput);

    });
    //test : show every word count
    // for (var i = 0; i < keys.length; i++) {
    //     let key = keys[i];
    //     console.log(key, index[key]);
    // }

    //change state
    var hidden1 = document.getElementsByClassName("state1");
    var hidden2 = document.getElementsByClassName("state2");
    var hidden3 = document.getElementsByClassName("state3");

    document.getElementById("buttonState1").addEventListener("click", function() {
        console.log("state1");
        state = 1;
        for (let i = 0; i < hidden1.length; i++) {
            hidden1[i].style.display = "block";
        }
        for (let i = 0; i < hidden2.length; i++) {
            hidden2[i].style.display = "none";
        }
        for (let i = 0; i < hidden3.length; i++) {
            hidden3[i].style.display = "none";
        }
    });

    document.getElementById("buttonState2").addEventListener("click", function() {
        console.log("state2");
        state = 2;
        for (let i = 0; i < hidden1.length; i++) {
            hidden1[i].style.display = "none";
        }
        for (let i = 0; i < hidden2.length; i++) {
            hidden2[i].style.display = "block";
        }
        for (let i = 0; i < hidden3.length; i++) {
            hidden3[i].style.display = "none";
        }
    });

    document.getElementById("buttonState3").addEventListener("click", function() {
        console.log("state1");
        state = 3;
        for (let i = 0; i < hidden1.length; i++) {
            hidden1[i].style.display = "none";
        }
        for (let i = 0; i < hidden2.length; i++) {
            hidden2[i].style.display = "none";
        }
        for (let i = 0; i < hidden3.length; i++) {
            hidden3[i].style.display = "block";
        }
    });

}




function draw() {
    background(255);
    let x = 200;
    let maxLine = 334;
    let column = 2;

    if (state == 3) {

        //console.log(numInput);
        for (var i = 0; i < keys.length; i++) {
            let key = keys[i];
            // console.log(key, index[key]);
            //text(i + ".    " + index[key] + " : " + key, j * 200, (i + 1) * 15);
            if (index[key] == numInput) {
                console.log(key, index[key]);
                count += 1;
                row += 1;
                //counsole.log(count);

                // let gap = Math.floor(i / 100);
                if (count == maxLine) {
                    row = 1;
                    x = 200 * column;
                    maxLine += 333;
                    column += 1;

                }
                text(count + ".    " + key, x, row * 15);


            }
        }
        text("Amount of words  " + count, 0, 15);
        if (count == 0) {
            text("Not Match", 200, 15);
        }
        count = 0;
        row = 0;
        column = 2;
        maxLine = 334;
    } else if (state == 2) {
        for (var i = 0; i < keys.length; i++) {
            let key = keys[i];
            // console.log(key, index[key]);
            //text(i + ".    " + index[key] + " : " + key, j * 200, (i + 1) * 15);
            if (index[key] > 50 && index[key] < 100) {
                count += 1;
                row += 1;

                text(count + ".    " + key, x, row * 15);
                text("has been searched for     ", x + 150, row * 15);
                text(index[key] + "    times", x + 400, row * 15);

            }

        }
        text("Amount of words  " + count, 0, 15);
        count = 0;
        row = 0;
    } else if (state == 1) {
        for (var i = 0; i < keys.length; i++) {
            let key = keys[i];
            // console.log(key, index[key]);
            //text(i + ".    " + index[key] + " : " + key, j * 200, (i + 1) * 15);
            if (index[key] > 100) {
                count += 1;
                row += 1;

                text(count + ".    " + key, x, row * 15);
                text("has been searched for     ", x + 150, row * 15);
                text(index[key] + "    times", x + 400, row * 15);

            }

        }
        text("Amount of words  " + count, 0, 15);
        count = 0;
        row = 0;
    }


}