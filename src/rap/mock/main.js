function injectCustomJs(jsPath) {
  const scirpt = document.createElement('script');
  scirpt.setAttribute('type', 'text/javascript');
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/src/rap/mock/inject.js
  scirpt.src = chrome.extension.getURL(jsPath);
  document.body.appendChild(scirpt);
}

injectCustomJs('src/rap/mock/clipboard.min.js');
injectCustomJs('src/rap/mock/inject.js');
