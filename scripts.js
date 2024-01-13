const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;
var paused = false

let audioPlayed = false;
let audio = new Audio('.\\audio\\backgroundMusic.mp3');
audio.volume = 0.3;

function playAudio() {
    if (!audioPlayed) {
        audio.play();
        audioPlayed = true;
    }
}


const playAgain = () => {
    window.location.reload();
}

const hideInstructions = () => {
    var x = document.getElementById("Instructions")
    if (x.style.display !== "none") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
    console.log("loki")
}

const pause = () => {
    alert('Game Paused')
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: '.\\images\\Background\\Final copy.png'
})


const shop = new Sprite({
    position: {
        x: 700,
        y: 212
    },
    imageSrc: '.\\images\\Background\\shop_anim.png',
    scale: 2.2,
    frameMax: 6,
})


const NPC = new Sprite({
    position: {
        x: 430,
        y: 130,
    },
    imageSrc: '.\\images\\mage_guardian_free_creativekind\\mage_guardian-magenta.png',
    scale: 2.5,
    frameMax: 14,
})


const backgroundAssest = new Sprite({
    position: {
        x: -35,
        y: 190,
    },
    imageSrc: '.\\images\\Background\\FlyingObelisk_Simple\\FlyingObelisk_no_lightnings_no_letter.png',
    scale: 0.8,
    frameMax: 13,
})


const player = new Zaraki({
    position: {
        x: 100,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x: 0,
        y: 0,
    },
    imageSrc: '.\\images\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Idle.png',
    frameMax: 8,
    scale: 2,
    offset: {
        x: 215,
        y: 184,
    },
    sprites: {
        idle: {
            imageSrc: '.\\images\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Idle.png',
            frameMax: 8,
        },
        run1: {
            imageSrc: '.\\images\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Run.png',
            frameMax: 8,
        },
        run2: {
            imageSrc: '.\\images\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Run2.png',
            frameMax: 8,
        },
        jump: {
            imageSrc: '.\\images\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Jump.png',
            frameMax: 2,
        },
        fall: {
            imageSrc: '.\\images\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Fall.png',
            frameMax: 2,
        },
        attack1: {
            imageSrc: '.\\images\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Attack1.png',
            frameMax: 8
        },
        attack2: {
            imageSrc: '.\\images\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Attack2.png',
            frameMax: 8,
        },
        attack3: {

        },
        hit: {
            imageSrc: '.\\images\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Take hit.png',
            frameMax: 3,
        },
        death: {
            imageSrc: '.\\images\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Death.png',
            frameMax: 7
        },
    },
    onGround: true,
    attackBox: {
        offset: {
            x: -100,
            y: -50
        },
        width: 130,
        height: 50,
    }

})

