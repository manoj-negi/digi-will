import 'dotenv/config';
import bodyParser from 'body-parser';
import path from 'path';
/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

import { config } from '@keystone-6/core';

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from './schemas';

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from './auth';

import { extendGraphqlSchema } from './custom-schema';
import { ValidatePayment } from './routes/validate-payment';
import { ValidatePaymentIos } from './routes/validate-payment-ios';
import { paymentCapture } from './routes/payment-capture';

import { Context } from '.keystone/types';

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    server: {
      maxFileSize: 500 * 1024 * 1024, // 500mb
      port: Number(process.env.PORT) || 8100,
      extendExpressApp: (app, context: Context) => {
        app.use(
          bodyParser.urlencoded({
            extended: true,
          })
        );
        app.use(bodyParser.json());
        app.use('/ccav', async (req, res, next) => {
          (req as any).context = context;
          next();
        });
        app.set('payment-pages', path.join(__dirname, 'payment-pages'));
        app.set('view engine', 'ejs');
        app.engine('html', require('ejs').renderFile);
        app.post('/ccav/redirect_url', ValidatePayment);
        app.post('/ccav/redirect_url_ios', ValidatePaymentIos);
        app.get('/ccav/catuture_payment', paymentCapture);
        app.get('/ccav/get', (req, res) => {
          res.redirect(
            '/ccav/success/6a06c9c15e187297b880228d6f57ac01e4c2554ae145a804eb5810953da0db8970aa1347207d407ec3b98e17e99157c1e11dd203f5bc79ecc6ce9e0245cc37f2d752d87027f4c5ca4a355b1056e324a62507229f4defcee70deab34aa18cf13f38a819154fc6372bf7a5d93e31a07e3fd001214739b3198fd6468214ffa85b77e363d2eb5d4cadda80dd439d9515f0d7bae5dc616199ca3b594e952a62323fd32bc9524a83deff896dd66889813dedaee08c742f700c4698e4a4bfc4126755474e881ac762b9c83c5486730a3daceb5d9889b53535c28af99c48789a02919f6cc393bf2e0c109f8817de1e82a252c165c257a0993b2548f8b54e6976403af89f59719bb46aa19180f1d975c69e50783c1750ee0d68d19d6b2516d787b6a262150697d6a13a24844f51b7625a9566a9bb86f33dc99d244f5866525b92e0be8fcd0c67ba8ffba1465e3998c41934a8c6da1a3e261bb395e0269d1eedcb26e74ae0194cd35f39382c9fe5412a5982375aac7fc70689eac25f5a6aaa4f98e40f88b6d0be1bee151cccf75ebb9d05f7f8f765321d34afc69dd0608d0f04cef370b9273297a3ced23095787d72acd13ca46f2854403d329a4982060abe22e6e26d20e3e7b5e81f6e7a4e571625612a684d33ac9089163824887631d8107b1ed9b28f48f2a50de7351d48af9947fb76f3636dc6551812d8c16c29087c057ed3e8f6819f1b30ca5cbe27e4fb8dc9c83c3dfb58c503c15b1bfd288c9a3a54dfd1f42b833d986e88f2c1f515ef3b5dd9bcb7e51b1b953d9375e990fb713a1e76d05b72bd9162790f2ef1df4f7e524fe06b22eb44a998521537c5df1b47ce3cb168e9592f0f483420d83d9b204e391888a9e49caa4546e57f242900ed6dc9609876b9074f866ef12330f6788e6d670727f652bf6e4c14f9993f86ca9dab09498e6a13b7f72713ad8a61128cbe12282cb3dcdd34a3d975932e16eec8a1daea198e606ecfddf717cd0049d4f063926d5f48e962524e839e7d0d7a696e4a8ea87ccf2c78534b7efffde8345229c0477e8e2fbbd4df15254af461d2a7509e148f262d5ea34ba33b5e7006ae6698f9f015b179c9dbe98e695388b0647fec2ec0c45af2648eca1e90b36c265f8f982c9f60478498f4be6d2a9ed9851d8662ec856ad691c091dcc546268755b3b2b3c0c835714b5b0dc45746'
          );
        });
        app.get('/ccav/capture/:encResp', (req, res) => {
          res.send('tag id' + req.query.encResp);
        });
        app.get('/ccav/success/?:encResp', (req, res) => {
          res.sendFile(`payment-pages/success.html`, { root: '.' });
        });

        app.get('/ccav/failiure', (req, res) => {
          res.sendFile(`payment-pages/failiure.html`, { root: '.' });
        });
      },
    },

    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: 'postgresql',
      url: process.env.DB_URL!,
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: context => !!context.session?.data,
    },
    storage: {
      my_local_files: {
        kind: 'local',
        type: 'file',
        generateUrl: path => `${process.env.SERVER_URL}/files${path}`,
        serverRoute: {
          path: '/files',
        },
        storagePath: 'public/files',
      },
      my_local_images: {
        kind: 'local',
        type: 'image',
        generateUrl: path => `${process.env.SERVER_URL}/images${path}`,
        serverRoute: {
          path: '/images',
        },
        storagePath: 'public/images',
      },
    },
    lists,
    extendGraphqlSchema,
    session,
  })
);
