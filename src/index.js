import express from 'express'
import multer from 'multer'
import bodyParser from 'body-parser'
import palette from './palette'
import to from "await-to-js"
import path from "path"
import fs from "fs"

const app = express()
const PORT = 80
const upload = multer({ dest: 'src/' })

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

const handleError = (err, res) => {
    res.status(500).contentType("text/plain").end("Gu-est");
};

app.use(bodyParser.json())

app.post(
    '/upload',
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
        try {
            const tempPath = req.file.path
            const targetPath = path.join(__dirname, "./image.jpg")

            if (path.extname(req.file.originalname).toLowerCase() !== '.jpg') {
                fs.unlink(tempPath, err => {
                    if (err) return handleError(err, res);
                    res.status(403).contentType("text/plain").end("Gu-est")
                });
                return
            }

            fs.rename(tempPath, targetPath, async (err) => {
                const [error, data] = await to(palette());
                if (error) {
                    res.status(403).contentType("text/plain").end("Gu-est")
                    return
                }
                res.status(200).contentType("application/json").end(JSON.stringify(data))
            })
        } catch (error) {
            res.status(403).contentType("text/plain").end("Gu-est")
        }
})

app.get("/image.jpg", (req, res) => {
    res.sendFile(path.join(__dirname, "./image.jpg"));
});

app.get('/test', async (req, res) => {
    res.send(`
    <form method="post" enctype="multipart/form-data" action="/upload">
        <input type="file" name="file">
        <input type="submit" value="Submit">
    </form>
    `)
})

app.listen(PORT, () => {
    console.log(`Gu-est started`)
})
