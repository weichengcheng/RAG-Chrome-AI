


// chrome.sidePanel
//   .setPanelBehavior({ openPanelOnActionClick: true })
//   .catch((error) => console.error(error));


// chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
//   console.lo('--->', tabId, info, tab)
  // if (!tab.url) return;
  // const url = new URL(tab.url);
  // // Enables the side panel on google.com
  // if (url.origin === GOOGLE_ORIGIN) {
  //   await chrome.sidePanel.setOptions({
  //     tabId,
  //     path: 'sidepanel.html',
  //     enabled: true
  //   });
  // } else {
  //   // Disables the side panel on all other sites
  //   await chrome.sidePanel.setOptions({
  //     tabId,
  //     enabled: false
  //   });
  // }
// });

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenus.create({
//     id: 'openSidePanel',
//     title: 'Open side panel',
//     contexts: ['all']
//   });
//   chrome.tabs.create({ url: 'page.html' });
// });

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === 'openSidePanel') {
//     // This will open the panel in all the pages on the current window.
//     chrome.sidePanel.open({ windowId: tab.windowId });
//   }
// });

// chrome.runtime.onMessage.addListener((message, sender) => {
//   // The callback for runtime.onMessage must return falsy if we're not sending a response
//   (async () => {
//     if (message.type === 'open_side_panel') {
//       // This will open a tab-specific side panel only on the current tab.
//       await chrome.sidePanel.open({ tabId: sender.tab.id });
//       await chrome.sidePanel.setOptions({
//         tabId: sender.tab.id,
//         path: 'sidepanel-tab.html',
//         enabled: true
//       });
//     }
//   })();
// });

// alert('1')
console.log('你好啊')
// const node = document.createElement('div');
// node.innerText = '测试插入脚本mainfest->content_scripts'
// document.getElementsByTagName('body')[0].appendChild(node)
