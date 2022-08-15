const menuContainer = document.getElementById('menu-container')
const menuButton = document.getElementById('menu-button')

const menuTabs = [
  'algorithms',
  'grid',
  'terrain',
  'nodes'
]

menuButton.addEventListener('click', () => {
  if (menuContainer.style.display == 'none') {
    menuContainer.style.display = 'block'
  } else {
    menuContainer.style.display = 'none'
  }
})

document.getElementById('menu-options').addEventListener('click', (e) => {
	// 'grid-option' -> ['grid', 'option']
	let tab = e.target.id.split('-')
	if(!menuTabs.includes(tab[0])) return
	toggleMenu(tab[0])
})

let currentTab = 'algorithms';
function toggleMenu(menuTab) {
	if(currentTab == menuTab) return

	document.getElementById(`${currentTab}-menu`).style.display = "none"
	document.getElementById(`${menuTab}-menu`).style.display = "block"

	document.getElementById(`${currentTab}-option`).classList.replace("active", "inactive")
	document.getElementById(`${menuTab}-option`).classList.replace("inactive", "active")

	currentTab = menuTab
	// state.set('currentTab', menuTab)
}
