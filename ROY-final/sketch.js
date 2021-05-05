let allReactions = [];
let obj;
let reactions = [];

let textRect = ["LIKE", "LOVE", "HAHA", "SORRY", "ANGRY", "WOW"];
let color = ["#6495ED", "#FF7F50", "#FFD700", "#4B0082", "#B22222", "#FF69B4"];

let col = 0;
let font;

let like = 0;
let love = 0;
let haha = 0;
let sorry = 0;
let angry = 0;
let wow = 0;

let count = [0, 0, 0, 0, 0, 0];


function preload() {
    console.log("loading");
    obj = loadJSON("reactions.json");

    font = loadFont("fontDBHevent.ttf");
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    //get length of json obj.
    var JSONlength = obj.reactions.length;

    //push JSON into an array
    for (var i = 0; i < JSONlength; i++) {

        //UNIX TIME when facebook start using reaction. 2016/2/24
        if (obj.reactions[i].timestamp > 1456275600) {
            allReactions.push(obj.reactions[i]);
        }
    }

    // console.log(allReactions);

    for (let i = 0; i < allReactions.length; i++) {
        // console.log();
        reactions.push(allReactions[i].data[0].reaction.reaction);
    }
    console.log(reactions.length);

    background(255);
    noStroke();

    let size = 7;
    let x = 0;
    let y = 100;
    let gap = 3;

    for (let i = 0; i < reactions.length; i++) {
        if (reactions[i] == "LIKE") {
            //blue
            col = color[0];
            like++;
            count[0]++;
        } else if (reactions[i] == "LOVE") {
            //salmon
            col = color[1];
            love++;
            count[1]++;
        } else if (reactions[i] == "HAHA") {
            //yellow
            col = color[2];
            haha++;
            count[2]++;
        } else if (reactions[i] == "SORRY") {
            //indigo
            col = color[3];
            sorry++;
            count[3]++;
        } else if (reactions[i] == "ANGRY") {
            //red
            col = color[4];
            angry++;
            count[4]++;
        } else if (reactions[i] == "WOW") {
            //pink
            col = color[5];
            wow++;
            count[5]++;
        }
        fill(col);


        rect(x, y, size - gap, size - gap);

        if (x >= width) {
            x = 0;
            y += size;
        } else {
            x += size;
        }
    }

    let textX = 100;
    let textY = 20;
    textFont(font);
    textSize(20);

    for (let i = 0; i < textRect.length; i++) {

        fill(color[i]);
        if (i == 0) {
            text(textRect[i], textX * (i + 1), textY);
            text(count[0], textX * (i + 1), textY + 20);
            rect(textX * (i + 1), 50, 20, 20);
        } else {
            let box = font.textBounds(textRect[i - 1], textX * (i + 1), textY, 20);
            text(textRect[i], (textX * (i + 1)) + box.w, textY);
            text(count[i], (textX * (i + 1)) + box.w, textY + 20);
            rect((textX * (i + 1)) + box.w, 50, 20, 20);
        }

    }

    fill(100, 100, 100);
    text("TOTAL", 20, textY);
    text(reactions.length, 20, 40);

}

function draw() {

}