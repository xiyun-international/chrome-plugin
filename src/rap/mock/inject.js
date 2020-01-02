MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

/**
 * 向指定容器注入按钮
 * @param {DOMElement} btnWrapper 
 */
function injectCopyButton(btnWrapper) {
  const injectBtn = document.createElement('button');
  injectBtn.setAttribute('id', 'copy-api');
  injectBtn.className = "btn btn-primary edit w130";
  injectBtn.innerHTML = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1577932576995" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3546" xmlns:xlink="http://www.w3.org/1999/xlink" width="15px" height="15px"><defs><style type="text/css"></style></defs><path d="M896 381.44a55.893333 55.893333 0 0 0-2.56-11.52v-3.84a45.653333 45.653333 0 0 0-8.106667-11.946667l-256-256a45.653333 45.653333 0 0 0-11.946666-8.106666 13.653333 13.653333 0 0 0-3.84 0 37.546667 37.546667 0 0 0-14.08-4.693334H426.666667a128 128 0 0 0-128 128v42.666667H256a128 128 0 0 0-128 128v426.666667a128 128 0 0 0 128 128h341.333333a128 128 0 0 0 128-128v-42.666667h42.666667a128 128 0 0 0 128-128V384v-2.56z m-256-150.613333L750.506667 341.333333H682.666667a42.666667 42.666667 0 0 1-42.666667-42.666666zM640 810.666667a42.666667 42.666667 0 0 1-42.666667 42.666666H256a42.666667 42.666667 0 0 1-42.666667-42.666666V384a42.666667 42.666667 0 0 1 42.666667-42.666667h42.666667v298.666667a128 128 0 0 0 128 128h213.333333z m170.666667-170.666667a42.666667 42.666667 0 0 1-42.666667 42.666667h-341.333333a42.666667 42.666667 0 0 1-42.666667-42.666667V213.333333a42.666667 42.666667 0 0 1 42.666667-42.666666h128v128a128 128 0 0 0 128 128h128z" fill="#ffffff"></path></svg> 复制';
  btnWrapper.appendChild(injectBtn);
  injectBtn.addEventListener('click', () => {
    let api = document.querySelector("#root > article > div.body > article > div.body > div > article.InterfaceEditor > div.InterfaceSummary > ul > li:nth-child(1) > a").innerText;
    if (/^\/api\/.*/.test(api)) {
      api = api.replace('/api', '');
      const response = document.querySelector('#root > article > div.body > article > div.body > div > article.InterfaceEditor > section:nth-child(4) > div.footer > div > div.result-template.col-6 > pre').innerText;
      const result = `"POST ${api}": ${response},`;
      new ClipboardJS('#copy-api', {
        text: () => result,
      });
      console.info('接口复制成功');
    } else {
      alert('api 格式不符合规范');
    }
  })
}

// 当文档各节点加载完成后，注入按钮
let init = true;
const observer = new MutationObserver(function (mutations, observer) {
  const btnWrapper = document.querySelector("#root > article > div.body > article > div.body > div > article.InterfaceEditor > div.InterfaceEditorToolbar");
  if (init && btnWrapper) {
    init = false;
    injectCopyButton(btnWrapper);
  }
});

// 监听路由变化，注入按钮
const hisCopy = history.pushState;
history.pushState = function () {
  hisCopy.apply(history, arguments);
  setTimeout(() => {
    const btnWrapper = document.querySelector("#root > article > div.body > article > div.body > div > article.InterfaceEditor > div.InterfaceEditorToolbar");
    injectCopyButton(btnWrapper);
  })
}

observer.observe(document, {
  subtree: true,
  attributes: true,
});
