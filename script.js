const header = document.getElementById('header')

function showPalettes() {
    header.classList.toggle('show-palettes')
}

function closePalettes() {
    header.classList.remove('show-palettes')
}

function setPalette(list) {
    document.documentElement.style.setProperty('--primary-color', list[0])
    document.documentElement.style.setProperty('--secondary-color', list[1])
    document.documentElement.style.setProperty('--result-color', list[2])
}
