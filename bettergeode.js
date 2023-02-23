

var bgInput = document.getElementById('bginput');
var projInput = document.getElementById('projinput');
var blurInput = document.getElementById('blurinput');
var winbgInput = document.getElementById('winbginput');
var alphaInput = document.getElementById('alpha');

chrome.storage.sync.get('image', ({ image }) => {
  bgInput.value = image ? image : '';
});

chrome.storage.sync.get('projectsonload', ({ projectsonload }) => {
  projInput.checked = projectsonload ? projectsonload : false;
});

chrome.storage.sync.get('blur', ({ blur }) => {
  blurInput.value = blur ? blur : 8;
});

chrome.storage.sync.get('winbg', ({ winbg }) => {
  winbgInput.value = winbg ? winbg : '#05090E';
});

chrome.storage.sync.get('winopacity', ({ winopacity }) => {
  alphaInput.value = winopacity ? winopacity : 0.8;
});

bgInput.oninput = (event) => {
  chrome.storage.sync.set({ image: event.target.value }, () => {
    console.log('The image value is ' + event.target.value);
  });
}

projInput.onchange = (event) => {
  chrome.storage.sync.set({ projectsonload: event.target.checked }, () => {
    console.log('The projectsonload value is ' + event.target.checked);
  });
}

blurInput.onchange = (event) => {
  chrome.storage.sync.set({ blur: event.target.value }, () => {
    console.log('The blur value is ' + event.target.value);
  });
}

winbgInput.oninput = (event) => {
  chrome.storage.sync.set({ winbg: event.target.value }, () => {
    console.log('The window background color is ' + event.target.value);
  });
}

alphaInput.oninput = (event) => {
  chrome.storage.sync.set({ winopacity: event.target.value }, () => {
    console.log('The window background opacity is ' + event.target.value);
  });
}