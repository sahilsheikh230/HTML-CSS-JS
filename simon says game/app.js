let gameseq = [];
let userseq = [];
let btnn = ["one", "two", "three", "four"];
let level = 0;
let started = false;

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        levelup();
    }
});
function flash(button) {
    button.classList.add("flash");
    setTimeout(function () {
        button.classList.remove("flash");
    }, 250);
}

function levelup() {
    
    userseq=[];
    level++;
    let h5 = document.querySelector("h5");
    h5.innerText = `level ${level}`;
    let random = Math.floor(Math.random() * 3);
    let randomc = btnn[random];
    let randbtn = document.querySelector(`.${randomc}`);
    flash(randbtn);
gameseq.push(randomc);
    }


    function check(idx){
        if(userseq[idx]==gameseq[idx])
        {
        
            if(userseq.length==gameseq.length){
                
            levelup();
        }
        }
        else{
            
            let h5 = document.querySelector("h5");
            

            h5.innerText=`Game over! Your score was ${level} Press any key to Start again`;
         reset();
         
        }
    }
function btnpress(){
    let btn=this;
    flash(btn);
    let usecolor=btn.getAttribute("id");
userseq.push(usecolor);
check(userseq.length-1);
}
let allbtns=document.querySelectorAll(".btn");
for(btns of allbtns){
    
    btns.addEventListener("click",btnpress);
}
function reset(){
    started=false;
    userseq=[];
    gameseq=[];
    level=0;
}
