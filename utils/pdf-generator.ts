import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';

const publicPath = path.join(process.cwd(), 'public');

export const generatePdf = async (plan: any, user: any) => {
  const existingPdfBytes = await fetch(
    `${process.env.SERVER_URL}/files/pdf/${
      plan.srNo === 1
        ? 'WillCertificateLevel1.pdf'
        : plan.srNo === 2
        ? 'WillCertificateLevel2.pdf'
        : plan.srNo === 3
        ? 'WillCertificateLevel3.pdf'
        : plan.srNo === 4
        ? 'WillCertificateLevel4.pdf'
        : ''
    }`
  ).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);
  const helveticaFont = await pdfDoc.embedFont(
    fs.readFileSync(path.join(publicPath, 'files/fonts/KaushanScript-Regular.ttf'))
  );
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  firstPage.drawText(user.name, {
    x: 310,
    y: 350,
    size: 28,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  return pdfDoc.save();
};
