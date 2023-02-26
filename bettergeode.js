const bgInput = document.getElementById('bginput');
const projInput = document.getElementById('projinput');
const blurInput = document.getElementById('blurinput');
const blurInputText = document.getElementById('blurinputtext');
const winbgInput = document.getElementById('winbginput');
const alphaInput = document.getElementById('alpha');
const alphaInputText = document.getElementById('alphainputtext');
const importButton = document.getElementById("importButton");
const exportButton = document.getElementById("exportButton");

const { image, projectsonload, blur, winbg, winopacity } = await chrome.storage.sync.get(['image', 'projectsonload', 'blur', 'winbg', 'winopacity']);

bgInput.value = image ?? '';
projInput.checked = projectsonload ?? false;
blurInput.value = blur ?? 8;
blurInputText.innerText = blur ?? 8;
winbgInput.value = winbg ?? '#05090E';
alphaInput.value = winopacity ?? 0.8;
alphaInputText.innerText = Math.round((winopacity ?? 0.8) * 100);

bgInput.oninput = async event => {
  await chrome.storage.sync.set({ image: event.target.value });
  console.log(`Set image to: ${event.target.value}`);
}

projInput.onchange = async event => {
  await chrome.storage.sync.set({ projectsonload: event.target.checked });
  console.log(`Set projectsonload to: ${event.target.checked}`);
}

blurInput.oninput = async event => {
  blurInputText.innerText = event.target.value;
}

blurInput.onchange = async event => {
  await chrome.storage.sync.set({ blur: event.target.value });
  blurInputText.innerText = event.target.value;
  console.log(`Set blur to: ${event.target.value}`);
}

winbgInput.onchange = async event => {
  await chrome.storage.sync.set({ winbg: event.target.value });
  console.log(`Set winbg to: ${event.target.value}`);
}

alphaInput.oninput = async event => {
  alphaInputText.innerText = Math.round(event.target.value * 100);
}

alphaInput.onchange = async event => {
  await chrome.storage.sync.set({ winopacity: event.target.value });
  alphaInputText.innerText = Math.round(event.target.value * 100);
  console.log(`Set winopacity to: ${event.target.value}`);
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

      await chrome.storage.sync.set({ image, projectsonload, blur, winbg, winopacity })

      console.log(`Set image to: ${image}`);
      console.log(`Set projectsonload to: ${projectsonload}`);
      console.log(`Set blur to: ${blur}`);
      console.log(`Set winbg to: ${winbg}`);
      console.log(`Set winopacity to: ${winopacity}`);
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