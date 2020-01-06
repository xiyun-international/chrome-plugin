// 页面渲染完成的事件
render(".title").then(() => {
  // 删除 badge
  $(".badge").remove();

  $("#root").before(`
    <div id="tools">
      <button id="mock" class="btn btn-primary edit">一键复制 Mock</button>
    </div>
  `);
});

$(document).on("click", "#mock", () => {
  const api = $("div.InterfaceSummary > ul > li:nth-child(1) > a").text();
  const response = $("div.result-template.col-6 > pre").text();
  const result = `"POST ${api}": ${response},`;

  new ClipboardJS("#mock", {
    text: () => result
  });
});
