export const initPubSub = () => {
  let source = new EventSource('/stream')
  source.onmessage = function (event) {
    // alert(event.data);
    console.log(event, event.data);
  };
}

export const mysomething = () => {
  let id = setInterval(frame, 1000);
  let counter = 0;

  function frame() {
    console.log("next item", counter);
    counter += 1;

    if (counter > 5000) {
    clearInterval(id);
    }
  }
}
