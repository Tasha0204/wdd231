export { updateText };


window.addEventListener('resize', updateText)

updateText()

function updateText() {
    const data = document.querySelector('#data');
    data.textContent = `Width: ${window.innerWidth}, Ratio: ${Math.round(window.devicePixelRatio, 0)}`;
}