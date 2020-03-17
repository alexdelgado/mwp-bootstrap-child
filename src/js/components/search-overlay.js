const $searchLink = document.querySelector('.js-search-toggle');

function createToggleBtn() {
  const $searchToggle = document.createElement('button');
  $searchToggle.classList.add('btn--transparent', 'js-search-toggle');
  $searchToggle.setAttribute('aria-label', 'Toggle search');
  $searchToggle.setAttribute('aria-expanded', 'false');
  $searchToggle.innerHTML = $searchLink.innerHTML;

  $searchLink.parentElement.appendChild($searchToggle);
  $searchLink.remove();

  return $searchToggle
}

function hideHandler(e) {
  if (e.keyCode == 27) {
    hideOverlay(this.overlay);
  }
}

function hideOverlay($overlay) {
  $overlay.classList.remove('show');
  $overlay.setAttribute('aria-hidden', 'true');
}

function showOverlay($overlay) {
  $overlay.classList.add('show');
  $overlay.removeAttribute('aria-hidden');
}

if ($searchLink) {
  const $searchToggle = createToggleBtn();
  const $searchOverlay = document.getElementById('js-search-overlay');
  const $searchClose = document.getElementById('js-search-hide');

  $searchToggle.addEventListener('click', () => {
    if ($searchOverlay.classList.contains('show')) {
      hideOverlay($searchOverlay);
      document.removeEventListener('keydown', hideHandler.bind({overlay: $searchOverlay}));
    } else {
      showOverlay($searchOverlay);
      document.addEventListener('keydown', hideHandler.bind({overlay: $searchOverlay}));
    }
  });

  $searchClose.addEventListener('click', () => {
    hideOverlay($searchOverlay, $searchToggle);
  });
}
