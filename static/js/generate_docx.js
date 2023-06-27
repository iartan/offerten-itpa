function generate() {
    const doc = new docx.Document({
        sections: [{
            properties: {},
            children: [
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            text: "Hello World",
                            font: {
                                name: "Calibri"
                            },
                            size: 22  // size 22 corresponds to 11 points
                        }),
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            text: "Foo Bar",
                            bold: true,
                            font: {
                                name: "Calibri"
                            },
                            size: 22
                        }),
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            text: "Github is the best",
                            bold: true,
                            font: {
                                name: "Calibri"
                            },
                            size: 22
                        }),
                    ],
                }),
            ],
        }]
    });

    docx.Packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
    });
}
