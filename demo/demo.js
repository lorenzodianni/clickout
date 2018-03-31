console.dir(window.ClickOut);

var buttonCreate = document.querySelector('#create');
var buttonDestroy = document.querySelector('#destroy');
var customEvent = document.querySelector('#customEvent');
var myElement = document.querySelector('#myElement');
var isActiveCustomEvent;
var timeoutIdToggleColor;

function onClickOut(event) {
  console.log(event);
  toggleColor(document.body, '#2e7d32');
}

function onClickIn(event) {
  toggleColor(event.target, '#FFF');
}

function attachClickout() {
  if (isActiveCustomEvent) {
    window.ClickOut.bindCustomEvent(myElement);
    myElement.addEventListener('clickout', onClickOut);
  } else {
    window.ClickOut.bind(myElement, onClickOut);
  }
  myElement.addEventListener('click', onClickIn);
  toggleButton(buttonDestroy, buttonCreate);
}

function detachClickout() {
  window.ClickOut.destroy(myElement);
  myElement.removeEventListener('click', onClickIn);
  myElement.removeEventListener('clickout', onClickOut);
  toggleButton(buttonCreate, buttonDestroy);
}

function restartClickOut() {
  detachClickout();
  setTimeout(function () {
    attachClickout();
  });
}

function toggleColor(target, color) {
  if (timeoutIdToggleColor) {
    clearTimeout(timeoutIdToggleColor);
  }
  target.style.backgroundColor = color;
  timeoutIdToggleColor = setTimeout(function () {
    target.removeAttribute('style');
  }, 200);
}

function toggleButton(show, hide) {
  if (Array.isArray(hide)) {
    [].forEach.apply(hide, function (el) {
      el.style.display = 'none'
    })
  } else {
    hide.style.display = 'none';
  }
  show.removeAttribute('style');
}

function toggleCustomEvent(event) {
  isActiveCustomEvent = event.target.checked;
  attachClickout();
}

buttonCreate.addEventListener('click', restartClickOut);
buttonDestroy.addEventListener('click', detachClickout);
customEvent.addEventListener('click', toggleCustomEvent);

attachClickout();
