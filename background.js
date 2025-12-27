chrome.tabs.onUpdated.addListener(async (tabId) => {
  try {
    console.count('tabs.onUpdated')
    await chrome.sidePanel.setOptions({
      tabId,
      path: "index.html",
      enabled: true,
    });
    
  } catch (error) {
    console.error(`标签页 tabs.onUpdated ${tabId} 操作失败:`, error);
  }
});

console.count('chrome.background')
// chrome.scripting.executeScript({
//     target : { tabId: tabId },
//     files : [ "script.js" ],
//   })
//   .then(() => console.log("script injected"));

chrome.runtime.onInstalled.addListener(() => {
  // 父级菜单
  chrome.contextMenus.create({
    id: "myExtension",
    title: "RSA AI工具箱",
    contexts: ["all"], // all 在所有上下文中显示
  });

  // 创建子菜单项
  chrome.contextMenus.create({
    id: "action1",
    parentId: "myExtension",
    title: "开启侧边栏",
    contexts: ["page", "selection", "link", "image"],
  });

  chrome.contextMenus.create({
    id: "action2",
    parentId: "myExtension",
    title: "翻译",
    contexts: ["page", "selection", "link", "image"],
  });

  chrome.contextMenus.create({
    id: "action3",
    parentId: "myExtension",
    title: "摘要",
    contexts: ["page", "selection", "link", "image"],
  });

  chrome.contextMenus.create({
    id: "action4",
    parentId: "myExtension",
    title: "Prompt提示",
    contexts: ["page", "selection", "link", "image"],
  });
});

// 点击扩展图标时的处理
chrome.action.onClicked.addListener(async () => {
  try {
    await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  } catch (error) {
    console.error(`标签页 action.onClicked 操作失败:`, error);
  }
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  try {
    const { menuItemId, selectionText } = info;

    switch (menuItemId) {
      case "action1":
        chrome.sidePanel.open({ tabId: tab.id });
        break;
      case "action2":
        await chrome.action.setPopup({
          popup: "popup.html",
          tabId: tab.id,
        });
        await chrome.action.openPopup();

        setTimeout(() => {
          chrome.runtime.sendMessage({
            message: info.selectionText,
            action: "Translate",
          });
        }, 500);
        break;
      case "action3":
        await chrome.action.setPopup({
          popup: "popup.html",
          tabId: tab.id,
        });
        await chrome.action.openPopup();

        setTimeout(() => {
          chrome.runtime.sendMessage({
            message: info.selectionText,
            action: "Summarizer",
          });
        }, 500);
        break;
      case "action4":
        await chrome.action.setPopup({
          popup: "popup.html",
          tabId: tab.id,
        });
        await chrome.action.openPopup();

        setTimeout(() => {
          chrome.runtime.sendMessage({
            message: info.selectionText,
            action: "Prompt",
          });
        }, 500);
        break;
    }
  } catch (error) {
    console.error(`标签页 contextMenus.onClicked ${tabId} 操作失败:`, error);
  }
});
