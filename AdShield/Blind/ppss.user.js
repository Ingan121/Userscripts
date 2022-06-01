// ==UserScript==
// @name         FuckAdShield for PPSS
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ppss.kr/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ppss.kr
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    /*
    const shit1 = document.querySelector('.widget-area.sidebar-primary.sidebar');
    shit1.style.position = 'absolute';
    shit1.style.left = '1500px';

    const shit2 = document.querySelector('#ppss_wing_banner_left');
    shit2.style.left = '-700px' */

    const mainArea = document.querySelector('.site-inner');
    const blind1 = document.createElement('div');
    blind1.style = 'background: white; position: absolute; width: 300px; height: 1500px; left: 660px;';
    mainArea.appendChild(blind1);

    const blind2 = blind1.cloneNode(true);
    blind2.style = 'background: white; position: absolute; width: 160px; height: 600px; left: -180px;';
    mainArea.appendChild(blind2);

    const blind3 = blind1.cloneNode(true);
    blind3.style = 'background: white; position: absolute; width: 630px; height: 90px;';
    mainArea.appendChild(blind3);

    setTimeout(() => {
        const shits = document.querySelectorAll('.adsbygoogle');
        for (let i = 0; i < shits.length; i++) shits[i].remove();
    }, 15000);
})();
