import ColorThief from 'colorthief'
import to from 'await-to-js'
import ml from './ml'

export default async () => {
    const img = './src/image.jpg';

    const [errorDominant, dominant] = await to(ColorThief.getColor(img))
    if (errorDominant) throw errorDominant;

    const [errorPalette, palette] = await to(ColorThief.getPalette(img, 15))
    if (errorPalette) throw errorPalette

    const result = {dominant, palette}

    try {
        const mlDominant = ml.dominant(dominant)
        // const mlPalette = ml.palette(palette)

        return {...result, ...mlDominant}
    } catch (e) {
       throw e;
    }
}
