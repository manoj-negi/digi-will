import { mergeSchemas } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { authMutations, AuthType, verifyOtp } from './custom-mutations/custom-auth';
import { sendCertificate, certificate } from './custom-mutations/send-certificate';
import { paymentVerify, verifyPayment } from './custom-mutations/verify-payment';
import { createEncData, encRequestType, encRequest } from './custom-mutations/init-ccAv';
import { sendBulkMail, BulkMail, BulkMailType } from './custom-mutations/send-bulk-mail';
import { generateOtp, generateOtpMutation, generateOtpType } from './custom-mutations/generate-otp';
import { generateSignupOtp, generateSignupOtpType, generateSignupOtpMutation } from './custom-mutations/generate-signup-otp';
import {willmeetupSignupType, willmeetupSignup, generateOtpReturnType } from './custom-mutations/willmeetup-signup';
const containerName = 'videos';

const typeDefs = String.raw`
${AuthType}
${encRequestType}
${BulkMailType}
${generateOtpType}
${generateSignupOtpType}
${generateOtpReturnType}

type Mutation {
    ${authMutations}
    ${certificate}
    ${paymentVerify}
    ${encRequest}
    ${BulkMail}
    ${generateOtpMutation}
    ${generateSignupOtpMutation}
    ${willmeetupSignupType}
  }
  type Query {
    playerVideo(id: ID!): Video
  }
`;

export const extendGraphqlSchema = (schema: GraphQLSchema) =>
  mergeSchemas({
    schemas: [schema],
    typeDefs,
    resolvers: {
      Mutation: {
        sendCertificate,
        verifyPayment,
        createEncData,
        sendBulkMail,
        generateOtp,
        generateSignupOtp,
        verifyOtp,
        willmeetupSignup
      },
      Query: {
        playerVideo: async (root, { id }, context) => {
          const video = await context.query.Video.findOne({
            where: { id: id },
            query: 'id name url{url}',
          });
          return video;
        },
      },
    },
  });
