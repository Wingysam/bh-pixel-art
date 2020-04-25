import invert from 'invert-color'
import { recipes, getImageLinks } from "./colors"

const canvas = document.querySelector('canvas')!
const imageInput = document.querySelector('input[data-for=image]') as HTMLInputElement
const widthInput = document.querySelector('input[data-for=width]') as HTMLInputElement
const heightInput = document.querySelector('input[data-for=height]') as HTMLInputElement
const colorsInput = document.querySelector('input[data-for=colors]') as HTMLInputElement
const refreshButton = document.querySelector('button')!
const textInput = document.querySelector('input[data-for=text]') as HTMLInputElement
const squareInput = document.querySelector('input[data-for=square]') as HTMLInputElement
const blackBorderInput = document.querySelector('input[data-for=border]') as HTMLInputElement
const colorsTable = document.querySelector('tbody')!
const image = new Image()

const context = canvas.getContext('2d')!
if (!context) {
    alert("Failed to get canvas. Your browser is not supported.")
    throw Error("Bad browser")
}

refreshButton.addEventListener('click', draw)
image.addEventListener('load', draw)

imageInput.addEventListener('change', () => {
    refreshButton.disabled = false
    image.src = URL.createObjectURL(imageInput.files![0])
})

function draw() {
    const SCALE = +squareInput.value
    const FONT_SCALE = +textInput.value

    const work = document.createElement('canvas')
    const workContext = work.getContext('2d')!

    let width = Math.min(+widthInput.value, image.width)
    let height = Math.min(+heightInput.value, image.height)

    const ratio = (image.height / height) / (image.width / width)
    if (ratio < 1) {
        height = Math.ceil(height * ratio)
    } else {
        width = Math.ceil(width * (1 / ratio))
    }

    console.log(width, height, ratio, SCALE)

    work.width = width
    canvas.width = width * SCALE + 1
    work.height = height
    canvas.height = height * SCALE + 1
    workContext.drawImage(image, 0, 0, width, height)

    // Get all the possible colors we'll be using
    const globalNearest = nearestColor.from(recipes)

    const colors = new Map<string, number>()
    const {data} = workContext.getImageData(0, 0, width, height)
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixelStart = y * width * 4 + x * 4
            const name = globalNearest({
                r: data[pixelStart],
                g: data[pixelStart + 1],
                b: data[pixelStart + 2]
            }).name
            colors.set(name, (colors.get(name) ?? 0) + 1)
        }
    }

    // Limit the colors based on max usage
    const bestColors = Array.from(colors.entries())
        .sort((a, b) => a[1] - b[1])
        .slice(-colorsInput.value)
        .reverse()

    const thisRecipes = bestColors.reduce((acc, color) => {
        acc[color[0]] = recipes[color[0]]
        return acc
    }, {} as Record<string, string>)
    const thisFinder = nearestColor.from(thisRecipes)

    if (blackBorderInput.checked) {
        context.fillStyle = '#000000'
        context.fillRect(0, 0, canvas.width, canvas.height)
    }
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixelStart = y * width * 4 + x * 4
            const color = thisFinder({
                r: data[pixelStart],
                g: data[pixelStart + 1],
                b: data[pixelStart + 2]
            })
            context.fillStyle = color.value
            context.fillRect(x * SCALE + 1, y * SCALE + 1, SCALE - 1, SCALE - 1)
            context.fillStyle = invert(color.rgb, true)
            context.font = `${FONT_SCALE}px sans-serif`
            context.fillText(String(bestColors.findIndex(c => c[0] === color.name) + 1), x * SCALE + 1, y * SCALE + FONT_SCALE + 1)
        }
    }

    // Setup colors
    while (colorsTable.firstChild) {
        colorsTable.firstChild.remove()
    }
    for (let i = 0; i < bestColors.length; i++) {
        const el = document.createElement('tr')
        el.appendChild(document.createElement('td')).textContent = String(i + 1)
        const recipe = el.appendChild(document.createElement('td'))
        for (const url of getImageLinks(bestColors[i][0])) {
            const img = document.createElement('img')
            img.src = url
            img.width = img.height = 30
            recipe.appendChild(img)
        }
        el.appendChild(document.createElement('td')).textContent = bestColors[i][1].toString()
        el.appendChild(document.createElement('td')).textContent = Math.ceil(bestColors[i][1] / 128).toString()

        colorsTable.appendChild(el)
    }
}
