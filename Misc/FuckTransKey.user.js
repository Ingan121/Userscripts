// ==UserScript==
// @name         FuckTransKey
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.neis.go.kr/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=go.kr
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    /* let x = [], y = [];
    for (let j = 1; j <= 5; j++) y[y.length] = 36 + (38 * j) + (2 * (j-1)) - 19;
    for (let i = 1; i <= 14; i++) x[x.length] = 13 + (38 * i) + (2 * (i-1)) - 19; */

    const xCoords = [32, 72, 112, 152, 192, 232, 272, 312, 352, 392, 432, 472, 512, 552],
          yCoords = [55, 95, 135, 175, 215];

    let initializedCanvas = false;
    let dummyKeys = [];
    let y0 = '1234567890', y1 = 'qwert..yuiop', y2 = '.asdf..ghjk.', y3 = '..zxcvbnml..';

    document.onkeydown = e => {
        if (!tk.now) return;
        initializeCanvas();
        let index = [-1, -1];

        const key = e.key.toLowerCase();
        const keyInt = parseInt(key);
        switch (e.key) {
            case '`':
                index = [0, 0];
                break;

            case '-':
                index = [2, 5];
                break;

            case '=':
                iindex = [3, 5];
                break;

            case 'Backspace':
                index = [13, 0];
                break;

            case 'Enter':
                index = [13, 3];
                break;

            default:
                if (!isNaN(key)) {
                    const isDummyBefore1 = dummyKeys[0][0] == 1;
                    console.log(isDummyBefore1);
                    console.log(keyInt);
                    switch (keyInt) {
                        case 0:
                            console.log(1111111)
                            index = isDummyBefore1 ? [11, 0] : [12, 0];
                            break;

                        case 1:
                            index = isDummyBefore1 ? [2, 0] : [1, 0];
                            break;

                        default:
                            index = [keyInt + 1, 0];
                            break;
                    }
                } else if (y1.includes(key)) {
                    index = [y1.indexOf(key), 1];
                } else if (y2.includes(key)) {
                    index = [y2.indexOf(key), 2];
                } else if (y3.includes(key)) {
                    index = [y3.indexOf(key), 3];
                }
        }

        if (index[0] != -1) tk.start({ layerX: xCoords[index[0]], layerY: yCoords[index[1]] });
    };

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    const cw = canvas.width = 582;
    const ch = canvas.height = 243;

    const targetRed = 185;
    const targetGreen = 42;
    const targetBlue = 36;
    const tolerance = 1;

    function initializeCanvas() {
        const img = new Image();
        img.src = tk.now.lowerDiv.style.backgroundImage.match(/url\(\"(.*)\"\)/)[1];
        ctx.drawImage(img, 0, 0);

        dummyKeys = findMatchingXY();
        console.log(dummyKeys);

        for (let i = 0; i < dummyKeys.length; i++) {
            switch (dummyKeys[i][1]) {
                case 1:
                    y1 = `${y1.substring(0, dummyKeys[i][0])}.${y1.substring(dummyKeys[i][0])}`;
                    break;

                case 2:
                    y2 = `${y2.substring(0, dummyKeys[i][0])}.${y2.substring(dummyKeys[i][0])}`;
                    break;

                case 3:
                    y3 = `${y3.substring(0, dummyKeys[i][0])}.${y3.substring(dummyKeys[i][0])}`;
                    break;
            }
        }

        initializedCanvas = true;
    }

    function findMatchingXY() {
        let pixels = [];
        // get the pixel data of the canvas
        const data = ctx.getImageData(0, 0, cw, ch).data;
        // loop through all pixels
        for (let y = 0; y < ch; y++) {
            for (let x = 0; x < cw; x++) {
                // find the pixel data from the data[] rgba array representing the pixel at [x,y]
                const n = (y * cw + x) * 4;
                // compare this pixel's color channels with the targets
                const matchesRedTarget = Math.abs(targetRed - data[n]) < tolerance;
                const matchesGreenTarget = Math.abs(targetGreen - data[n + 1]) < tolerance;
                const matchesBlueTarget = Math.abs(targetBlue - data[n + 2]) < tolerance;
                // does this pixel match the target
                if (data[n + 3] > 30 && matchesRedTarget && matchesGreenTarget && matchesBlueTarget) {
                    //console.log([x, y]);
                    pixels[pixels.length] = [xCoords.indexOf(x), yCoords.indexOf(y == 60 ? 55 : y - 6)];
                }
            }
        }
        // return the x,y of the first matching pixel
        return pixels;
    }
})();
