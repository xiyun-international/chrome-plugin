function render(ele) {
  return new Promise(resolve => {
    let timer;
    timer = setInterval(() => {
      if (document.querySelector(ele)) {
        clearInterval(timer);
        resolve();
      }
    }, 50);
  });
}
