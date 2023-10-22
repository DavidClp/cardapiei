var admin = require("firebase-admin");
const sharp = require("sharp"); // Importe a biblioteca Sharp

var serviceAccount = require("../database/config/firebase-key.json");

const BUCKET = "cardapiei-d51a3.appspot.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "cardapiei-d51a3.appspot.com"
});

const bucket = admin.storage().bucket();

const uploadImagem = (req, res, next) => {
    if (!req.file) return next();

    const imagem = req.file;
    //const nomeArquivo = Date.now() + "." + imagem.originalname.split(".").pop();
    const nomeArquivo = Date.now() + ".webp"; // Use a extensão '.webp' para o formato WebP

    const file = bucket.file("img_produtos/" + nomeArquivo);

    const stream = file.createWriteStream({
        metadata: {
            contentType: "image/webp", // Define o tipo de conteúdo como 'image/webp'
        },
    });

    stream.on("error", (e) => {
        console.error(e);
    });

    stream.on("finish", async () => {
        //tornar o arquivo publico 
        await file.makePublic();

        //obter a url publica
        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/img_produtos/${nomeArquivo}`;
        next();
    });
    // Use o Sharp para redimensionar e converter para WebP
    sharp(imagem.buffer)
       // .resize(600, 600) // Redimensionar para 800x600 pixels (substitua pelos valores desejados)
        .webp() // Converter para WebP
        .toBuffer((err, buffer) => {
            if (err) {
                console.error(err);
            } else {
                stream.end(buffer);
            }
        });
}

const uploadLogo = (req, res, next) => {
    if (!req.file) return next();

    const imagem = req.file;
    const nomeArquivo = Date.now() + ".webp"; // Use a extensão '.webp' para o formato WebP

    const file = bucket.file("logos_estabelecimentos/" + nomeArquivo);

    const stream = file.createWriteStream({
        metadata: {
            contentType: "image/webp", // Define o tipo de conteúdo como 'image/webp'
        },
    });

    stream.on("error", (e) => {
        console.error(e);
    });

    stream.on("finish", async () => {
        //tornar o arquivo publico 
        await file.makePublic();

        //obter a url publica
        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/logos_estabelecimentos/${nomeArquivo}`;
        next();
    });

    // Use o Sharp para redimensionar e converter para WebP
    sharp(imagem.buffer)
        //.resize(800, 600) // Redimensionar para 800x600 pixels (substitua pelos valores desejados)
        .webp() // Converter para WebP
        .toBuffer((err, buffer) => {
            if (err) {
                console.error(err);
            } else {
                stream.end(buffer);
            }
        });
}

module.exports = {
    uploadImagem,
    uploadLogo
};