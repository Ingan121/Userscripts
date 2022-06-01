// ==UserScript==
// @name         FuckJotmuPowerLink
// @namespace    https://ingan121.tk/
// @version      0.1
// @description  try to take over the world!
// @author       Ingan121
// @match        https://namu.wiki/w/*
// @exclude      https://namu.wiki/w/%EB%82%98%EB%AC%B4%EC%9C%84%ED%82%A4:%EB%8C%80%EB%AC%B8
// @icon         https://www.google.com/s2/favicons?sz=64&domain=namu.wiki
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const startTime = performance.now();

    const tables = document.getElementsByTagName('table');
    const divs = document.getElementsByTagName('div');

    const isLightMode = window.getComputedStyle(document.body).getPropertyValue('background-color') == 'rgba(0, 0, 0, 0)';
    const targetBgColor = isLightMode ? 'rgb(255, 254, 249)' : 'rgb(43, 43, 43)';
    const targetBorderColor = isLightMode ? 'rgb(236, 236, 236)' : 'rgb(136, 136, 136)';

    let found = false;

    for (let i = tables.length - 1; i >= 0; i--) { // Iterate in reverse order - ShitLink is usually at the last of the index.
        const style = window.getComputedStyle(tables[i]);
        try {
            if (style.getPropertyValue('background-color') == targetBgColor
               && style.getPropertyValue('border-color') == targetBorderColor
               && new URL(tables[i].querySelector('tbody > tr > td > div > a').href).pathname == new URL(location.href).pathname) { // Check if the ShitLink button's href attribute points to the same page.
                //console.log(`PowerLink detected in ${tables.length - i}th iteration:`);
                //console.log(tables[i]);
                found = true;
                tables[i].remove();
                break;
            }
        } catch {}
    }
    if (!found) { // ShitLink has not been loaded completely. At this stage, it's a div instead of a table.
        for (let i = divs.length - 1; i >= 0; i--) {
            const style = window.getComputedStyle(divs[i]);
            try {
                if (style.getPropertyValue('background-color') == targetBgColor
                   && style.getPropertyValue('border-color') == targetBorderColor) {
                    if (new URL(Array.from(divs[i].getElementsByTagName('div')).filter(s =>
                        window.getComputedStyle(s).getPropertyValue('display') != 'none'
                    )[0].querySelector('div > div > div > div > div > div > div > a').href).pathname == new URL(location.href).pathname) { // The same URL match check as above - but it takes longer. Still < 200 ms though.
                        //console.log(`PowerLink detected in ${divs.length - i}th iteration:`);
                        //console.log(divs[i]);
                        found = true;
                        divs[i].remove();
                        break;
                    }
                }
            } catch {}
        }
    }
    if (!found) console.error(`PowerLink couldn't be found. (took ${performance.now() - startTime} milliseconds.)`);
    else console.log(`PowerLink successfully removed in ${performance.now() - startTime} milliseconds, and now there are ${tables.length} tables and ${divs.length} divs.`);
})();
