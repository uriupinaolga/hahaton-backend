import brain from 'brain.js'

const dominant = (data) => {

    const trainingData = [
        {input: { r: 0.4509, g: 0.4470, b: 0.4392 }, output: { without: 1 }},
        {input: { r: 0.4901, g: 0.3686, b: 0.2862 }, output: { standard: 1 }},
        {input: { r: 0.8039, g: 0.7725, b: 0.7490 }, output: { luxury: 1 }},
        {input: { r: 0.5921, g: 0.5803, b: 0.5607 }, output: { cosmetic: 1 }},

        {input: { r: 0.5686, g: 0.5568, b: 0.5333 }, output: { without: 1 }},
        {input: { r: 0.7490, g: 0.5803, b: 0.3725 }, output: { standard: 1 }},
        {input: { r: 0.7803, g: 0.6980, b: 0.6156 }, output: { luxury: 1 }},
        {input: { r: 0.5921, g: 0.5803, b: 0.5607 }, output: { cosmetic: 1 }},

        {input: { r: 0.5529, g: 0.5333, b: 0.5176 }, output: { without: 1 }},
        {input: { r: 0.7137, g: 0.6666, b: 0.5725 }, output: { standard: 1 }},
        {input: { r: 0.7686, g: 0.7607, b: 0.7725 }, output: { luxury: 1 }},
        {input: { r: 0.4549, g: 0.3764, b: 0.3215 }, output: { cosmetic: 1 }},

        {input: { r: 0.6196, g: 0.6235, b: 0.6392 }, output: { without: 1 }},
        {input: { r: 0.4431, g: 0.4039, b: 0.3803 }, output: { standard: 1 }},
        {input: { r: 0.8078, g: 0.8039, b: 0.8117 }, output: { luxury: 1 }},
        {input: { r: 0.5843, g: 0.5725, b: 0.5647 }, output: { cosmetic: 1 }},

        {input: { r: 0.5372, g: 0.5333, b: 0.5490 }, output: { without: 1 }},
        {input: { r: 0.3058, g: 0.2470, b: 0.2000 }, output: { standard: 1 }},
        {input: { r: 0.5960, g: 0.5411, b: 0.5137 }, output: { luxury: 1 }},
        {input: { r: 0.3960, g: 0.1921, b: 0.1294 }, output: { cosmetic: 1 }},

        {input: { r: 0.7019, g: 0.7019, b: 0.6980 }, output: { without: 1 }},
        {input: { r: 0.8470, g: 0.7882, b: 0.6901 }, output: { standard: 1 }},
        {input: { r: 0.7137, g: 0.6862, b: 0.6392 }, output: { luxury: 1 }},
        {input: { r: 0.5529, g: 0.3686, b: 0.2196 }, output: { cosmetic: 1 }},

        {input: { r: 0.5843, g: 0.5725, b: 0.5450 }, output: { without: 1 }},
        {input: { r: 0.8549, g: 0.8078, b: 0.8039 }, output: { standard: 1 }},
        {input: { r: 0.8000, g: 0.7568, b: 0.7215 }, output: { luxury: 1 }},
        {input: { r: 0.6000, g: 0.5098, b: 0.4392 }, output: { cosmetic: 1 }},

        {input: { r: 0.1647, g: 0.1529, b: 0.1490 }, output: { without: 1 }},
        {input: { r: 0.5882, g: 0.4823, b: 0.4235 }, output: { standard: 1 }},
        {input: { r: 0.7803, g: 0.7568, b: 0.7568 }, output: { luxury: 1 }},
        {input: { r: 0.6235, g: 0.5137, b: 0.4313 }, output: { cosmetic: 1 }},

        {input: { r: 0.3921, g: 0.4078, b: 0.4078 }, output: { without: 1 }},
        {input: { r: 0.4901, g: 0.4039, b: 0.3803 }, output: { standard: 1 }},
        {input: { r: 0.6705, g: 0.6705, b: 0.6705 }, output: { luxury: 1 }},
        {input: { r: 0.5764, g: 0.4705, b: 0.4039 }, output: { cosmetic: 1 }},

        {input: { r: 0.6117, g: 0.6117, b: 0.5725 }, output: { without: 1 }},
        {input: { r: 0.2235, g: 0.3333, b: 0.1607 }, output: { standard: 1 }},
        {input: { r: 0.7215, g: 0.7058, b: 0.7019 }, output: { luxury: 1 }},
        {input: { r: 0.5568, g: 0.5411, b: 0.5254 }, output: { cosmetic: 1 }},
    ];

    const config = {
        binaryThresh: 0.5,
        hiddenLayers: [3],
        activation: 'sigmoid',
    };

    const net = new brain.NeuralNetwork(config);

    net.train(trainingData);

    const [r, g, b] = data;
    const result = net.run({r: r / 255, g: g / 255, b: b / 255});


    let max = 0, maxName = 'without';
    for (let i in result) {
        if (max < result[i]) {
            max = result[i];
            maxName = i;
        }
    }

    return {win: maxName, ...result};
}

