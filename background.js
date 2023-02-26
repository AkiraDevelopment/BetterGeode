chrome.runtime.onInstalled.addListener(() => {
  chrome.action.disable();
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            hostSuffix: 'panel.geode.host'
          },
        })
      ],
      actions: [
        new chrome.declarativeContent.ShowAction()
      ],
    }]);
  });
});