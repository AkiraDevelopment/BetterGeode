chrome.declarativeContent.onPageChanged.removeRules(null, () => {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'panel.geode.host'},
    })
    ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});