<script>
    export let imageSource
    
    var canvas
    var ready = false
    var ctx
    let cols = 3;
    let rows = 2;

    let totalFrames = 6; //Because there are 7 sprites in total. Therefore the animation will take place over 7 frames
    let currentFrame = [0,0];
    let srcX = 0;
    let srcY = 0;
    let framesDrawn = 0;
    let numOfImages = 1;

    const spriteSheet = new Image();
    let spriteWidth = spriteSheet.width / cols;
    let spriteHeight = spriteSheet.height / rows;
    spriteSheet.src = imageSource; //this needs to be an async

    function startAnim(node){
        canvas = node.target
        ready = true
        spriteSheet.src = imageSource; //make this async
        spriteWidth = spriteSheet.width / cols; // with promise .thend
        spriteHeight = spriteSheet.height / rows; //and this
        loadImages()
    }

    function stopAnim(node){
        ready = false
    }

    function init(node){
        canvas = node
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        ready = false
    }


    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height); // So the contents of the previous frame can be cleared
        if(!ready){ctx.clearRect(0,0,canvas.width,canvas.height); ctx = null; return;} //if hovered from the card - clear any context and return
        requestAnimationFrame(animate); //The function will be called repeatedly on each new frame

        if (currentFrame[0] === 3){
            currentFrame[0] = 0
            currentFrame[1] = currentFrame[1] + 1
        }
        if (currentFrame[1] == 2) {
            currentFrame[1] = 0
            currentFrame[0] = 0
        }

        currentFrame[0] = currentFrame[0] % totalFrames; //Work out the current frame of the animation. Remember that 0 counts as the first image of the animation.
        srcX = currentFrame[0] * spriteWidth; //Src position is updated to show the new sprite image
        srcY = currentFrame[1] * spriteHeight
        //image, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight
        ctx.save();
        resizeImage();
        ctx.drawImage(spriteSheet, srcX, srcY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        ctx.restore();

        framesDrawn++;
        if(framesDrawn >= 10){
            currentFrame[0]++;
            framesDrawn = 0;
        }
    }

    function resizeImage() {
        let scaleFactor = 1.3;
        let midXPos = innerWidth / 2 - (spriteWidth * scaleFactor) / 2;
        let midYPos = innerHeight / 2 - (spriteHeight * scaleFactor) / 2;
        ctx.translate(midXPos, midYPos);
        ctx.scale(scaleFactor, scaleFactor);
    }

    //So the canvas can't be rendered before the image

    function loadImages() {
        ctx = canvas.getContext("2d");
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        ctx.imageSmoothingEnabled = true;
        if(--numOfImages > 0) return;
        animate();
    }

/*     function init(node){
        let canvas = node;
        let ctx = canvas.getContext("2d");
        var image = new Image(60, 45)
        image.src = imageSource
        ctx.drawImage(image, 0, 0, 200, 150)
    } */
</script>


<canvas id="canvas" class="img-fluid" use:init on:mouseout={stopAnim} on:mouseover={startAnim}></canvas>