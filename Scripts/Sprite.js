class Sprite {
    constructor(x, y, w, h, image) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
    }

    draw() {
        image(this.image, this.x, this.y, this.width, this.height)
    }

    changeImage(image) {
        if (image) {
            this.image = image;
        }
    }
}