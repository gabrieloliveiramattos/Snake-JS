const edgeEl = document.getElementById('edge');
const scoreEl = document.getElementById('score');
const recordEl = document.getElementById('record');

window.onload = function(){
    var arena = document.getElementById("arena");
    var ctx = arena.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 80);

    const vel = 1;
    var velX = velY = 0;
    var pontoX = pontoY = 10;
    var tamanhoPecas = 15;
    var qtdPecas = 40;
    var appleX = appleY = Math.floor(Math.random()*qtdPecas);
    var trail = [];
    tail = 5;

    function game(){
        pontoX += velX;
        pontoY += velY;
        
        if(edgeEl.checked){
            if (pontoX <0) {
                pontoX = qtdPecas-1;
            }
            if (pontoX > qtdPecas - 1) {
                pontoX = 0;
            }
            if (pontoY < 0) {
                pontoY = qtdPecas-1;
            }
            if (pontoY > qtdPecas - 1) {
                pontoY = 0;
            }
        }else{
            if (pontoX <0) {
                pontoX = pontoY = 10;
                velX = velY = 0;
                tail = 5;
                score();
            }
            if (pontoX > qtdPecas - 1) {
                pontoX = pontoY = 10;
                velX = velY = 0;
                tail = 5;
                score();
            }
            if (pontoY < 0) {
                pontoX = pontoY = 10;
                velX = velY = 0;
                tail = 5;
                score();
            }
            if (pontoY > qtdPecas - 1) {
                pontoX = pontoY = 10;
                velX = velY = 0;
                tail = 5;
                score();
            }
        }

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, arena.width, arena.height);

        ctx.fillStyle = "#ff0000";
        ctx.fillRect(appleX * tamanhoPecas, appleY * tamanhoPecas, tamanhoPecas, tamanhoPecas);

        ctx.fillStyle = "#666666";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tamanhoPecas, trail[i].y * tamanhoPecas, tamanhoPecas - 1, tamanhoPecas - 1);
            if (trail[i].x == pontoX && trail[i].y == pontoY)
            {
                pontoX = pontoY = 10;
                velX = velY = 0;
                tail = 5;
                score();
            }
        }

        trail.push({x:pontoX, y:pontoY})

        while (trail.length > tail) {
            trail.shift();
        }

        if (appleX==pontoX && appleY==pontoY){
            tail++;
            appleX = Math.floor(Math.random()*qtdPecas);
            appleY = Math.floor(Math.random()*qtdPecas);
            scoreEl.innerHTML = trail.length-4;
        }
    }

    function score(){
        if(recordEl.innerHTML < scoreEl.innerHTML){
            recordEl.innerHTML = scoreEl.innerHTML;
        }
    }

    function keyPush(event){
        switch (event.keyCode) {
            case 37: case 65: // Left
                velX = -vel;
                velY = 0;
                break;
            case 38: case 87: // Up
                velX = 0;
                velY = -vel;
                break;
            case 39: case 68: // Right
                velX = vel;
                velY = 0;
                break;
            case 40: case 83: // Down
                velX = 0;
                velY = vel;
                break;			
            default:

                break;
        }
    }
}