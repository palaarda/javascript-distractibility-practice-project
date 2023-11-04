var mP = document.getElementById("mspp");
var sP = document.getElementById("soundPad");
var number = document.getElementById("number");
var nmbD = 0
var clr = 0

function showWp(){
    if (mP.style.display === "flex") {
        mP.style.display = "none";
        } else {
        mP.style.display = "flex";
    }
}
function showsP(){
    if (sP.style.display === "flex") {
        sP.style.display = "none";
        } else {
        sP.style.display = "flex";
    }
}
function addNmb(){
    nmbD++
    number.innerHTML = nmbD
}
function clearNmb(){
    nmbD = 0
    number.innerHTML = clr
}