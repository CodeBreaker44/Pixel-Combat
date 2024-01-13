class Sprite {
    constructor({
        position,
        imageSrc,
        scale = 1,
        frameMax = 1,
        offset = {
            x: 0,
            y: 0
        },

    }) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.frameMax = frameMax;
        this.frameCurrent = 0;
        this.framElapsed = 0;
        this.framesHold = 7;
        this.offset = offset;
    }
    draw() {
        c.drawImage(
            this.image,
            this.frameCurrent * (this.image.width / this.frameMax),
            0,
            this.image.width / this.frameMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.frameMax) * this.scale,
            this.image.height * this.scale
        )
    }

    animateFrame() {
        this.framElapsed++;

        if (this.framElapsed % this.framesHold == 0) {
            if (this.frameCurrent < this.frameMax - 1) {
                this.frameCurrent++;
            } else {
                this.frameCurrent = 0;
            }
        }
    }

    update() {
        this.draw();
        this.animateFrame();
    }

}


class Zaraki extends Sprite {
    constructor({
        position,
        velocity,
        color = 'red',
        imageSrc,
        scale = 1,
        frameMax = 1,
        offset = {
            x: 0,
            y: 0
        },
        sprites,
        attackBox = {
            offset: {

            },
            width: undefined,
            height: undefined,
        }
    }) {
        super({
            position,
            imageSrc,
            scale,
            frameMax,
            offset
        });
        this.onGround = true;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        }

        this.color = color;
        this.isAttacking;
        this.health = 100;
        this.frameCurrent = 0;
        this.framElapsed = 0;
        this.framesHold = 7;
        this.sprites = sprites;
        this.dead = false

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

    }


    update() {
        this.draw();
        if (!this.dead) this.animateFrame()

        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y - this.attackBox.offset.y;
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y;



        if (this.position.y + this.height >= canvas.height - 84) {
            this.velocity.y = 0;
            this.position.y = canvas.height - this.height - 84; // Adjust position to be on ground
            this.onGround = true;
        } else {
            this.velocity.y += gravity;
            this.onGround = false;
        }
    }

    attack1() {
        this.switchSprite('attack1');
        this.isAttacking = true;
    }
    attack2() {
        this.switchSprite('attack2');
        this.isAttacking = true;
    }
    attack3() {
        this.switchSprite('attack3');
        this.isAttacking = true;
    }
    attack4() {
        this.switchSprite('attack4');
        this.isAttacking = true;
    }

    takeHit() {
        this.health -= 7;

        if (this.health <= 0) {
            this.switchSprite('death')
        } else this.switchSprite('hit')
    }

    switchSprite(sprite) {
        if (this.image == this.sprites.death.image) {

            if (this.frameCurrent == this.sprites.death.frameMax - 1)
                this.dead = true;
            return
        }

        // if (this.image == this.sprites.attack4.image &&
        //     this.frameCurrent < this.sprites.attack4.frameMax - 1)
        //     return

        if (this.image == this.sprites.attack1.image &&
            this.frameCurrent < this.sprites.attack1.frameMax - 1)
            return

        if (this.image == this.sprites.attack2.image &&
            this.frameCurrent < this.sprites.attack2.frameMax - 1)
            return

        if (this.image == this.sprites.attack3.image &&
            this.frameCurrent < this.sprites.attack3.frameMax - 1)
            return

        if (this.image == this.sprites.hit.image &&
            this.frameCurrent < this.sprites.hit.frameMax - 1)
            return

        switch (sprite) {
            case 'idle':
                if (this.image != this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.frameMax = this.sprites.idle.frameMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'run1':
                if (this.image != this.sprites.run1.image) {
                    this.image = this.sprites.run1.image;
                    this.frameMax = this.sprites.run1.frameMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'run2':
                if (this.image != this.sprites.run2.image) {
                    this.image = this.sprites.run2.image;
                    this.frameMax = this.sprites.run2.frameMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'jump':
                if (this.image != this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.frameMax = this.sprites.jump.frameMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'fall':
                if (this.image != this.sprites.fall.image) {
                    this.image = this.sprites.fall.image;
                    this.frameMax = this.sprites.fall.frameMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'attack1':
                if (this.image != this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image;
                    this.frameMax = this.sprites.attack1.frameMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'attack2':
                if (this.image != this.sprites.attack2.image) {
                    this.image = this.sprites.attack2.image;
                    this.frameMax = this.sprites.attack2.frameMax;
                    this.frameCurrent = 0;
                }
                break;

            case 'attack3':
                if (this.image != this.sprites.attack3.image) {
                    this.image = this.sprites.attack3.image;
                    this.frameMax = this.sprites.attack3.frameMax;
                    this.frameCurrent = 0;
                }
                break;
                
            case 'attack4':
                if (this.image != this.sprites.attack4.image) {
                    this.image = this.sprites.attack4.image;
                    this.frameMax = this.sprites.attack4.frameMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'hit':
                if (this.image != this.sprites.hit.image) {
                    this.image = this.sprites.hit.image;
                    this.frameMax = this.sprites.hit.frameMax;
                    this.frameCurrent = 0;
                }
                break;

            case 'death':
                if (this.image != this.sprites.death.image) {
                    this.image = this.sprites.death.image;
                    this.frameMax = this.sprites.death.frameMax;
                    this.frameCurrent = 0;
                }
                break;
        }
    }
}