import { KeystoneContext } from '@keystone-6/core/types';
import { bulkMail } from '../utils/bulkMail';
export const BulkMail = `sendBulkMail(html: String!, type: String!):BulkMailType`;

export const BulkMailType = `
  type BulkMailType {
    message: String! 
  }
`;

const chunkValue = 200;
const timeout = 6000;
export async function sendBulkMail(
  root: any,
  { html, type }: { html: any; type: String },
  context: KeystoneContext
) {
  if (context?.session?.data?.isAdmin) {
    let mailArray: any[] = [];
    let bcc: string | any[] = [];

    function spliceIntoChunks(arr: any, chunkSize: Number) {
      const res = [];
      while (arr.length > 0) {
        const chunk = arr.splice(0, chunkSize);
        res.push(chunk);
      }
      return res;
    }
    if (type === 'PAID_USERS') {
      const users = await context.sudo().db.User.findMany();
      if (users) {
        users.forEach(el => {
          mailArray.push(el.email);
        });
        bcc = spliceIntoChunks(mailArray, chunkValue);
      }
    }

    if (type === 'WILLMEETUP') {
      const WILLMEETUP = await context.sudo().db.WillMeetUp.findMany();
      if (WILLMEETUP) {
        WILLMEETUP.forEach(el => {
          mailArray.push(el.email);
        });
        bcc = spliceIntoChunks(mailArray, chunkValue);
      }
    }

    if (type === 'ALL') {
      let array1: any = [];
      let array2: any = [];
      let newArray = [];
      const users = await context.sudo().db.User.findMany();
      const WILLMEETUP = await context.sudo().db.WillMeetUp.findMany();

      if (users) {
        users.forEach(el => {
          array1.push(el.email);
        });
      }

      if (WILLMEETUP) {
        WILLMEETUP.forEach(el => {
          array2.push(el.email);
        });
      }

      if (array1 && array2) {
        newArray = array1.filter((val: String) => !array2.includes(val));
      }

      if (newArray) {
        newArray.forEach((el: { email: String }) => {
          mailArray.push(el.email);
        });
        bcc = spliceIntoChunks(mailArray, chunkValue);
      }
    }
    let i = 0;
    function mailLoop() {
      setTimeout(function () {
        i++;
        if (i <= bcc.length) {
          bulkMail(JSON.parse(html), bcc[i]);
          mailLoop();
        }
      }, timeout);
    }
    mailLoop();
    return { message: 'success' };
  } else {
    return new Error('somthing went wrong');
  }
}
