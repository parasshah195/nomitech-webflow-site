import { SCRIPTS_LOADED_EVENT } from 'src/constants';

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  openExternalLinksInNewTab();
});

function openExternalLinksInNewTab() {
  const externalLinks = Array.from(document.querySelectorAll('a')).filter((link) => {
    const href = link.getAttribute('href');
    const urlObject = new URL(href, window.location.origin);
    return href && urlObject.origin !== window.location.origin;
  });

  externalLinks.forEach((link) => {
    link.setAttribute('target', '_blank');
  });
}
