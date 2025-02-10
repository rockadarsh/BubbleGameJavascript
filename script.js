var timer=60;
var score=0;
var hitrn=0;
function increasescore()
{
    score+=10;
    document.querySelector("#scoreval").textContent=score;
}
function getnewhhit()
{
    hitrn= Math.floor(Math.random()*10);
   document.querySelector("#hitval").textContent=hitrn;
}
function makebubble()
{
var clutter="";
for(var i=1;i<=84;i++)
{
    var num=Math.floor(Math.random()*10);
    clutter+=`<div class="bubble">${num}</div>`;

}
document.querySelector("#pbtm").innerHTML=clutter;
}
function runTimer()
{
    const difficulty = document.querySelector("#difficulty").value;
    if(difficulty == "extreme-easy") {
        timer = 30;
    }else if(difficulty === "easy") {
        timer = 60;
    }else if(difficulty === "medium") {
        timer = 120;
    }else if(difficulty === "hard") {
        timer = 180;
    }
    else{
        timer = 300;
    }
    score=0;
    hitrn=0;
    var timerint=setInterval(function(){
        if (timer > 0) {
            timer--;
            document.querySelector("#timerval").textContent = timer;
        } else {
            clearInterval(timerint);
            panel.classList.add("hidden");
            endPage.classList.remove("hidden");
            endPage.querySelector("#finalscore").innerHTML=score;
            // Leaderboard
            const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
            const myName = document.getElementById("name").value || "Unknown"
            leaderboard.push({name: myName, score: score, playedAt: new Date().toLocaleString(), difficulty: 
                document.querySelector("#difficulty").options[document.querySelector("#difficulty").selectedIndex].text
            });
            leaderboard.sort((a, b) => b.score - a.score);
            // save top 10 scores
            localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 10)));
            // Sort leaderboard by score
            // Display leaderboard
            const leaderboardTable = document.querySelector("#leaderboardTable tbody");
            leaderboardTable.innerHTML = "";
            for (let i = 0; i < leaderboard.length; i++) {
                
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${i + 1}</td>
                    <td>${leaderboard[i].name}</td>
                    <td>${leaderboard[i].difficulty}</td>
                    <td>${leaderboard[i].score}</td>
                    <td>${leaderboard[i].playedAt}</td>
                    `;
                leaderboardTable.appendChild(row);
            }
            
        }
        
    },1000);
}
function playStart(){
    if(!startPage.classList.contains("hidden")){
        startPage.classList.add("hidden");
    }
    if(panel.classList.contains("hidden")){
        panel.classList.remove("hidden");
    }
    if(!endPage.classList.contains("hidden")){
        endPage.classList.add("hidden");
    }
    document.querySelector("#pbtm").innerHTML="";
    runTimer();
    makebubble();
    getnewhhit();
}
document.querySelector("#pbtm").addEventListener("click",function(details){
 var clickednum =Number(details.target.textContent);
    if(clickednum==hitrn)
    {
        increasescore();
        getnewhhit();
        makebubble();
    }
})

