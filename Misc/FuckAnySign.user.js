// ==UserScript==
// @name         FuckAnySign
// @namespace    https://www.ingan121.com/userscripts/fas
// @version      0.1
// @description  Bypass AnySign installation requirement
// @author       Ingan121
// @match        *://*/*
// @icon         http://www.myanysign.com/common/img/anysign_icon.ico
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    AnySign.mExtensionSetting.mIgnoreInstallPage = true;
    document.getElementById("AnySign4PCLoadingImg_overlay").style = "";
    document.getElementById("AnySign4PCLoadingImg").style = "";
})();
