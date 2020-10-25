import ColorThief from 'colorthief'
import to from 'await-to-js'
import ml from './ml'
import namer from 'color-namer'

const rgbToHex = (r, g, b) => {
    return '#'+((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export default async () => {
    const img = './src/image.jpg';

    const [errorDominant, dominantRgb] = await to(ColorThief.getColor(img))
    if (errorDominant) throw errorDominant;

    const [errorPalette, palettesRgb] = await to(ColorThief.getPalette(img, 15))
    if (errorPalette) throw errorPalette

    const hexDominant = rgbToHex(...dominantRgb).toString().toUpperCase();

    const dominant = {
        color: hexDominant,
        name: namer(hexDominant).ntc[0].name,
    }

    const palette = palettesRgb.map(palette => {
        const hexPalette = rgbToHex(...palette).toString().toUpperCase();
        return {
            color: hexPalette,
            name: namer(hexPalette).ntc[0].name,
        }
    });

    const result = {dominant, palette}

    try {
        const mlDominant = ml.dominant(dominantRgb)

        return {...result, ...mlDominant}
    } catch (e) {
       throw e;
    }
}
