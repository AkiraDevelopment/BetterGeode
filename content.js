
function hex_to_RGB(hex) {
    var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
    return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16)
    };
}

window.onload = () => {  
    console.log('BetterGeode Loaded!');
    chrome.storage.sync.get('image', ({ image }) => {
        console.log(`Loaded Image: ${image ? image : 'None set'}`);
        if (image) document.getElementById('app').style.backgroundImage = `url('${image}')`
    });
    chrome.storage.sync.get('projectsonload', ({ projectsonload }) => {
        console.log(`Open My Projects window on load: ${projectsonload ? projectsonload : false}`);
        if (projectsonload) document.getElementsByClassName('contextmenu')[0].getElementsByClassName('menu-option')[0].click();
    });
    chrome.storage.sync.get('blur', ({ blur }) => {
        console.log(`Custom Blur: ${blur ? blur : 8}`);
        if (blur && blur != 8) {
            document.documentElement.style.setProperty('--blur', `blur(${blur}px)`);
            document.documentElement.style.setProperty('--context-menu-blur', `blur(${blur}px)`);
        }
    });
    chrome.storage.sync.get('winbg', ({ winbg }) => {
        console.log(`Window Background: ${winbg ? winbg : '#05090E'}`);
        chrome.storage.sync.get('winopacity', ({ winopacity }) => {
            console.log(`Window Opacity: ${winopacity ? winopacity : 0.8}`);
            const rgb = winbg ? hex_to_RGB(winbg) : { r: 5, g: 9, b: 14 }
            document.documentElement.style.setProperty('--window-bg', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${winopacity ? winopacity : 0.8})`);
        });
    });
    document.getElementsByClassName('taskbar')[0].style.background = '#00000000';
    document.getElementsByClassName('taskbar')[0].previousSibling.style.position = 'absolute';
    document.getElementsByClassName('taskbar')[0].previousSibling.style.top = '0';
    document.getElementsByClassName('taskbar')[0].previousSibling.style.backdropFilter = 'var(--blur)';
    document.getElementsByClassName('taskbar')[0].previousSibling.className = 'taskbar animated faster slideInLeft';
}