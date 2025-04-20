let toggle = false;

function toggleMobileMenu() {
  toggle = !toggle;
  const menu = document.querySelector('#mobile-menu-modal');

  if (toggle) {
    console.log('open mobile menu');
    menu.showModal();
  } else {
    console.log('close mobile menu');
    menu.close();
  }
}

export default toggleMobileMenu;
