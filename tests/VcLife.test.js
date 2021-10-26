const mocha = require('mocha');
const chai = require('chai');

const assert = chai.assert;

const VcLife = require('../assets/js/VcLife');
let life = new VcLife;

describe("createField", function() {
    it("create a field of the specified size", function() {
        assert.equal(JSON.stringify(life.createField(3, 3)), JSON.stringify([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]));
    });
});

describe("addGlider", function() {
    it("add a glider to the field", function() {
        life.field = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];

        life.addGlider(0, 0);
        
        assert.equal(JSON.stringify(life.field), JSON.stringify([
            [0, 0, 1],
            [1, 0, 1],
            [0, 1, 1],
        ]));
    });
});

describe("rotateMatrixInField", function() {
    it("clockwise rotation of the matrix of the specified size on the field", function() {
        life.field = [
            [0, 0, 1],
            [1, 0, 1],
            [0, 1, 1],
        ];

        life.rotateMatrixInField(1, 1, 2);
        
        assert.equal(JSON.stringify(life.field), JSON.stringify([
            [0, 0, 1],
            [1, 1, 0],
            [0, 1, 1],
        ]));
    });
});

describe("rotateMatrix", function() {
    it("clockwise rotation of the matrix", function() {
        let matrix = [
            [0, 1, 0],
            [1, 1, 0],
            [0, 0, 1],
        ];
        
        assert.equal(JSON.stringify(life.rotateMatrix(matrix)), JSON.stringify([
            [0, 1, 0],
            [0, 1, 1],
            [1, 0, 0],
        ]));
    });
});

describe("getMatrixFromField", function() {
    it("get a part of a field of a given size by coordinates", function() {
        life.field = [
            [0, 1, 0],
            [1, 1, 0],
            [0, 0, 1],
        ];
        
        assert.equal(JSON.stringify(life.getMatrixFromField(1, 1, 2)), JSON.stringify([
            [1, 0],
            [0, 1],
        ]));
    });

    it("get a part of a field of a given size by coordinates outside the range", function() {
        life.field = [
            [0, 1, 0],
            [1, 1, 0],
            [0, 0, 1],
        ];
        
        assert.equal(JSON.stringify(life.getMatrixFromField(2, 1, 2)), JSON.stringify([
            [0, 1],
            [1, 0],
        ]));
    });
});

describe("setMatrixToField", function() {
    it("replace part of the field with a matrix at the specified coordinates", function() {
        life.field = [
            [0, 1, 0],
            [1, 1, 0],
            [0, 0, 1],
        ];

        life.setMatrixToField(1, 1, [
            [0, 1],
            [1, 0],
        ]);
        
        assert.equal(JSON.stringify(life.field), JSON.stringify([
            [0, 1, 0],
            [1, 0, 1],
            [0, 1, 0],
        ]));
    });

    it("replace part of the field with a matrix at the specified coordinates outside the range", function() {
        life.field = [
            [0, 1, 0],
            [1, 1, 0],
            [0, 0, 1],
        ];

        life.setMatrixToField(2, 1, [
            [1, 0],
            [1, 0],
        ]);
        
        assert.equal(JSON.stringify(life.field), JSON.stringify([
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1],
        ]));
    });
});

describe("determineLife", function() {
    it("determine the beginning of life by the number of living neighbors", function() {
        assert.equal(life.determineLife(0), false);
        assert.equal(life.determineLife(1), false);
        assert.equal(life.determineLife(2), false);
        assert.equal(life.determineLife(3), true);
        assert.equal(life.determineLife(4), false);
    });

    it("determine the continuation of life by the number of living neighbors", function() {
        assert.equal(life.determineLife(0, true), false);
        assert.equal(life.determineLife(1, true), false);
        assert.equal(life.determineLife(2, true), true);
        assert.equal(life.determineLife(3, true), true);
        assert.equal(life.determineLife(4, true), false);
    });
});

describe("countNeighbors", function() {
    it("counting live neighbors", function() {
        life.field = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        assert.equal(life.countNeighbors(0, 0), 0);

        life.field[0][0] = 1;
        assert.equal(life.countNeighbors(0, 0), 0);

        life.field[0][1] = 1;
        assert.equal(life.countNeighbors(0, 0), 1);

        life.field[1][0] = 1;
        assert.equal(life.countNeighbors(0, 0), 2);

        life.field[2][2] = 1;
        assert.equal(life.countNeighbors(0, 0), 3);

        life.field[2][0] = 1;
        assert.equal(life.countNeighbors(0, 0), 4);
    });
});

describe("getCell", function() {
    it("get the cell value by coordinates, even beyond the range", function() {
        life.field = [
            [1, 0, 0],
            [0, 0, 0],
            [0, 0, 1],
        ];

        assert.equal(life.getCell(-1, -1), 1);
        assert.equal(life.getCell(0, 0), 1);
        assert.equal(life.getCell(1, 1), 0);
        assert.equal(life.getCell(2, 2), 1);
        assert.equal(life.getCell(3, 3), 1);
    });
});

describe("setCell", function() {
    it("set the cell value by coordinates, even beyond the range", function() {
        life.field = [
            [1, 0, 0],
            [0, 0, 0],
            [0, 0, 1],
        ];

        life.setCell(4, 4, 1);

        assert.equal(JSON.stringify(life.field), JSON.stringify([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ]));
    });
});

describe("getRealCoordinates", function() {
    it("get real coordinates by coordinates outside the range", function() {
        life.field = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];

        assert.equal(JSON.stringify(life.getRealCoordinates(4, 4)), JSON.stringify([1, 1]));
    });
});

describe("getFieldHtml", function() {
    it("output of the field in html format", function() {
        life.field = [
            [1, 0, 0],
            [0, 0, 0],
            [0, 0, 1],
        ];
        let html = 
            '<div class="row"><div class="life"></div><div></div><div></div></div>'
            + '<div class="row"><div></div><div></div><div></div></div>'
            + '<div class="row"><div></div><div></div><div class="life"></div></div>'
        ;

        assert.equal(life.getFieldHtml(), html);
    });
});

describe("step", function() {
    it("game step, changing the field according to the rules", function() {
        life.field = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
        ];
        let fieldAfterStep = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ];

        life.step();

        assert.equal(JSON.stringify(life.field), JSON.stringify(fieldAfterStep));
    });

    it("game step, glider movement", function() {
        life.field = [
            [0, 0, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ];
        let fieldAfterStep = [
            [0, 1, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ];

        life.step();

        assert.equal(JSON.stringify(life.field), JSON.stringify(fieldAfterStep));
    });
});