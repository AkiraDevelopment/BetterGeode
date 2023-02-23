var bgInput = document.getElementById('bginput');
var projInput = document.getElementById('projinput');
var blurInput = document.getElementById('blurinput');
var winbgInput = document.getElementById('winbginput');
var alphaInput = document.getElementById('alpha');
var importButton = document.getElementById("importButton");
var exportButton = document.getElementById("exportButton");
var image = bgInput.value;
var blur = blurInput.value;
var winbg = winbgInput.value;
var winopacity = alphaInput.value;

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
function importSettings() {
  let json;
  var input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = e => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = readerEvent => {
      var content = readerEvent.target.result;
      const settings = JSON.parse(content);

      window.chrome.storage.sync.set({ image: settings.image });
      window.chrome.storage.sync.set({ projectsonload: settings.projectsonload });
      window.chrome.storage.sync.set({ blur: settings.blur });
      window.chrome.storage.sync.set({ winbg: settings.winbg });
      window.chrome.storage.sync.set({ winopacity: settings.winopacity });
      
      console.log('Settings imported from JSON!');
      console.log('Loaded Image:', settings.image ? settings.image : 'None set');
      console.log('Open My Projects window on load:', settings.projectsonload ? settings.projectsonload : false);
      console.log('Custom Blur:', $ettings.blur ? settings.blur : 8);
      console.log('Window Background:', settings.winbg ? settings.winbg : '#05090E');
      console.log('Window Opacity:', settings.winopacity ? settings.winopacity : 0.8);
    }
  }
  input.click();
}

importButton.addEventListener('click', importSettings);

function exportData() {
  chrome.storage.sync.get(['image', 'projectsonload', 'blur', 'winbg', 'winopacity'], function(data) {
    var json = JSON.stringify(data);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'BetterGeodePreset.json';
    a.click();
  });
}
exportButton.addEventListener('click', exportData);  