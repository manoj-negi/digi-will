import { KeystoneContext } from '@keystone-6/core/types';
import fs, { ReadStream } from 'fs';
import { generatePdf } from '../utils/pdf-generator';
import Upload from 'graphql-upload/Upload.js';
import { sendCertificateMail } from '../utils/sendCertificateMail';
import { Readable } from 'stream';

export const certificate = `sendCertificate(id: String!, planId: String!): Certificate`;

function bufferToStream(buffer: Buffer) {
  const newStream = new Readable();
  newStream.push(buffer);
  newStream.push(null);
  return newStream;
}
const prepareFile = (filename: string, fileBytes: Uint8Array) => {
  const upload = new Upload();
  upload.resolve({
    createReadStream: () => bufferToStream(Buffer.from(fileBytes)) as ReadStream,
    filename,
    // @ts-ignore
    mimetype: 'application/pdf',
    encoding: 'utf-8',
  });
  return { upload };
};
export async function sendCertificate(
  root: any,
  { id, planId }: { id: string; planId: string },
  context: KeystoneContext
) {
  const user = (await context.sudo().db.User.findOne({
    where: {
      id: id,
    },
  })) as any;
  const plan = (await context.sudo().db.Plan.findOne({
    where: {
      id: planId,
    },
  })) as any;
  if ([3, 4].includes(plan?.srNo)) {
    console.log(`${plan.name} is not enabled for sending certificates`);
    return;
  }
  const pdfBytes = await generatePdf(plan, user);
  const certificateData = await context.sudo().query.Certificate.createOne({
    data: {
      user: { connect: { id } },
      certificate: prepareFile('will-certificate.pdf', pdfBytes),
    },
    query: 'id certificate { url }',
  });
  await sendCertificateMail(user.email, user.name, certificateData?.certificate?.url, plan);
  return certificateData;
}
