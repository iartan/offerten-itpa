function generateTable() {
    const doc = new docx.Document({
        sections: [
            {
                children: [
                    new docx.Table({
                        rows: [
                            new docx.TableRow({
                                children: [
                                    new docx.TableCell({
                                        children: [new docx.Paragraph({}), new docx.Paragraph({})],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                    }),
                                    new docx.TableCell({
                                        children: [new docx.Paragraph({}), new docx.Paragraph({})],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                    }),
                                    new docx.TableCell({
                                        children: [new docx.Paragraph({ text: "bottom to top" }), new docx.Paragraph({})],
                                        textDirection: docx.TextDirection.BOTTOM_TO_TOP_LEFT_TO_RIGHT,
                                    }),
                                    new docx.TableCell({
                                        children: [new docx.Paragraph({ text: "top to bottom" }), new docx.Paragraph({})],
                                        textDirection: docx.TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
                                    }),
                                ],
                            }),
                            new docx.TableRow({
                                children: [
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph({
                                                text: "Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah",
                                                heading: docx.HeadingLevel.HEADING_1,
                                            }),
                                        ],
                                    }),
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph({
                                                text: "This text should be in the middle of the cell",
                                            }),
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                    }),
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph({
                                                text: "Text above should be vertical from bottom to top",
                                            }),
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                    }),
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph({
                                                text: "Text above should be vertical from top to bottom",
                                            }),
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            },
        ],
    });

    docx.Packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
    });
}
