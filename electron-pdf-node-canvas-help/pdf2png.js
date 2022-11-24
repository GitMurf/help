const { getDocument } = require("pdfjs-dist/legacy/build/pdf.js");
const { createCanvas } = require('canvas');
const { writeFileSync } = require('fs');

async function savePdf2Png(filePath) {
    try {
        const pdfDoc = await getPdfDocument(filePath);

        // loop through each page of PDF
        for (let i = 1; i <= pdfDoc.numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const pgViewPort = page.getViewport({ scale: 1.0 });
            const pgCanvas = createCanvas(pgViewPort.width, pgViewPort.height);
            const pgContext = pgCanvas.getContext("2d");
            const renderContext = {
                canvasContext: pgContext,
                viewport: pgViewPort,
            };
            await page.render(renderContext).promise;

            // Convert the canvas to an image buffer.
            const pgImage = pgCanvas.toBuffer("image/png");
            writeFileSync(`./output/pgImage-${new Date().getTime().toString()}.png`, pgImage);
        }
/*
        console.log("# PDF document loaded.");
        // Get the first page.
        const page = await pdfDocument.getPage(1);
        // Render the page on a Node canvas with 100% scale.
        const viewport = page.getViewport({ scale: 1.0 });
        const canvasFactory = new NodeCanvasFactory();
        const canvasAndContext = canvasFactory.create(
            viewport.width,
            viewport.height
        );
        const renderContext = {
            canvasContext: canvasAndContext.context,
            viewport,
            canvasFactory,
        };

        const renderTask = page.render(renderContext);
        await renderTask.promise;
        // Convert the canvas to an image buffer.
        const image = canvasAndContext.canvas.toBuffer();
        fs.writeFile(`./output-${new Date().getTime().toString()}.png`, image, function (error) {
            if (error) {
                console.error("Error: " + error);
            } else {
                console.log(
                    "Finished converting first page of PDF file to a PNG image."
                );
            }
        });
*/
        // Release page resources.
        page.cleanup();
    } catch (reason) {
        console.log(reason);
    }
}

async function getPdfDocument(fileLocation) {
    // Some PDFs need external cmaps.
    const CMAP_URL = "./node_modules/pdfjs-dist/cmaps/";
    const CMAP_PACKED = true;

    // Where the standard fonts are located.
    const STANDARD_FONT_DATA_URL = './node_modules/pdfjs-dist/standard_fonts/';

    const getDocParams = {
        url: fileLocation,
        cMapUrl: CMAP_URL,
        cMapPacked: CMAP_PACKED,
        standardFontDataUrl: STANDARD_FONT_DATA_URL,
        disableFontFace: true,
        nativeImageDecoderSupport: 'none',
    };
    const pdfDoc = await getDocument(getDocParams).promise;
    return pdfDoc;
}

module.exports = {
    savePdf2Png,
};