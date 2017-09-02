chrome.browserAction.onClicked.addListener((tab) => {
  console.info(`Active ${tab.url}`);
  chrome.tabs.executeScript({ file: 'content.js' });
  chrome.browserAction.setBadgeText({
    text: 'OK',
  })
  setTimeout(() => {
    chrome.browserAction.setBadgeText({
      text: '',
    })
  }, 3000)
});