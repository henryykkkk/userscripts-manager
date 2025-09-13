// ==UserScript==
// @name         YouTube Ad Pedantic test
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       henryykkkkk
// @match        https://www.youtube.com/*
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const state = GM_getValue('youtube-ad-pedantic-www.youtube.com', {});

    if (!state.enabled) return;

    function detectAd() {
        const adElement = document.querySelector('ytd-ad-slot, .ytp-ad-module, .ad-showing');
        if (adElement && !window.__adPedanticShown) {
            window.__adPedanticShown = true;
            setTimeout(() => {
                alert(
                    "test"
                );
            }, 500);
        }
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') detectAd();
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    detectAd();

})();