const enemy = new Zaraki({
    position: {
        x: 700,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    onGround: true,
    color: 'blue',
    offset: {
        x: 50,
        y: 0,
    },
    imageSrc: '.\\images\\Fantasy Warrior\\Sprites\\Idle.png',
    frameMax: 10,
    scale: 2.4,
    offset: {
        x: 215,
        y: 91,
    },
    sprites: {
        idle: {
            imageSrc: '.\\images\\Fantasy Warrior\\Sprites\\Idle.png',
            frameMax: 10,
        },
        run1: {
            imageSrc: '.\\images\\Fantasy Warrior\\Sprites\\Run.png',
            frameMax: 8,
        },
        run2: {
            imageSrc: '.\\images\\Fantasy Warrior\\Sprites\\Run2.png',
            frameMax: 8,
        },
        jump: {
            imageSrc: '.\\images\\Fantasy Warrior\\Sprites\\Jump.png',
            frameMax: 3,
        },
        fall: {
            imageSrc: '.\\images\\Fantasy Warrior\\Sprites\\Fall.png',
            frameMax: 3,
        },
        attack1: {
            imageSrc: '.\\images\\Fantasy Warrior\\Sprites\\Attack1.png',
            frameMax: 7
        },
        attack2: {
            imageSrc: '.\\images\\Fantasy Warrior\\Sprites\\Attack2.png',
            frameMax: 7,
        },
        attack3: {
            imageSrc: '.\\images\\Fantasy Warrior\\Sprites\\Attack3.png',
            frameMax: 8,
        },
        attack4: {
            imageSrc: '.\\images\\Fantasy Warrior\\Sprites\\test.png',
            frameMax: 18,
        },
        hit: {
            imageSrc: '.\\images\\Fantasy Warrior\\Sprites\\Take hit.png',
            frameMax: 3,
        },
        death: {
            imageSrc: '.\\images\\Fantasy Warrior\\Sprites\\Death.png',
            frameMax: 7
        },
    },
    
    attackBox: {
        offset: {
            x: 150,
            y: -50
        },
        width: 120,
        height: 50,
    }


})


// enemy.draw();
// player.draw();

const keys = {
    //Player Keys
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    Shift: {
        pressed: false
    },
    //Enemy Keys
    ArrowUp: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    p: {
        pressed: false
    },
    u: {
        pressed: false
    },

}


decreaseTimer();

const animate = () => {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update()
    backgroundAssest.update();
    shop.update();
    NPC.update();

    // c.fillStyle = 'rgba(33,25,225,0.15)'
    // c.fillRect(0,0, canvas.width, canvas.height)
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //Palyer movement:

    if (keys.a.pressed && player.lastKey == 'a') {
        player.velocity.x = -5;
        player.switchSprite('run2');

    } else if (keys.d.pressed && player.lastKey == 'd') {
        player.velocity.x = 5;
        player.switchSprite('run1');
    } else if (keys.w.pressed && player.lastKey == 'w') {
        player.velocity.y = -20;
    } else {
        player.switchSprite('idle');
    }

    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }



    //Enemy movement:
    else if (keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run1');
    } else if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run2');
    } else if (keys.ArrowUp.pressed && enemy.lastKey == 'ArrowUp') {
        enemy.velocity.y = -20;
    } else {
        enemy.switchSprite('idle');
    }

    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    }



    //Collision:
    if (rectCollision({
            rect1: player,
            rect2: enemy
        }) &&
        player.isAttacking && player.frameCurrent == 3) {
        enemy.takeHit();
        player.isAttacking = false;
        // document.getElementById("enemyHealth").style.width = enemy.health + '%';

        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })


    }

    if (player.isAttacking && player.frameCurrent == 3) {
        player.isAttacking = false;
    }

    if (rectCollision({
            rect1: enemy,
            rect2: player
        }) &&
        enemy.isAttacking && enemy.frameCurrent == 4) {
        player.takeHit();
        enemy.isAttacking = false;
        // document.getElementById("playerHealth").style.width = player.health + '%';

        gsap.to('#playerHealth', {
            width: player.health + '%'
        })


    }
    if (enemy.isAttacking && enemy.frameCurrent == 4) {
        enemy.isAttacking = false;
    }

    //Game Over:
    if (enemy.health <= 0 || player.health <= 0) {
        winnerDec({
            player,
            enemy,
            timerID,
        })
    }

}


animate();


window.addEventListener('keydown', (event) => {
    // console.log(event.key)
    //Player Keys
    if (!player.dead) {
        switch (event.key) {
            case 'd':
                playAudio();
                keys.d.pressed = true;
                player.lastKey = 'd';
                break
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break
            case 'w':
                if (player.onGround && !keys.w.pressed) { // Check if on ground and W not already pressed
                    player.velocity.y = -20; // Jump velocity
                    player.onGround = false;
                }
                keys.w.pressed = true;
                break;
            case ' ':
                player.attack1();
                break;
            case 'Shift':
                player.attack2();
                break;
            case 'p':
                pause()
                player.lastKey = 'p'
        }
    }

    //Enemey Keys
    if (!enemy.dead) {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
                break
            case 'ArrowLeft':
                playAudio();
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
                break
            case 'ArrowUp':
                if (enemy.onGround && !keys.ArrowUp.pressed) { // Check if on ground and W not already pressed
                    enemy.velocity.y = -20; // Jump velocity
                    enemy.onGround = false;
                }
                keys.ArrowUp.pressed = true;
                break;
            case 'ArrowDown':
                enemy.attack1();
                break;
            case '.':
                enemy.attack2();
                break;
            case 'm':
                enemy.attack3();
                break;
            case 'u':
                enemy.attack4();
                break;

        }
    }

    // console.log(event.key);
})

window.addEventListener('keyup', (event) => {

    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        case 'w':
            keys.w.pressed = false;
            break
    }


    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break
    }
    // console.log(event.key);
})

// To prevent browser from auto scrolling
window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);