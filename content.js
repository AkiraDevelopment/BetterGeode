
function hex_to_RGB(hex) {
    var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
    return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16)
    };
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

window.onload = async () => {  
    console.log('BetterGeode Loaded!');

    const { image } = await chrome.storage.sync.get('image');
    if (image) {
        document.getElementById('app').style.backgroundImage = `url('${image}')`
        console.log(`Loaded Image: ${image}`);
    }

    const { projectsonload } = await chrome.storage.sync.get('projectsonload')
    console.log(`Open My Projects window on load: ${projectsonload ? projectsonload : false}`);
    if (projectsonload) document.getElementsByClassName('contextmenu')[0].getElementsByClassName('menu-option')[0].click();

    const { blur } = await chrome.storage.sync.get('blur')
    if (blur && blur != 8) {
        document.documentElement.style.setProperty('--blur', `blur(${blur}px)`);
        document.documentElement.style.setProperty('--context-menu-blur', `blur(${blur}px)`);
        console.log(`Custom Blur: ${blur}`);
    }

    const { winbg } = await chrome.storage.sync.get('winbg')
    console.log(`Window Background: ${winbg ? winbg : '#05090E'}`);

    const { winopacity } = await chrome.storage.sync.get('winopacity')
    console.log(`Window Opacity: ${winopacity ? winopacity : 0.8}`);

    const rgb = winbg ? hex_to_RGB(winbg) : { r: 5, g: 9, b: 14 }
    document.documentElement.style.setProperty('--window-bg', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${winopacity ? winopacity : 0.8})`);
    document.documentElement.style.setProperty('--context-menu-bg', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${winopacity ? winopacity : 0.8})`);

    const elm = await waitForElm('.taskbar');
    elm.style.background = '#00000000';
    elm.previousSibling.style.position = 'absolute';
    elm.previousSibling.style.top = '0';
    elm.previousSibling.style.backdropFilter = 'var(--blur)';
    elm.previousSibling.className = 'taskbar animated faster slideInLeft';
}