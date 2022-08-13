const menuContainer = document.getElementById('menu-container')
const menuButton = document.getElementById('menu-button')

const menuIDs = {
  'algorithms-option': 'algorithms-menu',
  'grid-option': 'grid-menu',
  'terrain-option': 'terrain-menu'
}

menuButton.addEventListener('click', () => {
  if (menuContainer.style.display == 'none') {
    menuContainer.style.display = 'block'
  } else {
    menuContainer.style.display = 'none'
  }
})

document.getElementById('menu-options').addEventListener('click', (e) => {
	let m = menuIDs[e.target.id]
	if(!m) return
	toggleMenu(m)
})

let currentMenu = 'algorithms-menu';
function toggleMenu(menuId) {
	console.log(currentMenu)
	if(menuId == currentMenu) return
	document.getElementById(currentMenu).style.display = "none"
	document.getElementById(menuId).style.display = "block"
	currentMenu = menuId
}
