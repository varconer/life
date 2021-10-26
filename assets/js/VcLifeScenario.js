class VcLifeScenario {
    life;

    setTwoGlidersCollision() {
        this.life = new VcLife(20, 20);
        this.life.addGlider(1, 1);
        this.life.addGlider(16, 16);
        this.life.rotateMatrixInField(16, 16, 3);
        this.life.rotateMatrixInField(16, 16, 3);
    }

    setFourGlidersCollision() {
        this.life = new VcLife(20, 20);

        this.life.addGlider(1, 1);
        
        this.life.addGlider(16, 1);
        this.life.rotateMatrixInField(16, 1, 3);

        this.life.addGlider(1, 16);
        this.life.rotateMatrixInField(1, 16, 3);
        this.life.rotateMatrixInField(1, 16, 3);
        this.life.rotateMatrixInField(1, 16, 3);

        this.life.addGlider(16, 16);
        this.life.rotateMatrixInField(16, 16, 3);
        this.life.rotateMatrixInField(16, 16, 3);
    }

    setEightGlidersCollision(size = 20) {
        if (size < 20) size = 20;

        this.life = new VcLife(size, size);

        this.life.addGlider(6, 1);
        this.life.addGlider(1, 6);
        
        this.life.addGlider(size - 9, 1);
        this.life.rotateMatrixInField(size - 9, 1, 3);
        this.life.addGlider(size - 4, 6);
        this.life.rotateMatrixInField(size - 4, 6, 3);

        this.life.addGlider(1, size - 9);
        this.life.rotateMatrixInField(1, size - 9, 3);
        this.life.rotateMatrixInField(1, size - 9, 3);
        this.life.rotateMatrixInField(1, size - 9, 3);
        this.life.addGlider(6, size - 4);
        this.life.rotateMatrixInField(6, size - 4, 3);
        this.life.rotateMatrixInField(6, size - 4, 3);
        this.life.rotateMatrixInField(6, size - 4, 3);
        this.life.addGlider(size - 4, size - 9);
        this.life.rotateMatrixInField(size - 4, size - 9, 3);
        this.life.rotateMatrixInField(size - 4, size - 9, 3);
        this.life.addGlider(size - 9, size - 4);
        this.life.rotateMatrixInField(size - 9, size - 4, 3);
        this.life.rotateMatrixInField(size - 9, size - 4, 3);
    }

    run(node, interval = 500) {
        node.innerHTML = this.life.getFieldHtml();
        let timer = setInterval(() => {
            this.life.step();
            node.innerHTML = this.life.getFieldHtml();
        }, interval);

        return timer;
    }

    stop(timer) {
        if (timer) clearInterval(timer);
    }
}