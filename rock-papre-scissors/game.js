let start = document.getElementById("start");
let main = document.getElementById("main");
setPosition(start);
let selectedIcon;
let selectedComp;
let arrIcon = Array.from(document.querySelectorAll(".icon"));
arrIcon = arrIcon.map(item => item.cloneNode(true));
let startButtom = document.querySelector("button.start");
let icons =document.querySelector(".icons");
icons.addEventListener("click", choice);
let contener = document.getElementById("contener") ;
startButtom.addEventListener('click', hide);
let winerPlaer = document.getElementById("winerPlaer");
let winerComp = document.getElementById("winerComp");
let second = document.getElementById("second");
let first = document.getElementById("first");
let imgRule = document.getElementById('imgRule');
let spancomp = document.getElementById("spancomp");
let mapDepend = {
    "scissors":["lizard","paper"],
    "lizard":["paper","spock"],
    "paper":["rock","spock"],
    "rock":["lizard","scissors"],
    "spock":["rock","scissors"]

};

function setPosition(elem) {
    let centerX = document.documentElement.clientWidth;
    let centerY = document.documentElement.clientHeight;
    let width = elem.offsetWidth;
    let height = elem.offsetHeight;
    elem.style.left = (centerX - width) / 2 + 'px';
    elem.style.top = (centerY - height) / 2 + 'px';
};


function hide(){
    main.hidden = !main.hidden;
    start.hidden = !start.hidden;
};

function choice(event){
    if(!event.target.closest(".icon")) return;
    selectedIcon = event.target.closest(".icon").cloneNode(true);
    icons.hidden = true;
    selectedIcon.setAttribute('id',"selectedIcon");
    first.append(selectedIcon);
    choiceComp();
};



function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};


let count = 0;
function showMessage(response){
    let div = document.createElement("div");
    div.setAttribute("id","contenerMessage");
    let divmassege = document.createElement('div');
    divmassege.setAttribute("id","message");
    let account= document.getElementById("account");
    switch(response){
        case "TIE":
            divmassege.innerHTML = response;
            break;
        case true:
            divmassege.innerHTML = "YOU WIN";
            count++;
            break;
        case false:
            divmassege.innerHTML = "YOU LOSE";
            count--;
            break; 
    }
    account.innerText = ""+ count;
    
    if(response && response !="TIE" ){
        
        winerPlaer.setAttribute("class","effect");
    } 
    if(!response){
       winerComp.setAttribute("class","effect");
    } 
    winerPlaer.after(div);
    div.prepend(divmassege);
    let button = document.createElement("div");
    button.innerHTML = "<button>PLAY AGAIN</button>";
    button.setAttribute("id","again");
    button.addEventListener('click', showIcons);
    div.append(button);
    div.hidden = false;
    
    function showIcons(){
    selectedComp.remove();
    selectedIcon.remove();
    spancomp.hidden=true;
    div.remove();
    icons.hidden = false;
}
};



function choiceComp(){
    let anknownImg = document.createElement('div');
    anknownImg.setAttribute('id',"anknownImg");
    contener.append(anknownImg);
    let value = getRandomInt(4);
    selectedComp = arrIcon[value];
    setTimeout(() => {
        anknownImg.remove();
        selectedComp.setAttribute('id',"selectedComp");
        second.append(selectedComp);
        spancomp.hidden = false;
        setTimeout(()=>showMessage(compare(selectedIcon.dataset.value, selectedComp.dataset.value)),500)
    },500);
    
};
function compare(value1, value2){ 
    if(value1 == value2) return "TIE";
    return mapDepend[value1].includes(value2);
};

let buttonRulse = document.querySelector(".buttonRulse");
buttonRulse.addEventListener('click', showRulse);

function showRulse(){
    imgRule.hidden = false;
    let pageRule = document.querySelector(".pageRule");
    setPosition(pageRule);
    let close = document.getElementById("close");
    close.addEventListener("click", closeRulse);
}

function closeRulse(event){
    imgRule.hidden = true;
}
