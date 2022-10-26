const rectCollision = ({
    rect1,
    rect2
}) => {
    return (
        rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
        rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
        rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
        rect1.attackBox.position.y <= rect2.position.y + rect2.height)
}


const winnerDec = ({
    player,
    enemy,
    timerID
}) => {
    clearTimeout(timerID)
    document.getElementById("bankai").style.display = 'flex';
    if (player.health == enemy.health) {
        document.getElementById("bankai").innerHTML = 'Tie';
    }
    if (player.health > enemy.health) {
        document.getElementById("bankai").innerHTML = 'Gandalf Wins';
    }
    if (enemy.health > player.health) {
        document.getElementById("bankai").innerHTML = 'Aragorn Wins';
    }

}

let timer = 60;
let timerID;
const decreaseTimer = () => {
    if (timer > 0) {
        timerID = setTimeout(decreaseTimer, 1000)
        timer--;
        document.getElementById("timers").innerHTML = timer;
    }

    if (timer == 0) {
        winnerDec({
            player,
            enemy,
            timerID,
        });
    }

}