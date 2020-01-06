// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events
$(document).on("DOMNodeInserted", ".body", () => {
  $(".badge").remove();
});

isRender(".Routes").then(() => {
  $("#root").before(`
    <div id="tools">
      <button id="mock" class="btn btn-primary edit">一键复制 Mock</button>
    </div>
  `);

  new ClipboardJS("#mock", {
    text: () => {
      const api = $("div.InterfaceSummary > ul > li:nth-child(1) > a").text();
      const response = $("div.result-template.col-6 > pre").text();
      return `"POST ${api}": ${response},`;
    }
  });
});
