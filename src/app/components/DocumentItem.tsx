import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const DocumentItem = () => {
    const [file, setFile] = useState<File | null>(null);
    const [modifiedPdf, setModifiedPdf] = useState<Uint8Array | null>(null);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            setFile(selectedFile);
        }
    };

    const modifyPdf = async () => {
        if (!file) return;

        const fileReader = new FileReader();
        fileReader.onload = async () => {
            const existingPdfBytes = new Uint8Array(fileReader.result as ArrayBuffer);
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            // Add text to the first page
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];
            const { width, height } = firstPage.getSize();

            firstPage.drawText('Hello, world!', {
                x: 50,
                y: height - 50,
                size: 30,
                color: rgb(0, 0, 0),
            });

            // Embed an image
            const pngUrl = 'https://example.com/your-image.png'; // Replace with your image URL
            const pngImageBytes = await fetch(pngUrl).then(res => res.arrayBuffer());
            const pngImage = await pdfDoc.embedPng(pngImageBytes);

            firstPage.drawImage(pngImage, {
                x: 50,
                y: height - 150,
                width: 100,
                height: 100,
            });

            const pdfBytes = await pdfDoc.save();
            setModifiedPdf(pdfBytes);
        };
        fileReader.readAsArrayBuffer(file);
    };

    const downloadModifiedPdf = () => {
        if (!modifiedPdf) return;

        const blob = new Blob([modifiedPdf], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'modified.pdf';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={onFileChange} />
            <button onClick={modifyPdf}>Modify PDF</button>
            {modifiedPdf && (
                <div>
                    <button onClick={downloadModifiedPdf}>Download Modified PDF</button>
                    <embed src={URL.createObjectURL(new Blob([modifiedPdf], { type: 'application/pdf' }))} width="500" height="600" type="application/pdf" />
                </div>
            )}
        </div>
    );
};

export default DocumentItem;