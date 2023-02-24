var bgInput = document.getElementById('bginput');
var projInput = document.getElementById('projinput');
var blurInput = document.getElementById('blurinput');
var winbgInput = document.getElementById('winbginput');
var alphaInput = document.getElementById('alpha');
var importButton = document.getElementById("importButton");
var exportButton = document.getElementById("exportButton");

const { image } = await chrome.storage.sync.get('image');
bgInput.value = image ? image : '';

const { projectsonload } = await chrome.storage.sync.get('projectsonload');
projInput.checked = projectsonload ? projectsonload : false;

const { blur } = await chrome.storage.sync.get('blur');
blurInput.value = blur ? blur : 8;

const { winbg } = await chrome.storage.sync.get('winbg');
winbgInput.value = winbg ? winbg : '#05090E';

const { winopacity } = await chrome.storage.sync.get('winopacity');
alphaInput.value = winopacity ? winopacity : 0.8;

bgInput.oninput = async event => {
  await chrome.storage.sync.set({ image: event.target.value })
  console.log('The image value is ' + event.target.value);
}

projInput.onchange = async event => {
  await chrome.storage.sync.set({ projectsonload: event.target.checked })
  console.log('The projectsonload value is ' + event.target.checked);
}

blurInput.onchange = async event => {
  await chrome.storage.sync.set({ blur: event.target.value })
  console.log('The blur value is ' + event.target.value);
}

winbgInput.oninput = async event => {
  await chrome.storage.sync.set({ winbg: event.target.value });
  console.log('The window background color is ' + event.target.value);
}

alphaInput.oninput = async event => {
  await chrome.storage.sync.set({ winopacity: event.target.value });
  console.log('The window background opacity is ' + event.target.value);
}

function importSettings() {
  var input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = e => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = async readerEvent => {
      var content = readerEvent.target.result;
      const { image, projectsonload, blur, winbg, winopacity } = JSON.parse(content);

      console.log('Settings imported from JSON!');

      await chrome.storage.sync.set({ image })
      console.log('The image value is ' + image);

      await chrome.storage.sync.set({ projectsonload })
      console.log('The projectsonload value is ' + projectsonload);
    
      await chrome.storage.sync.set({ blur })
      console.log('The blur value is ' + blur);
    
      await chrome.storage.sync.set({ winbg })
      console.log('The window background color is ' + winbg);

      await chrome.storage.sync.set({ winopacity });
      console.log('The window background opacity is ' + winopacity ? winopacity : 0.8);
    }
  }
  input.click();
}

importButton.addEventListener('click', importSettings);

async function exportData() {
  const data = await chrome.storage.sync.get(['image', 'projectsonload', 'blur', 'winbg', 'winopacity']);
  var json = JSON.stringify(data);
  var blob = new Blob([json], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'BetterGeodePreset.json';
  a.click();
}

exportButton.addEventListener('click', exportData);  