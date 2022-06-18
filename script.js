const header = document.getElementById('header')
let prevColors = ['#f5b561', '#faddb7', '#f19a27']

function showPalettes() {
    header.classList.toggle('show-palettes')
    getPrevColors()
}

function closePalettes() {
    header.classList.remove('show-palettes')
}

function getPrevColors() {
    prevColors = [
        getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
        getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
        getComputedStyle(document.documentElement).getPropertyValue('--result-color')
    ]
}

function setPalette(list) {
    document.documentElement.style.setProperty('--primary-color', list[0])
    document.documentElement.style.setProperty('--secondary-color', list[1])
    document.documentElement.style.setProperty('--result-color', list[2])
}

function setPrevColors() {
    document.documentElement.style.setProperty('--primary-color', prevColors[0])
    document.documentElement.style.setProperty('--secondary-color', prevColors[1])
    document.documentElement.style.setProperty('--result-color', prevColors[2])
}