const palette = (data) => {
    const net = new brain.NeuralNetwork();

    net.train([
        {input: {r: 115 / 255, g: 114 / 255, b: 112 / 255}, output: {without: 1}},
        {input: {r: 199 / 255, g: 204 / 255, b: 206 / 255}, output: {without: 1}},
        {input: {r: 41 / 255, g: 36 / 255, b: 35 / 255}, output: {without: 1}},
        {input: {r: 177 / 255, g: 179 / 255, b: 188 / 255}, output: {without: 1}},
        {input: {r: 188 / 255, g: 177 / 255, b: 173 / 255}, output: {without: 1}},
        {input: {r: 145 / 255, g: 142 / 255, b: 136 / 255}, output: {without: 1}},
        {input: {r: 226 / 255, g: 226 / 255, b: 226 / 255}, output: {without: 1}},
        {input: {r: 44 / 255, g: 40 / 255, b: 36 / 255}, output: {without: 1}},
        {input: {r: 82 / 255, g: 77 / 255, b: 67 / 255}, output: {without: 1}},
        {input: {r: 76 / 255, g: 67 / 255, b: 62 / 255}, output: {without: 1}},
        {input: {r: 141 / 255, g: 136 / 255, b: 132 / 255}, output: {without: 1}},
        {input: {r: 229 / 255, g: 228 / 255, b: 230 / 255}, output: {without: 1}},
        {input: {r: 46 / 255, g: 43 / 255, b: 38 / 255}, output: {without: 1}},
        {input: {r: 76 / 255, g: 67 / 255, b: 63 / 255}, output: {without: 1}},
        {input: {r: 81 / 255, g: 76 / 255, b: 67 / 255}, output: {without: 1}},

        {input: {r: 125 / 255, g: 94 / 255, b: 73 / 255}, output: {standard: 1}},
        {input: {r: 220 / 255, g: 178 / 255, b: 146 / 255}, output: {standard: 1}},
        {input: {r: 22 / 255, g: 17 / 255, b: 13 / 255}, output: {standard: 1}},
        {input: {r: 182 / 255, g: 177 / 255, b: 163 / 255}, output: {standard: 1}},
        {input: {r: 150 / 255, g: 148 / 255, b: 174 / 255}, output: {standard: 1}},
        {input: {r: 191 / 255, g: 148 / 255, b: 95 / 255}, output: {standard: 1}},
        {input: {r: 62 / 255, g: 16 / 255, b: 6 / 255}, output: {standard: 1}},
        {input: {r: 114 / 255, g: 47 / 255, b: 8 / 255}, output: {standard: 1}},
        {input: {r: 228 / 255, g: 219 / 255, b: 201 / 255}, output: {standard: 1}},
        {input: {r: 234 / 255, g: 213 / 255, b: 165 / 255}, output: {standard: 1}},
        {input: {r: 182 / 255, g: 170 / 255, b: 146 / 255}, output: {standard: 1}},
        {input: {r: 40 / 255, g: 35 / 255, b: 30 / 255}, output: {standard: 1}},
        {input: {r: 100 / 255, g: 76 / 255, b: 51 / 255}, output: {standard: 1}},
        {input: {r: 223 / 255, g: 225 / 255, b: 228 / 255}, output: {standard: 1}},
        {input: {r: 127 / 255, g: 102 / 255, b: 62 / 255}, output: {standard: 1}},
        {input: {r: 113 / 255, g: 103 / 255, b: 97 / 255}, output: {standard: 1}},
        {input: {r: 220 / 255, g: 220 / 255, b: 219 / 255}, output: {standard: 1}},
        {input: {r: 22 / 255, g: 18 / 255, b: 17 / 255}, output: {standard: 1}},
        {input: {r: 182 / 255, g: 185 / 255, b: 188 / 255}, output: {standard: 1}},
        {input: {r: 165 / 255, g: 167 / 255, b: 177 / 255}, output: {standard: 1}},

        {input: {r: 199 / 255, g: 178 / 255, b: 157 / 255}, output: {luxury: 1}},
        {input: {r: 40 / 255, g: 33 / 255, b: 31 / 255}, output: {luxury: 1}},
        {input: {r: 241 / 255, g: 234 / 255, b: 226 / 255}, output: {luxury: 1}},
        {input: {r: 129 / 255, g: 101 / 255, b: 64 / 255}, output: {luxury: 1}},
        {input: {r: 107 / 255, g: 78 / 255, b: 49 / 255}, output: {luxury: 1}},
        {input: {r: 199 / 255, g: 178 / 255, b: 157 / 255}, output: {luxury: 1}},
        {input: {r: 40 / 255, g: 33 / 255, b: 31 / 255}, output: {luxury: 1}},
        {input: {r: 241 / 255, g: 234 / 255, b: 226 / 255}, output: {luxury: 1}},
        {input: {r: 129 / 255, g: 101 / 255, b: 64 / 255}, output: {luxury: 1}},
        {input: {r: 107 / 255, g: 78 / 255, b: 49 / 255}, output: {luxury: 1}},
        {input: {r: 196 / 255, g: 194 / 255, b: 197 / 255}, output: {luxury: 1}},
        {input: {r: 46 / 255, g: 44 / 255, b: 49 / 255},output: {luxury: 1}},
        {input: {r: 119 / 255, g: 115 / 255, b: 120 / 255}, output: {luxury: 1}},
        {input: {r: 108 / 255, g: 97 / 255, b: 86 / 255}, output: {luxury: 1}},
        {input: {r: 95 / 255, g: 81 / 255, b: 77 / 255}, output: {luxury: 1}},

        {input: {r: 151 / 255, g: 148 / 255, b: 143 / 255}, output: {cosmetic: 1}},
        {input: {r: 33 / 255, g: 24 / 255, b: 21 / 255},output: {cosmetic: 1}},
        {input: {r: 96 / 255, g: 52 / 255, b: 32 / 255}, output: {cosmetic: 1}},
        {input: {r: 124 / 255, g: 75 / 255, b: 48 / 255}, output: {cosmetic: 1}},
        {input: {r: 225 / 255, g: 227 / 255, b: 227 / 255}, output: {cosmetic: 1}},
        {input: {r: 116 / 255, g: 96 / 255, b: 82 / 255}, output: {cosmetic: 1}},
        {input: {r: 212 / 255, g: 200 / 255, b: 184 / 255}, output: {cosmetic: 1}},
        {input: {r: 57 / 255, g: 23 / 255, b: 31 / 255}, output: {cosmetic: 1}},
        {input: {r: 189 / 255, g: 169 / 255, b: 145 / 255}, output: {cosmetic: 1}},
        {input: {r: 171 / 255, g: 170 / 255, b: 176 / 255}, output: {cosmetic: 1}},
        {input: {r: 149 / 255, g: 146 / 255, b: 144 / 255}, output: {cosmetic: 1}},
        {input: {r: 34 / 255, g: 26 / 255, b: 22 / 255}, output: {cosmetic: 1}},
        {input: {r: 85 / 255, g: 52 / 255, b: 39 / 255}, output: {cosmetic: 1}},
        {input: {r: 99 / 255, g: 75 / 255, b: 54 / 255}, output: {cosmetic: 1}},
        {input: {r: 219 / 255, g: 229 / 255, b: 220 / 255}, output: {cosmetic: 1}},
        {input: {r: 101 / 255, g: 49 / 255, b: 33 / 255}, output: {cosmetic: 1}},
        {input: {r: 203 / 255, g: 182 / 255, b: 161 / 255}, output: {cosmetic: 1}},
        {input: {r: 173 / 255, g: 157 / 255, b: 146 / 255}, output: {cosmetic: 1}},
        {input: {r: 40 / 255, g: 15 / 255, b: 8 / 255}, output: {cosmetic: 1}},
        {input: {r: 150 / 255, g: 137 / 255, b: 142 / 255}, output: {cosmetic: 1}},
    ]);

    return data.reduce((sum, item) => {
        let [r, g, b] = item;

        r = r / 255;
        g = g / 255;
        b = b / 255;

        const output = net.run({r, g, b});

        sum.without += output.without;
        sum.standard += output.standard;
        sum.luxury += output.luxury;
        sum.cosmetic += output.cosmetic;

        return sum;
    }, {without: 0, standard: 0, luxury: 0, cosmetic: 0})
}

export default {dominant, palette}
