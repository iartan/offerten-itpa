function generateTable() {

    // Fetch the priceList
    const priceList = window.data.priceList;
    console.log(priceList);
    // Create the table
    let tableRows = [];

    // Puch header row
    // Push main module row
    tableRows.push(new docx.TableRow({
        children: [
            createShadedCell("Modul"),
            createShadedCell("User"),
            createShadedCell("Bruttopreis"),
            createShadedCell("Rabatt%"),
            createShadedCell("Nettopreis"),
            createShadedCell("Wartung%"),
            createShadedCell("Wartung"),
        ],
    }));

    priceList.mainModules.forEach((mainModule, mainIndex) => {
        // Calculate the total for the mainModule
        let mainModuleTotalMaintenance = window.data.getMainModuleTotalMaintenance(mainModule);
        let mainModuleTotalGrossPrice = window.data.getMainModuleTotalGrossPrice(mainModule);
        let mainModuleTotalNetPrice = window.data.getMainModuleTotalNetPrice(mainModule);
        
        // Push main module row
        tableRows.push(new docx.TableRow({
            children: [
                new docx.TableCell({ children: [createBoldParagraph(mainModule.name)] }),
                new docx.TableCell({ children: [createBoldParagraph("1")] }),
                new docx.TableCell({ children: [createBoldParagraph(mainModuleTotalGrossPrice.toString())] }),
                new docx.TableCell({ children: [createBoldParagraph(mainModule.discount)] }),
                new docx.TableCell({ children: [createBoldParagraph(mainModuleTotalNetPrice.toString())] }),
                new docx.TableCell({ children: [createBoldParagraph(mainModule.maintenance)] }),
                new docx.TableCell({ children: [createBoldParagraph(mainModuleTotalMaintenance.toString())] }),  // total needs to be calculated
                // new docx.TableCell({ children: [createParagraph("")] }),
            ],
        }));
    
        // Push sub module rows
        mainModule.modules.forEach((module, subIndex) => {
            // Check if the module is checked before pushing the row
            if(module.checked) {
                tableRows.push(new docx.TableRow({
                    children: [
                        new docx.TableCell({ children: [createParagraph(module.name)] }),
                        new docx.TableCell({ children: [createParagraph("")] }),
                        new docx.TableCell({ children: [createParagraph(module.price.toFixed(2))] }),
                        new docx.TableCell({ children: [createParagraph("")] }),
                        new docx.TableCell({ children: [createParagraph(module.netPrice.toFixed(2))] }),
                        new docx.TableCell({ children: [createParagraph("")] }),
                        new docx.TableCell({ children: [createParagraph(module.total.toFixed(2))] }),  // total needs to be calculated
                        // new docx.TableCell({ children: [createParagraph(module.checked ? "✓" : "")] }),
                    ],
                }));
            }
        });
    });
    
    // Push grand total row
    let grandTotalGrossPrice = window.data.getGrandTotalGrossPrice();
    let grandTotalNetPrice = window.data.getGrandTotalNetPrice();
    let grandTotalMaintenance = window.data.getGrandTotalMaintenance();

    // tableRows.push(new docx.TableRow({
    //     children: [
    //         new docx.TableCell({ children: [createParagraph("Grand Total")] }),
    //         new docx.TableCell({ children: [createParagraph(grandTotal.toString())] }),
    //     ],
    // }));

    tableRows.push(new docx.TableRow({
        children: [
            createShadedCell("Total einmalige Lizenzkosten in CHF"),
            createShadedCell(""),
            createShadedCell(grandTotalGrossPrice.toString()),
            createShadedCell(""),
            createShadedCell(grandTotalNetPrice.toString()),
            createShadedCell(""),
            createShadedCell(""),
        ],
    }));

    tableRows.push(new docx.TableRow({
        children: [
            createShadedCell("Wartungsvertrag pro Jahr in CHF"),
            createShadedCell(""),
            createShadedCell(),
            createShadedCell(""),
            createShadedCell(),
            createShadedCell(""),
            createShadedCell(grandTotalMaintenance.toString()),
        ],
    }));

    // Create the docx table
    const table = new docx.Table({
        width: {
            size: 100,
            type: docx.WidthType.PERCENTAGE,
        }, 
        rows: tableRows });

    // Create the document
    const doc = new docx.Document({
        sections: [{
            children: [table],
        }],
    });

    docx.Packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
    });
}

const size = 24; // The size is measured in half-points, so 12 points equals 24 half-points

// Create a paragraph with the desired settings
function createParagraph(text) {
    return new docx.Paragraph({
        children: [
            new docx.TextRun({
                text: text,
                font: {
                    name: "Calibri",
                },
                size: size,
            }),
        ],
    });
}

// Create a bold paragraph with the desired settings
function createBoldParagraph(text) {
    return new docx.Paragraph({
        children: [
            new docx.TextRun({
                text: text,
                bold: true,
                font: {
                    name: "Calibri",
                },
                size: 24, // Or whatever size you want
            }),
        ],
    });
}

// Create a cell with the desired settings
function createShadedCell(text) {
    return new docx.TableCell({
        children: [createBoldParagraph(text)],
        shading: {
            fill: "ADD8E6", // Hex code for color. "d9d9d9" is light gray.
            color: "auto",
            val: docx.ShadingType.CLEAR
        },
        verticalAlign: docx.VerticalAlign.CENTER,
        borders: {
            // top: { style: docx.BorderStyle.DASH_DOT_STROKED },
            // bottom: { style: docx.BorderStyle.DASH_DOT_STROKED },
            // left: { style: docx.BorderStyle.DASH_DOT_STROKED },
            // right: { style: docx.BorderStyle.DASH_DOT_STROKED },
        }
    });
}
