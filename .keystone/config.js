"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config3 = require("dotenv/config");
var import_body_parser = __toESM(require("body-parser"));
var import_path2 = __toESM(require("path"));
var import_core3 = require("@keystone-6/core");

// schemas/user.ts
var import_fields = require("@keystone-6/core/fields");

// lib/access.ts
var userIsAdminOrSelfOrOwnerFilter = ({ session: session2, listKey }) => {
  if (!session2)
    return false;
  if (!!session2?.data?.isAdmin)
    return true;
  if (listKey === "User") {
    return { id: { equals: session2.itemId } };
  }
  return { user: { id: { equals: session2.itemId } } };
};
var access = {
  isAdmin: ({ session: session2 }) => Boolean(session2?.data?.isAdmin),
  isLoggedIn: ({ session: session2 }) => Boolean(session2?.data),
  userIsAdminOrSelfOrOwnerFilter
};
var defaultAccess = {
  query: () => true,
  update: access.isAdmin,
  create: access.isAdmin,
  delete: access.isAdmin
};

// schemas/lib.ts
var import_list_plugins = require("@k6-contrib/list-plugins");
var import_core = require("@keystone-6/core");
var withTracking = (0, import_list_plugins.configureTracking)({
  atTrackingOptions: { isIndexed: true }
});
function list(config2) {
  return (0, import_core.list)(
    withTracking({
      access: {
        operation: defaultAccess
      },
      ...config2
    })
  );
}

// schemas/user.ts
var User = list({
  ui: {
    isHidden: ({ session: session2 }) => session2.data.isAdmin ? false : true,
    listView: {
      initialColumns: ["name", "email", "isAdmin"]
    }
  },
  access: {
    operation: {
      create: access.isAdmin,
      update: access.isLoggedIn,
      delete: access.isAdmin,
      query: access.isLoggedIn
    },
    filter: {
      query: access.userIsAdminOrSelfOrOwnerFilter,
      update: access.userIsAdminOrSelfOrOwnerFilter
    }
  },
  fields: {
    name: (0, import_fields.text)({ validation: { isRequired: true } }),
    email: (0, import_fields.text)({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true
    }),
    username: (0, import_fields.text)(),
    azureId: (0, import_fields.text)(),
    phone: (0, import_fields.text)(),
    pincode: (0, import_fields.text)(),
    city: (0, import_fields.text)(),
    state: (0, import_fields.text)(),
    country: (0, import_fields.text)(),
    address: (0, import_fields.text)(),
    organization: (0, import_fields.text)(),
    password: (0, import_fields.password)({ validation: { isRequired: true } }),
    isAdmin: (0, import_fields.checkbox)(),
    isVerified: (0, import_fields.checkbox)(),
    subscription: (0, import_fields.relationship)({ ref: "Subscription.user", many: true }),
    certificate: (0, import_fields.relationship)({ ref: "Certificate.user", many: true })
  }
});

// schemas/certificate.ts
var import_fields2 = require("@keystone-6/core/fields");

// lib/s3-images.ts
var import_config = require("dotenv/config");
var s3Config = {
  bucket: process.env.S3_BUCKET,
  // name of bucket
  baseUrl: `${process.env.S3_BASE_URL}`,
  // if provided the url is not compouted from endpoint and folder, rather use this as `${baseUrl}/${filename}`
  s3Options: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    endpoint: process.env.S3_ENDPOINT
    // use region for aws, endpoint for s3 compatible storage
  },
  uploadParams() {
    return {
      ACL: "public-read"
      // needed to make it public
    };
  }
};
var notificationImages = {
  ...s3Config,
  folder: "notification-images",
  baseUrl: `${s3Config.baseUrl}/notification-images`
};
var videosConfig = {
  ...s3Config,
  folder: "videos",
  baseUrl: `${s3Config.baseUrl}/videos`
};
var videoThumbnail = {
  ...s3Config,
  folder: "videos/thumbnails",
  baseUrl: `${s3Config.baseUrl}/videos/thumbnails`
};
var anouncementImages = {
  ...s3Config,
  folder: "announcement",
  baseUrl: `${s3Config.baseUrl}/announcement`
};
var eventImages = {
  ...s3Config,
  folder: "event-images",
  baseUrl: `${s3Config.baseUrl}/event-images`
};
var BannerImages = {
  ...s3Config,
  folder: "banner-images",
  baseUrl: `${s3Config.baseUrl}/banner-images`
};
var bulletinImages = {
  ...s3Config,
  folder: "bulletin-images",
  baseUrl: `${s3Config.baseUrl}/bulletin-images`
};
var certificates = {
  ...s3Config,
  folder: "certificates",
  baseUrl: `${s3Config.baseUrl}/certificates`
};

// schemas/certificate.ts
var import_fields_s3 = require("@k6-contrib/fields-s3");
var Certificate = list({
  ui: {
    isHidden: ({ session: session2 }) => session2.data.isAdmin ? false : true
  },
  access: {
    operation: {
      ...defaultAccess,
      create: access.isLoggedIn
    },
    filter: {
      query: access.userIsAdminOrSelfOrOwnerFilter
    }
  },
  fields: {
    user: (0, import_fields2.relationship)({ ref: "User.certificate" }),
    certificate: (0, import_fields_s3.s3File)({ s3Config: certificates }),
    createdAt: (0, import_fields2.timestamp)({ defaultValue: { kind: "now" } })
  }
});

// schemas/announcement.ts
var import_fields3 = require("@keystone-6/core/fields");
var import_date_fns = require("date-fns");
var import_fields_s32 = require("@k6-contrib/fields-s3");
var Announcement = list({
  access: {
    operation: defaultAccess,
    filter: {
      query: async ({ session: session2 }) => {
        let todayDate = (0, import_date_fns.endOfDay)(/* @__PURE__ */ new Date());
        if (!session2?.data?.isAdmin) {
          return { date: { lte: todayDate } };
        } else {
          return true;
        }
      }
    }
  },
  ui: {
    isHidden: ({ session: session2 }) => session2.data.isAdmin ? false : true
  },
  fields: {
    title: (0, import_fields3.text)(),
    date: (0, import_fields3.timestamp)({ validation: { isRequired: true }, defaultValue: { kind: "now" } }),
    information: (0, import_fields3.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    linkType: (0, import_fields3.select)({
      options: [
        { label: "app", value: "app" },
        { label: "web", value: "web" }
      ],
      ui: {
        displayMode: "segmented-control"
      }
    }),
    link: (0, import_fields3.text)(),
    linkTarget: (0, import_fields3.text)(),
    image: (0, import_fields_s32.s3Image)({ s3Config: anouncementImages }),
    createdAt: (0, import_fields3.timestamp)({ defaultValue: { kind: "now" } })
  }
});

// schemas/bulletin.ts
var import_fields4 = require("@keystone-6/core/fields");
var import_fields_s33 = require("@k6-contrib/fields-s3");
var Bulletin = list({
  access: { operation: defaultAccess },
  ui: {
    isHidden: ({ session: session2, context }) => session2.data.isAdmin ? false : true
  },
  fields: {
    title: (0, import_fields4.text)(),
    subTitle: (0, import_fields4.text)(),
    url: (0, import_fields4.text)(),
    image: (0, import_fields_s33.s3Image)({ s3Config: bulletinImages }),
    information: (0, import_fields4.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    createdAt: (0, import_fields4.timestamp)({ defaultValue: { kind: "now" } })
  }
});

// schemas/config.ts
var import_fields5 = require("@keystone-6/core/fields");
var Config = list({
  ui: {
    isHidden: ({ session: session2, context }) => session2.data.isAdmin ? false : true
  },
  access: {
    operation: {
      ...defaultAccess,
      create: access.isAdmin
    }
  },
  fields: {
    key: (0, import_fields5.select)({
      options: [
        { label: "Container", value: "Container" },
        { label: "License", value: "License" }
      ],
      isIndexed: "unique",
      validation: { isRequired: true }
    }),
    value: (0, import_fields5.text)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields5.timestamp)({ defaultValue: { kind: "now" } })
  }
});

// schemas/event.ts
var import_fields6 = require("@keystone-6/core/fields");
var import_fields_s34 = require("@k6-contrib/fields-s3");
var Event = list({
  access: {
    operation: defaultAccess
  },
  ui: {
    isHidden: ({ session: session2 }) => session2.data.isAdmin ? false : true
  },
  fields: {
    title: (0, import_fields6.text)(),
    subTitle: (0, import_fields6.text)(),
    startDate: (0, import_fields6.timestamp)({ defaultValue: { kind: "now" } }),
    endDate: (0, import_fields6.timestamp)({ defaultValue: { kind: "now" } }),
    url: (0, import_fields6.text)(),
    information: (0, import_fields6.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    image: (0, import_fields_s34.s3Image)({ s3Config: eventImages }),
    createdAt: (0, import_fields6.timestamp)({ defaultValue: { kind: "now" } })
  }
});

// schemas/plan.ts
var import_fields7 = require("@keystone-6/core/fields");
var Plan = list({
  ui: {
    isHidden: ({ session: session2, context }) => session2.data.isAdmin ? false : true
  },
  fields: {
    name: (0, import_fields7.text)({ validation: { isRequired: true } }),
    srNo: (0, import_fields7.integer)(),
    random: (0, import_fields7.select)({
      options: [
        { label: "True", value: "True" },
        { label: "False", value: "False" }
      ],
      ui: {
        displayMode: "segmented-control"
      },
      defaultValue: "False"
    }),
    price: (0, import_fields7.float)({ validation: { isRequired: true } }),
    description: (0, import_fields7.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    subscription: (0, import_fields7.relationship)({ ref: "Subscription.plan", many: true }),
    video: (0, import_fields7.relationship)({ ref: "Video.plan", many: true })
  }
});

// schemas/subscription.ts
var import_fields8 = require("@keystone-6/core/fields");
var Subscription = list({
  ui: {
    isHidden: ({ session: session2, context }) => session2.data.isAdmin ? false : true
  },
  access: {
    operation: defaultAccess,
    filter: {
      query: access.userIsAdminOrSelfOrOwnerFilter
    }
  },
  fields: {
    plan: (0, import_fields8.relationship)({ ref: "Plan.subscription" }),
    user: (0, import_fields8.relationship)({ ref: "User.subscription" }),
    paymentStatus: (0, import_fields8.text)(),
    paymentId: (0, import_fields8.text)(),
    amount: (0, import_fields8.float)({ validation: { isRequired: true } }),
    transactionDate: (0, import_fields8.timestamp)({ defaultValue: { kind: "now" } })
  }
});

// schemas/video.ts
var import_fields9 = require("@keystone-6/core/fields");
var import_fields_s35 = require("@k6-contrib/fields-s3");
var Video = list({
  access: {
    operation: defaultAccess,
    filter: {
      query: async ({ session: session2, context, listKey }) => {
        if (session2?.data?.isAdmin) {
          return true;
        }
        if (!session2?.data?.isAdmin) {
          let plans = [];
          session2?.data?.subscription?.map((item) => {
            plans.push(item.plan.id);
          });
          return {
            OR: [{ plan: { id: { in: plans } } }, { isPublic: { equals: true } }]
          };
        }
      }
    }
  },
  fields: {
    name: (0, import_fields9.text)({ validation: { isRequired: true } }),
    srNo: (0, import_fields9.integer)(),
    video_type: (0, import_fields9.select)({
      options: [
        { label: "Cloud", value: "cloud" },
        { label: "Youtube", value: "youtube" }
      ],
      ui: {
        displayMode: "segmented-control"
      },
      defaultValue: "youtube"
    }),
    isPublic: (0, import_fields9.checkbox)(),
    isFeatured: (0, import_fields9.checkbox)(),
    videoId: (0, import_fields9.text)(),
    url: (0, import_fields_s35.s3File)({ s3Config: videosConfig }),
    thumbnail: (0, import_fields_s35.s3Image)({ s3Config: videoThumbnail }),
    plan: (0, import_fields9.relationship)({ ref: "Plan.video" })
  },
  hooks: {
    resolveInput: async ({ listKey, operation, inputData, item, resolvedData, context }) => {
      if (operation == "create" || operation == "update") {
        if (resolvedData?.videoId?.split("v=")[1]) {
          let video_id = resolvedData?.videoId?.split("v=")[1];
          let ampersandPosition = video_id.indexOf("&");
          if (ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
          }
          resolvedData.videoId = video_id;
        }
      }
      return resolvedData;
    }
  }
});

// schemas/watchingList.ts
var import_fields10 = require("@keystone-6/core/fields");
var WatchingList = list({
  ui: {
    isHidden: ({ session: session2, context }) => session2.data.isAdmin ? false : true
  },
  access: {
    operation: {
      ...defaultAccess,
      create: access.isLoggedIn,
      update: access.isLoggedIn
    },
    filter: {
      query: access.userIsAdminOrSelfOrOwnerFilter,
      update: access.userIsAdminOrSelfOrOwnerFilter
    }
  },
  fields: {
    video: (0, import_fields10.relationship)({ ref: "Video" }),
    user: (0, import_fields10.relationship)({ ref: "User" }),
    duration: (0, import_fields10.text)(),
    watchtime: (0, import_fields10.text)(),
    status: (0, import_fields10.select)({
      options: [
        { label: "InProgress", value: "InProgress" },
        { label: "Complete", value: "Complete" }
      ],
      ui: {
        displayMode: "segmented-control"
      },
      defaultValue: "InProgress"
    })
  }
});

// schemas/membership.ts
var import_fields11 = require("@keystone-6/core/fields");
var Membership = list({
  ui: {
    isHidden: ({ session: session2 }) => session2.data.isAdmin ? false : true
  },
  access: {
    operation: {
      ...defaultAccess,
      create: () => true
    }
  },
  fields: {
    location: (0, import_fields11.select)({
      options: [
        { label: "India", value: "India" },
        { label: "Global", value: "Global" }
      ],
      ui: {
        displayMode: "segmented-control"
      },
      defaultValue: "India"
    }),
    type: (0, import_fields11.select)({
      options: [
        { label: "Individual", value: "individual" },
        { label: "Corporate", value: "corporate" }
      ],
      ui: {
        displayMode: "segmented-control"
      },
      defaultValue: "India"
    }),
    name: (0, import_fields11.text)(),
    phone: (0, import_fields11.text)(),
    email: (0, import_fields11.text)(),
    designation: (0, import_fields11.text)(),
    company: (0, import_fields11.text)(),
    pincode: (0, import_fields11.text)(),
    city: (0, import_fields11.text)(),
    state: (0, import_fields11.text)(),
    country: (0, import_fields11.text)(),
    address: (0, import_fields11.text)()
  }
});

// schemas/banner.ts
var import_fields12 = require("@keystone-6/core/fields");
var import_access12 = require("@keystone-6/core/access");
var import_fields_s36 = require("@k6-contrib/fields-s3");
var Banner = list({
  access: import_access12.allowAll,
  ui: {
    isHidden: ({ session: session2 }) => session2.data.isAdmin ? false : true
  },
  fields: {
    name: (0, import_fields12.text)(),
    banner_type: (0, import_fields12.select)({
      options: [
        { label: "Image", value: "image" },
        { label: "Video", value: "video" }
      ],
      ui: {
        displayMode: "segmented-control"
      },
      defaultValue: "image"
    }),
    videoId: (0, import_fields12.text)(),
    image: (0, import_fields_s36.s3Image)({ s3Config: BannerImages }),
    active: (0, import_fields12.checkbox)(),
    createdAt: (0, import_fields12.timestamp)({ defaultValue: { kind: "now" } })
  },
  hooks: {
    resolveInput: async ({ operation, resolvedData }) => {
      if (operation == "create" || operation == "update") {
        if (resolvedData?.videoId?.split("v=")[1]) {
          let video_id = resolvedData?.videoId?.split("v=")[1];
          let ampersandPosition = video_id.indexOf("&");
          if (ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
          }
          resolvedData.videoId = video_id;
        }
      }
      return resolvedData;
    }
  }
});

// schemas/callRequest.ts
var import_fields13 = require("@keystone-6/core/fields");

// utils/callRequestMail.ts
var import_process = __toESM(require("process"));
var import_nodemailer = require("nodemailer");
async function sendMail(to, subject, text17, useHtml = false, attachment) {
  const transporter = (0, import_nodemailer.createTransport)({
    //@ts-ignore
    host: import_process.default.env.MAIL_HOST,
    port: import_process.default.env.MAIL_PORT,
    auth: {
      user: import_process.default.env.MAIL_USERNAME,
      pass: import_process.default.env.MAIL_SECRET
    }
  });
  await transporter.sendMail({
    from: import_process.default.env.MAIL_FROM,
    to: `${to}`,
    subject,
    ...useHtml ? { html: text17 } : { text: text17 }
  });
}
async function sendCallRequestMail({ item }) {
  await sendMail(
    import_process.default.env.MAIL_CALL_REQUEST_TO,
    "WILL Forum Greetings!",
    `<p>Greetings! </p>
    <p>We have a new request for Call A mentor </br>
    Here are the details of form response. </p>
    <p>Name - ${item?.name || ""}</br>
    Email - ${item?.email || ""}</br>
    Contact No. - ${item?.phoneNumber || ""}</br>
    Message - ${item?.message || ""}</br>
    Time - ${item?.time || ""}</p>
    <p>Regards</p> 
    <h4>Team WILL Forum </h4>`,
    true,
    ""
  );
}

// utils/callRequestUserMail.ts
var import_process2 = __toESM(require("process"));
var import_nodemailer2 = require("nodemailer");
async function sendMail2(to, subject, text17, useHtml = false, attachment) {
  const transporter = (0, import_nodemailer2.createTransport)({
    //@ts-ignore
    host: import_process2.default.env.MAIL_HOST,
    port: import_process2.default.env.MAIL_PORT,
    auth: {
      user: import_process2.default.env.MAIL_USERNAME,
      pass: import_process2.default.env.MAIL_SECRET
    }
  });
  await transporter.sendMail({
    from: import_process2.default.env.MAIL_FROM,
    to: `${to}`,
    subject,
    ...useHtml ? { html: text17 } : { text: text17 }
  });
}
async function sendCallRequestUserMail({ item }) {
  await sendMail2(
    item?.email,
    "WILL Forum",
    `<p>Dear ${item?.name || ""} </p>
    <p>Greetings!</p> 
    <p>Your request for connecting with a WILL mentor for a 30 minutes guidance session has been received!</br>
    This Feature gives you the opportunity to discuss and receive guidance from our distinguished WILL Mentors at just Rs. 299 per 30 minute session.</br> 
    Kindly click here to continue to make your payment Online: <a target="_blank" href="${import_process2.default.env.CALL_REQUEST_PAYMENT_LINK || ""}">${import_process2.default.env.CALL_REQUEST_PAYMENT_LINK || ""}</a> </br>
    You will receive a Confirmed Session Call Time one of our WILL Mentors within 24 hours of the payment confirmation.</br> 
    Please check the Option box below for Mentor requirement:  </br>
    <input type="checkbox"> Dial Courage </br> 
    <input type="checkbox"> Dial Conviction </br> 
    <input type="checkbox"> Dial Confidence </br> 
    <input type="checkbox"> Dial Self-Branding </br> 
    <input type="checkbox"> Dial Networking </br> 
    <input type="checkbox"> Dial Work-Life Balance </br> 
    <input type="checkbox"> Dial Power of Self </br> 
    <input type="checkbox"> Dial Wellness </br> 
    <p>All the best!</p> 
    <h4>CEO WILL Forum India </h4>`,
    true,
    ""
  );
}

// schemas/callRequest.ts
var CallRequest = list({
  ui: {
    isHidden: ({ session: session2 }) => session2.data.isAdmin ? false : true
  },
  access: {
    operation: { ...defaultAccess, create: () => true }
  },
  fields: {
    name: (0, import_fields13.text)(),
    email: (0, import_fields13.text)(),
    phoneNumber: (0, import_fields13.text)(),
    message: (0, import_fields13.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    time: (0, import_fields13.text)()
  },
  hooks: {
    afterOperation: async ({ operation, item }) => {
      if (operation == "create") {
        await sendCallRequestMail({ item });
        await sendCallRequestUserMail({ item });
      }
    }
  }
});

// schemas/willMeetup.ts
var import_fields14 = require("@keystone-6/core/fields");

// utils/willmeetupMail.ts
var import_process3 = __toESM(require("process"));
var import_nodemailer3 = require("nodemailer");
async function sendMail3(to, subject, text17, useHtml = false, attachment) {
  const transporter = (0, import_nodemailer3.createTransport)({
    //@ts-ignore
    host: import_process3.default.env.MAIL_HOST,
    port: import_process3.default.env.MAIL_PORT,
    auth: {
      user: import_process3.default.env.MAIL_USERNAME,
      pass: import_process3.default.env.MAIL_SECRET
    }
  });
  await transporter.sendMail({
    from: import_process3.default.env.MAIL_FROM,
    to: `${to}`,
    subject,
    ...useHtml ? { html: text17 } : { text: text17 }
  });
}
async function sendWillMeetUpMail({ item }) {
  await sendMail3(
    import_process3.default.env.MAIL_WILLMEETUP_TO,
    `${item?.name} has requested to join #WILLMEETUP`,
    `<p>Dear Admin,</p></br>
    <p>We have a new request to join <strong>#WILLMEETUP</strong></br></br>
    Here are the details of form response.  </p>
    <table style="width:100%; border:0px">
    <tr>
      <td style="border:0px">Name:</td>
      <td style="border:0px">${item?.name}</td>
    </tr>
    <tr>
      <td style="border:0px">Email:</td>
      <td style="border:0px">${item?.email}</td>
    </tr>
    <tr>
    <td style="border:0px">Contact No:</td>
    <td style="border:0px">${item?.phoneNumber}</td>
  </tr>
  <tr>
    <td style="border:0px">Company/ Organization:</td>
    <td style="border:0px">${item?.organization}</td>
  </tr>
    </table
    <p>Regards</p> 
    <h4>Team WILL Forum </h4>`,
    true,
    ""
  );
}

// utils/willmeetupUserMail.ts
var import_process4 = __toESM(require("process"));
var import_nodemailer4 = require("nodemailer");
async function sendMail4(to, subject, text17, useHtml = false, attachment) {
  const transporter = (0, import_nodemailer4.createTransport)({
    //@ts-ignore
    host: import_process4.default.env.MAIL_HOST,
    port: import_process4.default.env.MAIL_PORT,
    auth: {
      user: import_process4.default.env.MAIL_USERNAME,
      pass: import_process4.default.env.MAIL_SECRET
    }
  });
  await transporter.sendMail({
    from: import_process4.default.env.MAIL_FROM,
    to: `${to}`,
    subject,
    ...useHtml ? { html: text17 } : { text: text17 }
  });
}
async function sendWillMeetUpUserMail({ item }) {
  await sendMail4(
    item.email,
    "Request to join #WILLMEETUP - WILL Forum ",
    `<p>Dear ${item.name} </p>
    <p>Congratulations!</p></br>
    <p>
    Your request to join <strong>#WILLMEETUP</strong> has been successfully approved:</br></br>
    Welcome to the important WILL Forum mission</br>
    for Women in Leadership \u2014 and WILL-A! App</br>
    will be your companion and guide on this</br>
    journey!</br></br>
    Please also keep checking your WILL-A! App for regular Motivation Alerts:</br></br>
    All the best:</br></br>  
    <p>WILL Forum Mission</p> 
    <a href="https://willforumonline.com">https://willforumonline.com</a>`,
    true,
    ""
  );
}

// schemas/willMeetup.ts
var WillMeetUp = list({
  ui: {
    isHidden: ({ session: session2, context }) => session2.data.isAdmin ? false : true
  },
  access: {
    operation: {
      ...defaultAccess,
      create: () => true
    }
  },
  fields: {
    name: (0, import_fields14.text)(),
    email: (0, import_fields14.text)(),
    phoneNumber: (0, import_fields14.text)(),
    organization: (0, import_fields14.text)({ validation: { isRequired: true } })
    // willMeetUpId: text()
  },
  hooks: {
    // resolveInput: async ({
    //   operation,
    //   resolvedData,
    //   context,
    // }) => {
    //   if(operation=='create'){
    //    const countArray = await (await context.sudo().db.WillMeetUp.findMany()).length
    //     resolvedData.willMeetUpId= `WillMeetUp-${countArray+1}`
    //   }
    //   return resolvedData;
    // },
    afterOperation: async ({ operation, item }) => {
      if (operation == "create") {
        await sendWillMeetUpMail({ item });
        await sendWillMeetUpUserMail({ item });
      }
    }
  }
});

// schemas/quotes.ts
var import_fields15 = require("@keystone-6/core/fields");
var import_date_fns2 = require("date-fns");
var Quote = list({
  access: {
    operation: defaultAccess,
    filter: {
      query: async ({ session: session2 }) => {
        let todayDate = (0, import_date_fns2.endOfDay)(/* @__PURE__ */ new Date());
        if (!session2?.data?.isAdmin) {
          return { date: { lte: todayDate } };
        } else {
          return true;
        }
      }
    }
  },
  ui: {
    isHidden: ({ session: session2, context }) => session2.data.isAdmin ? false : true
  },
  fields: {
    quote: (0, import_fields15.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    date: (0, import_fields15.timestamp)({ validation: { isRequired: true } })
  }
});

// schemas/notification.ts
var import_fields16 = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");

// component-blocks/RedirectLink.tsx
var import_core2 = require("@keystone-ui/core");
var import_component_blocks = require("@keystone-6/fields-document/component-blocks");
var RedirectLink = (0, import_component_blocks.component)({
  label: "App Link",
  schema: {
    appLabel: import_component_blocks.fields.text({
      label: "label",
      defaultValue: ""
    }),
    appScreen: import_component_blocks.fields.url({
      label: "navigation screen",
      defaultValue: ""
    })
  },
  preview: function RedirectLink2(props) {
    return /* @__PURE__ */ (0, import_core2.jsx)(import_component_blocks.NotEditable, null, /* @__PURE__ */ (0, import_core2.jsx)(
      "div",
      {
        css: {
          overflow: "hidden",
          position: "relative"
        }
      },
      /* @__PURE__ */ (0, import_core2.jsx)("p", { style: { color: "blue" } }, /* @__PURE__ */ (0, import_core2.jsx)("strong", null, props.fields.appLabel.value))
    ));
  }
});

// component-blocks/index.tsx
var componentBlocks = {
  RedirectLink
};

// schemas/notification.ts
var import_fields_s37 = require("@k6-contrib/fields-s3");
var Notification = list({
  access: { operation: defaultAccess },
  ui: {
    isHidden: ({ session: session2 }) => session2.data.isAdmin ? false : true
  },
  fields: {
    title: (0, import_fields16.text)(),
    date: (0, import_fields16.timestamp)({ validation: { isRequired: true }, defaultValue: { kind: "now" } }),
    description: (0, import_fields_document.document)({
      formatting: {
        inlineMarks: {
          bold: true,
          italic: true,
          underline: true
        },
        headingLevels: [1, 2, 3]
      },
      links: true,
      layouts: [
        [1, 1],
        [1, 1, 1]
      ],
      ui: {
        views: "./component-blocks"
      },
      componentBlocks
    }),
    image: (0, import_fields_s37.s3Image)({ s3Config: notificationImages })
  }
});

// schemas/oneTimePassword.ts
var import_fields17 = require("@keystone-6/core/fields");
var OneTimePassword = list({
  access: {
    operation: {
      ...defaultAccess,
      query: access.isAdmin
    }
  },
  ui: {
    isHidden: ({ session: session2 }) => session2.data.isAdmin ? false : true
  },
  fields: {
    otp: (0, import_fields17.text)({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true
    }),
    email: (0, import_fields17.text)({ validation: { isRequired: true } }),
    isUsed: (0, import_fields17.checkbox)({ defaultValue: false }),
    user: (0, import_fields17.relationship)({ ref: "User" })
  }
});

// schemas/index.ts
var lists = {
  User,
  Bulletin,
  Event,
  Announcement,
  Plan,
  Subscription,
  Video,
  WatchingList,
  Certificate,
  Membership,
  CallRequest,
  WillMeetUp,
  Banner,
  Config,
  Quote,
  Notification,
  OneTimePassword
};

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("The SESSION_SECRET environment variable must be set in production");
  } else {
    sessionSecret = "-- DEV COOKIE SECRET; CHANGE ME --";
  }
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "id name email isAdmin subscription { plan { id } }",
  secretField: "password",
  initFirstItem: {
    // If there are no items in the database, keystone will ask you to create
    // a new user, filling in these fields.
    fields: ["name", "email", "isAdmin", "password"]
  }
  // providers: [
  //   AzureADProvider({
  //     clientId: process.env.AZURE_AD_CLIENT_ID!,
  //     clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
  //     tenantId: process.env.AZURE_AD_TENANT_ID,
  //   }),
  // ],
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// custom-schema.ts
var import_schema = require("@graphql-tools/schema");

// custom-mutations/custom-auth.ts
var authMutations = `
  verifyOtp(email:String! otp:String!): AuthType
`;
var AuthType = `
  type AuthType {
    token: String!
    user: User!
  }
`;
async function verifyOtp(root, { email, otp }, context) {
  const sudo = context.sudo();
  if (email && otp) {
    let otpResponse = await sudo.query.OneTimePassword.findOne({
      where: { otp },
      query: "id user {id name email isVerified isAdmin subscription { plan { id } }} isUsed"
    });
    if (!otpResponse) {
      throw new Error("Wrong otp");
    }
    if (otpResponse.isUsed) {
      throw new Error("otp is used");
    }
    if (!otpResponse.isUsed) {
      let user = await sudo.db.User.findOne({
        where: { id: otpResponse.user.id }
        // query:
        //   'id name username  email isAdmin city state country address pincode subscription { id }', // plan { id video { srNo name id url { url }}}  
      });
      await sudo.query.OneTimePassword.updateOne({ where: { otp }, data: { isUsed: true } });
      await sudo.query.User.updateOne({ where: { id: otpResponse.user.id }, data: { isVerified: true } });
      context.session = { ...context.session, listKey: "User", itemId: user?.id, data: otpResponse.user };
      const newToken = await context.sessionStrategy?.start({ data: { listKey: "User", itemId: user?.id }, context });
      if (newToken) {
        return { user, token: newToken };
      }
    }
  }
  return null;
}

// utils/pdf-generator.ts
var import_pdf_lib = require("pdf-lib");
var import_fontkit = __toESM(require("@pdf-lib/fontkit"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var publicPath = import_path.default.join(process.cwd(), "public");
var generatePdf = async (plan, user) => {
  const existingPdfBytes = await fetch(
    `${process.env.SERVER_URL}/files/pdf/${plan.srNo === 1 ? "WillCertificateLevel1.pdf" : plan.srNo === 2 ? "WillCertificateLevel2.pdf" : plan.srNo === 3 ? "WillCertificateLevel3.pdf" : plan.srNo === 4 ? "WillCertificateLevel4.pdf" : ""}`
  ).then((res) => res.arrayBuffer());
  const pdfDoc = await import_pdf_lib.PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(import_fontkit.default);
  const helveticaFont = await pdfDoc.embedFont(
    import_fs.default.readFileSync(import_path.default.join(publicPath, "files/fonts/KaushanScript-Regular.ttf"))
  );
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  firstPage.drawText(user.name, {
    x: 310,
    y: 350,
    size: 28,
    font: helveticaFont,
    color: (0, import_pdf_lib.rgb)(0, 0, 0)
  });
  return pdfDoc.save();
};

// custom-mutations/send-certificate.ts
var import_Upload = __toESM(require("graphql-upload/Upload.js"));

// utils/sendCertificateMail.ts
var import_nodemailer5 = require("nodemailer");
async function sendMail5(to, subject, text17, useHtml = false, attachment) {
  const transporter = (0, import_nodemailer5.createTransport)({
    //@ts-ignore
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_SECRET
    }
  });
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: `${to}`,
    subject,
    ...useHtml ? { html: text17 } : { text: text17 },
    attachments: [
      {
        filename: "Certificate.pdf",
        path: attachment
      }
    ]
  });
}
var sendCertificateMail = async (to, name, attachment, plan) => {
  await sendMail5(
    to,
    `Congratulations ${name} for successfully completion of ${plan?.name}`,
    `<img height="100" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkQAAAM/CAYAAAAwcs3sAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAEhWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOmNiOGExY2Y0LTEzMDAtM2U0Yy04MzJkLTVjM2EwN2ZhOWZkMzwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDpjYjhhMWNmNC0xMzAwLTNlNGMtODMyZC01YzNhMDdmYTlmZDM8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgIDwveG1wTU06RGVyaXZlZEZyb20+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6RTFFMjcyNjY5NUZFMTFFQzhCNDhDRUY3MkRDRjQ1NDQ8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4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" />
      <p>Dear ${name} :</p>
      <p style="color:blue">Congratulations!</p>
      <p>You have now successfully completed:</p>
      <h4>Distinguished \u201CWILL Leadership Program: ${plan?.name}\u201D</h4>
      <h4><i>\u201CBuilding Courage, Confidence and Conviction!\u201D</i></h3>
      <p>Via WILL-A!   Digital App for Women in Leadership</p>
      <p>We wish you a successful Leadership journey ahead!</p>
      <p>Poonam Barua<br/>
      <b>Founder Chairman | Forum for Women in Leadership</b>
      </p>
      <p style="color:blue"><i>Powered by Sutherland</i></p>
  
      <img src="data:image/jpeg;base64,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" />
      `,
    true,
    attachment
  );
};

// custom-mutations/send-certificate.ts
var import_stream = require("stream");
var certificate = `sendCertificate(id: String!, planId: String!): Certificate`;
function bufferToStream(buffer) {
  const newStream = new import_stream.Readable();
  newStream.push(buffer);
  newStream.push(null);
  return newStream;
}
var prepareFile = (filename, fileBytes) => {
  const upload = new import_Upload.default();
  upload.resolve({
    createReadStream: () => bufferToStream(Buffer.from(fileBytes)),
    filename,
    // @ts-ignore
    mimetype: "application/pdf",
    encoding: "utf-8"
  });
  return { upload };
};
async function sendCertificate(root, { id, planId }, context) {
  const user = await context.sudo().db.User.findOne({
    where: {
      id
    }
  });
  const plan = await context.sudo().db.Plan.findOne({
    where: {
      id: planId
    }
  });
  if ([3, 4].includes(plan?.srNo)) {
    console.log(`${plan.name} is not enabled for sending certificates`);
    return;
  }
  const pdfBytes = await generatePdf(plan, user);
  const certificateData = await context.sudo().query.Certificate.createOne({
    data: {
      user: { connect: { id } },
      certificate: prepareFile("will-certificate.pdf", pdfBytes)
    },
    query: "id certificate { url }"
  });
  await sendCertificateMail(user.email, user.name, certificateData?.certificate?.url, plan);
  return certificateData;
}

// utils/mail.ts
var import_process5 = __toESM(require("process"));
var import_nodemailer6 = require("nodemailer");
async function sendMail6(to, subject, text17, useHtml = false, attachment) {
  const transporter = (0, import_nodemailer6.createTransport)({
    //@ts-ignore
    host: import_process5.default.env.MAIL_HOST,
    port: import_process5.default.env.MAIL_PORT,
    auth: {
      user: import_process5.default.env.MAIL_USERNAME,
      pass: import_process5.default.env.MAIL_SECRET
    }
  });
  await transporter.sendMail({
    from: import_process5.default.env.MAIL_FROM,
    to: `${to}`,
    subject,
    ...useHtml ? { html: text17 } : { text: text17 }
  });
}
async function sendBuyPlanMail(to, name, level, order_number) {
  await sendMail6(
    to,
    `${level} Registration - WILL Forum`,
    `<p>Dear ${name}</p>
    <p>Congratulation!</p></br>
    <p> Welcome to the advanced ${level} of the distinguished WILL Women in Leadership Certification Program!</br></br> 
    Your payment for ${level} for WILL Certification program has been processed successfully. </br></br>
    Order Number: ${order_number}</br> </br>         
    Note: You may continue to use your WILL Leader User-and password for moving forward on ${level}. </br>
    Wish you all the best in your pursuit of advanced Leadership Progress ! </p></br>
    <p>Regards</p> 
    <h4>CEO WILL Forum India </h4>
    <a href="https://willforumonline.com ">https://willforumonline.com </a>
    </p>`,
    true,
    ""
  );
}
async function paymentReceivedMail(name, level, Payment_confirmation_number, address, organization, phone, country, amount, city, state, pincode, order_number) {
  await sendMail6(
    import_process5.default.env.MAIL_WILLMEETUP_TO,
    `${name} enrols for ${level}`,
    `<p>Dear Admin,</p></br>
    <p>There is an enrolment of ${level} and its details are as follows: </p>
    <table style="width:100%; border:0px">
      <tr>
        <td style="border:0px">User name:</td>
        <td style="border:0px">${name}</td>
      </tr>
      <tr>
        <td style="border:0px">Amount:</td>
        <td style="border:0px">${amount}</td>
      </tr>
      <tr>
      <td style="border:0px">Order Number:</td>
      <td style="border:0px">${order_number}</td>
    </tr>
    <tr>
      <td style="border:0px">Payment Confirmation Number:</td>
      <td style="border:0px">${Payment_confirmation_number}</td>
    </tr>
    <tr>
      <td style="border:0px">Phone:</td>
      <td style="border:0px">${phone}</td>
    </tr>
    <tr>
    <td style="border:0px">Address:</td>
    <td style="border:0px">${address}</td>
  </tr>
  <tr>
    <td style="border:0px">City:</td>
    <td style="border:0px">${city}</td>
  </tr>
  <tr>
    <td style="border:0px">State:</td>
    <td style="border:0px">${state}</td>
  </tr>
  <tr>
    <td style="border:0px">Pincode:</td>
    <td style="border:0px">${pincode}</td>
  </tr>
  <tr>
    <td style="border:0px">Country:</td>
    <td style="border:0px">${country}</td>
  </tr>
  <tr>
    <td style="border:0px">Organization:</td>
    <td style="border:0px">${organization}</td>
  </tr>
  </table></br>
    <p>
    Regards</br>
   <h4>-WILL Forum App</h4>
    </p>`,
    true,
    ""
  );
}
async function sendOtpMail(to, name, otp) {
  await sendMail6(
    to,
    "Signin/Signup - WILL Forum",
    `<p>Dear ${name}</p>
    <p>Your OTP is</p>
    <h2 style="background: #00466a;margin: 0; width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p>Regards</p>
    <h4>CEO WILL Forum India </h4></br>
    <a href="https://willforumonline.com ">https://willforumonline.com </a>
    `,
    true,
    ""
  );
}

// custom-mutations/verify-payment.ts
var nodeCCAvenue = require("node-ccavenue");
var ccav = new nodeCCAvenue.Configure({
  working_key: process.env.WORKING_KEY,
  merchant_id: process.env.MERCHANT_ID
});
var paymentVerify = `
verifyPayment( encRes:String, amount:Float!, paymentStatus:String!, planId: String!, name: String, email: String, phone: String, pincode: String, city: String, state: String, country: String, address: String,organization:String, userId: String): User`;
async function verifyPayment(root, {
  encRes,
  amount,
  paymentStatus,
  planId,
  name,
  email,
  phone,
  pincode,
  city,
  state,
  country,
  address,
  organization,
  userId
}, context) {
  const decryptedJsonResponse = ccav.redirectResponseToJson(encRes);
  console.log(
    `Payment status : ${decryptedJsonResponse.order_status},  PaymentId : ${decryptedJsonResponse?.bank_ref_no},  Billing_Name : ${name}`
  );
  const sudo = context.sudo();
  if (decryptedJsonResponse.order_status === "Success") {
    let paymentId = decryptedJsonResponse?.bank_ref_no;
    try {
      if (userId) {
        await sudo.db.Subscription.createOne({
          data: {
            amount,
            paymentId,
            paymentStatus,
            user: { connect: { id: userId } },
            plan: { connect: { id: planId } }
          }
        });
        const plan = await sudo.db.Plan.findOne({
          where: { id: planId },
          query: "name"
        });
        const user = await sudo.db.User.findOne({
          where: { id: userId },
          query: "name email"
        });
        const emails = [
          "sumitsharma7667@gmail.com",
          "singhgautam@gmail.com",
          "test-abc@mail.com",
          "test-cab@mail.com",
          "test-cba@mail.com",
          "test-dca@mail.com",
          "teste-cad@mail.com"
        ];
        if (!emails.includes(user.email)) {
          await sendBuyPlanMail(user.email, user.name, plan?.name, decryptedJsonResponse?.order_id);
          await paymentReceivedMail(
            user.name,
            plan?.name,
            decryptedJsonResponse?.bank_ref_no,
            user.address,
            user.organization,
            user.phone,
            user.country,
            amount,
            user.city,
            user.state,
            user.pincode,
            decryptedJsonResponse?.order_id
          );
        }
      } else {
        throw "User not found";
      }
    } catch (error) {
      console.log("error in verifying payment", error);
      throw new Error(error.message);
    }
  }
  return null;
}

// custom-mutations/init-ccAv.ts
var import_nanoid = require("nanoid");
var nodeCCAvenue2 = require("node-ccavenue");
var encRequest = `createEncData( amount: Float!, billing_name: String ): encRequestType`;
var encRequestType = `
  type encRequestType {
      encData: String!
  }
`;
async function createEncData(root, { amount, billing_name }, context) {
  const ccav5 = new nodeCCAvenue2.Configure({
    working_key: process.env.WORKING_KEY,
    merchant_id: process.env.MERCHANT_ID
  });
  const alphabet = "123456789ABCDEFGHJKLMNOPQRSTUVWXYZ";
  const nanoid = (0, import_nanoid.customAlphabet)(alphabet, 10);
  const orderId = await nanoid();
  let orderParams = {};
  const emails = [
    "sumitsharma7667@gmail.com",
    "singhgautam@gmail.com",
    "test-abc@mail.com",
    "test-cab@mail.com",
    "test-cba@mail.com",
    "test-dca@mail.com",
    "teste-cad@mail.com"
  ];
  if (emails.includes(context?.session?.data?.email)) {
    orderParams = {
      order_id: orderId,
      currency: "INR",
      amount: 1,
      redirect_url: process.env.REDIRECT_URL,
      billing_name
    };
    console.log(`Payment initated by ${billing_name} At ${/* @__PURE__ */ new Date()} for Amount 1 `);
  } else {
    orderParams = {
      order_id: orderId,
      currency: "INR",
      amount,
      redirect_url: process.env.REDIRECT_URL,
      billing_name
    };
    console.log(`Payment initated by ${billing_name} At ${/* @__PURE__ */ new Date()} for Amount ${amount} `);
  }
  const encryptedOrder = ccav5.getEncryptedOrder(orderParams);
  return { encData: encryptedOrder };
}

// utils/bulkMail.ts
var import_process6 = __toESM(require("process"));
var import_nodemailer7 = require("nodemailer");
async function sendMail7(to, subject, text17, useHtml = false, bcc) {
  const transporter = (0, import_nodemailer7.createTransport)({
    //@ts-ignore
    host: import_process6.default.env.MAIL_HOST,
    port: import_process6.default.env.MAIL_PORT,
    auth: {
      user: import_process6.default.env.MAIL_USERNAME,
      pass: import_process6.default.env.MAIL_SECRET
    }
  });
  await transporter.sendMail({
    from: import_process6.default.env.MAIL_FROM,
    to: `${to}`,
    subject,
    ...useHtml ? { html: text17 } : { text: text17 },
    bcc
  });
}
async function bulkMail(html, bcc) {
  await sendMail7(import_process6.default.env.MAIL_WILLMEETUP_TO, "mail", html, true, bcc);
}

// custom-mutations/send-bulk-mail.ts
var BulkMail = `sendBulkMail(html: String!, type: String!):BulkMailType`;
var BulkMailType = `
  type BulkMailType {
    message: String! 
  }
`;
var chunkValue = 200;
var timeout = 6e3;
async function sendBulkMail(root, { html, type }, context) {
  if (context?.session?.data?.isAdmin) {
    let spliceIntoChunks2 = function(arr, chunkSize) {
      const res = [];
      while (arr.length > 0) {
        const chunk = arr.splice(0, chunkSize);
        res.push(chunk);
      }
      return res;
    }, mailLoop2 = function() {
      setTimeout(function() {
        i++;
        if (i <= bcc.length) {
          bulkMail(JSON.parse(html), bcc[i]);
          mailLoop2();
        }
      }, timeout);
    };
    var spliceIntoChunks = spliceIntoChunks2, mailLoop = mailLoop2;
    let mailArray = [];
    let bcc = [];
    if (type === "PAID_USERS") {
      const users = await context.sudo().db.User.findMany();
      if (users) {
        users.forEach((el) => {
          mailArray.push(el.email);
        });
        bcc = spliceIntoChunks2(mailArray, chunkValue);
      }
    }
    if (type === "WILLMEETUP") {
      const WILLMEETUP = await context.sudo().db.WillMeetUp.findMany();
      if (WILLMEETUP) {
        WILLMEETUP.forEach((el) => {
          mailArray.push(el.email);
        });
        bcc = spliceIntoChunks2(mailArray, chunkValue);
      }
    }
    if (type === "ALL") {
      let array1 = [];
      let array2 = [];
      let newArray = [];
      const users = await context.sudo().db.User.findMany();
      const WILLMEETUP = await context.sudo().db.WillMeetUp.findMany();
      if (users) {
        users.forEach((el) => {
          array1.push(el.email);
        });
      }
      if (WILLMEETUP) {
        WILLMEETUP.forEach((el) => {
          array2.push(el.email);
        });
      }
      if (array1 && array2) {
        newArray = array1.filter((val) => !array2.includes(val));
      }
      if (newArray) {
        newArray.forEach((el) => {
          mailArray.push(el.email);
        });
        bcc = spliceIntoChunks2(mailArray, chunkValue);
      }
    }
    let i = 0;
    mailLoop2();
    return { message: "success" };
  } else {
    return new Error("somthing went wrong");
  }
}

// custom-mutations/generate-otp.ts
var import_nanoid2 = require("nanoid");
var generateOtpMutation = `
generateOtp(email: String!): generateOtpType
`;
var generateOtpType = `
  type generateOtpType {   
    message:String!
    email:String
  }
`;
async function generateOtp(root, { email }, context) {
  const sudo = context.sudo();
  if (email) {
    let user = await sudo.query.User.findOne({
      where: { email },
      query: "id name  email isAdmin city state country address pincode subscription { plan { id video { srNo name id url { url }}}  }"
    });
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }
    if (user) {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const nanoid = (0, import_nanoid2.customAlphabet)(alphabet, 6);
      const otp = nanoid();
      let response = await sudo.query.OneTimePassword.createOne({
        data: { user: { connect: { id: user.id } }, otp, email },
        query: "id otp"
      });
      sendOtpMail(email, user.name, response.otp);
      return { email, message: "Otp sent successfully" };
    }
  }
  return { message: "User not found", email: "" };
}

// custom-mutations/generate-signup-otp.ts
var import_nanoid3 = require("nanoid");
var generateSignupOtpMutation = `
generateSignupOtp(name: String, email: String!, phone: String, pincode: String, city: String, state: String, country: String, address: String,organization:String): generateSignupOtpType
`;
var generateSignupOtpType = `
  type generateSignupOtpType {   
    message:String!
    email:String
    isVerified:Boolean
  }
`;
async function generateSignupOtp(root, { email, name, phone, pincode, city, state, country, address, organization }, context) {
  const sudo = context.sudo();
  const isUser = await sudo.query.User.findOne({ where: { email }, query: "id name isVerified email isAdmin city state country address pincode subscription { plan { id video { srNo name id url { url }}}  }" });
  if (email) {
    if (!isUser) {
      var password2 = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg@ijklmnopqrstuvwxyz0123456789!@#$";
      var charactersLength = characters.length;
      for (var i = 0; i < 6; i++) {
        password2 += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      password2 = "W" + password2 + "!";
      const newUser = await sudo.db.User.createOne({
        data: { name, email, password: password2, pincode, phone, city, state, country, address, organization }
      });
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const nanoid = (0, import_nanoid3.customAlphabet)(alphabet, 6);
      const otp = nanoid();
      let response = await sudo.query.OneTimePassword.createOne({
        data: { user: { connect: { id: newUser.id } }, otp, email },
        query: "id otp"
      });
      sendOtpMail(email, newUser.name, response.otp);
      return { email, message: "Otp sent successfully" };
    } else {
      throw { message: "User is not verified", isVerified: isUser.isVerified };
    }
  }
  return { message: "User not found", email: "" };
}

// custom-mutations/willmeetup-signup.ts
var import_nanoid4 = require("nanoid");
var generateOtpReturnType = `
  type generateOtpType {   
    email:String
  }
`;
var willmeetupSignupType = `
willmeetupSignup( name: String, email: String, phone: String, organization:String): User`;
async function willmeetupSignup(root, {
  name,
  email,
  phone,
  organization
}, context) {
  const sudo = context.sudo();
  if (name && email) {
    try {
      const user = await sudo.db.User.findOne({
        where: { email },
        query: "name email"
      });
      if (user) {
        throw new Error("User already exist with this email");
      } else {
        var password2 = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg@ijklmnopqrstuvwxyz0123456789!@#$";
        var charactersLength = characters.length;
        for (var i = 0; i < 6; i++) {
          password2 += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        password2 = "W" + password2 + "!";
        const newUser = await sudo.db.User.createOne({
          data: { name, email, password: password2, phone, organization }
        });
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const nanoid = (0, import_nanoid4.customAlphabet)(alphabet, 6);
        const otp = nanoid();
        let response = await sudo.query.OneTimePassword.createOne({
          data: { user: { connect: { id: newUser.id } }, otp, email },
          query: "id otp"
        });
        sendOtpMail(email, newUser.name, response.otp);
        return { email, user: newUser };
      }
    } catch (error) {
      console.log("error in verifying payment", error);
      throw new Error(error.message);
    }
  }
  return null;
}

// custom-schema.ts
var typeDefs = String.raw`
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
var extendGraphqlSchema = (schema) => (0, import_schema.mergeSchemas)({
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
          where: { id },
          query: "id name url{url}"
        });
        return video;
      }
    }
  }
});

// routes/validate-payment.ts
var nodeCCAvenue3 = require("node-ccavenue");
var ccav2 = new nodeCCAvenue3.Configure({
  working_key: process.env.WORKING_KEY,
  merchant_id: process.env.MERCHANT_ID
});
var ValidatePayment = (req, res) => {
  const { encResp } = req.body;
  const decryptedJsonResponse = ccav2.redirectResponseToJson(encResp);
  console.log(
    `decryptedJsonResponse from ccav after payment and before adding subscription ${decryptedJsonResponse} `
  );
  res.redirect(`/ccav/success/${encResp}`);
};

// routes/validate-payment-ios.ts
var nodeCCAvenue4 = require("node-ccavenue");
var ccav3 = new nodeCCAvenue4.Configure({
  working_key: process.env.WORKING_KEY,
  merchant_id: process.env.MERCHANT_ID
});
var ValidatePaymentIos = (req, res) => {
  const { encResp } = req.body;
  const decryptedJsonResponse = ccav3.redirectResponseToJson(encResp);
};

// routes/payment-capture.ts
var import_nanoid5 = require("nanoid");
var nodeCCAvenue5 = require("node-ccavenue");
var ccav4 = new nodeCCAvenue5.Configure({
  working_key: process.env.WORKING_KEY,
  merchant_id: process.env.MERCHANT_ID
});
var paymentCapture = async (req, res) => {
  const userId = req.query.userId;
  const planId = req.query.planId;
  const context = req.context;
  const sudo = context.sudo();
  const userDetails = await sudo.query.User.findOne({
    where: {
      id: userId
    },
    query: "id name email azureId"
  });
  const planDetails = await sudo.query.Plan.findOne({
    where: {
      id: planId
    },
    query: "id name price"
  });
  const alphabet = "123456789ABCDEFGHJKLMNOPQRSTUVWXYZ";
  const nanoid = (0, import_nanoid5.customAlphabet)(alphabet, 10);
  const orderId = await nanoid();
  const orderParams = {
    order_id: orderId,
    currency: "INR",
    amount: planDetails.price,
    redirect_url: encodeURIComponent(process.env.redirectUrl),
    billing_name: userDetails.name
  };
  const encryptedOrder = ccav4.getEncryptedOrder(orderParams);
  console.log("encryptedOrder", ccav4.redirectResponseToJson(encryptedOrder));
  res.render("../payment-pages/payment.html", {
    encReq: encryptedOrder,
    accessCode: process.env.ACCESS_CODE
  });
};

// keystone.ts
var keystone_default = withAuth(
  // Using the config function helps typescript guide you to the available options.
  (0, import_core3.config)({
    server: {
      maxFileSize: 500 * 1024 * 1024,
      // 500mb
      port: Number(process.env.PORT) || 8100,
      extendExpressApp: (app, context) => {
        app.use(
          import_body_parser.default.urlencoded({
            extended: true
          })
        );
        app.use(import_body_parser.default.json());
        app.use("/ccav", async (req, res, next) => {
          req.context = context;
          next();
        });
        app.set("payment-pages", import_path2.default.join(__dirname, "payment-pages"));
        app.set("view engine", "ejs");
        app.engine("html", require("ejs").renderFile);
        app.post("/ccav/redirect_url", ValidatePayment);
        app.post("/ccav/redirect_url_ios", ValidatePaymentIos);
        app.get("/ccav/catuture_payment", paymentCapture);
        app.get("/ccav/get", (req, res) => {
          res.redirect(
            "/ccav/success/6a06c9c15e187297b880228d6f57ac01e4c2554ae145a804eb5810953da0db8970aa1347207d407ec3b98e17e99157c1e11dd203f5bc79ecc6ce9e0245cc37f2d752d87027f4c5ca4a355b1056e324a62507229f4defcee70deab34aa18cf13f38a819154fc6372bf7a5d93e31a07e3fd001214739b3198fd6468214ffa85b77e363d2eb5d4cadda80dd439d9515f0d7bae5dc616199ca3b594e952a62323fd32bc9524a83deff896dd66889813dedaee08c742f700c4698e4a4bfc4126755474e881ac762b9c83c5486730a3daceb5d9889b53535c28af99c48789a02919f6cc393bf2e0c109f8817de1e82a252c165c257a0993b2548f8b54e6976403af89f59719bb46aa19180f1d975c69e50783c1750ee0d68d19d6b2516d787b6a262150697d6a13a24844f51b7625a9566a9bb86f33dc99d244f5866525b92e0be8fcd0c67ba8ffba1465e3998c41934a8c6da1a3e261bb395e0269d1eedcb26e74ae0194cd35f39382c9fe5412a5982375aac7fc70689eac25f5a6aaa4f98e40f88b6d0be1bee151cccf75ebb9d05f7f8f765321d34afc69dd0608d0f04cef370b9273297a3ced23095787d72acd13ca46f2854403d329a4982060abe22e6e26d20e3e7b5e81f6e7a4e571625612a684d33ac9089163824887631d8107b1ed9b28f48f2a50de7351d48af9947fb76f3636dc6551812d8c16c29087c057ed3e8f6819f1b30ca5cbe27e4fb8dc9c83c3dfb58c503c15b1bfd288c9a3a54dfd1f42b833d986e88f2c1f515ef3b5dd9bcb7e51b1b953d9375e990fb713a1e76d05b72bd9162790f2ef1df4f7e524fe06b22eb44a998521537c5df1b47ce3cb168e9592f0f483420d83d9b204e391888a9e49caa4546e57f242900ed6dc9609876b9074f866ef12330f6788e6d670727f652bf6e4c14f9993f86ca9dab09498e6a13b7f72713ad8a61128cbe12282cb3dcdd34a3d975932e16eec8a1daea198e606ecfddf717cd0049d4f063926d5f48e962524e839e7d0d7a696e4a8ea87ccf2c78534b7efffde8345229c0477e8e2fbbd4df15254af461d2a7509e148f262d5ea34ba33b5e7006ae6698f9f015b179c9dbe98e695388b0647fec2ec0c45af2648eca1e90b36c265f8f982c9f60478498f4be6d2a9ed9851d8662ec856ad691c091dcc546268755b3b2b3c0c835714b5b0dc45746"
          );
        });
        app.get("/ccav/capture/:encResp", (req, res) => {
          res.send("tag id" + req.query.encResp);
        });
        app.get("/ccav/success/?:encResp", (req, res) => {
          res.sendFile(`payment-pages/success.html`, { root: "." });
        });
        app.get("/ccav/failiure", (req, res) => {
          res.sendFile(`payment-pages/failiure.html`, { root: "." });
        });
      }
    },
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: "postgresql",
      url: process.env.DB_URL
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data
    },
    storage: {
      my_local_files: {
        kind: "local",
        type: "file",
        generateUrl: (path3) => `${process.env.SERVER_URL}/files${path3}`,
        serverRoute: {
          path: "/files"
        },
        storagePath: "public/files"
      },
      my_local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path3) => `${process.env.SERVER_URL}/images${path3}`,
        serverRoute: {
          path: "/images"
        },
        storagePath: "public/images"
      }
    },
    lists,
    extendGraphqlSchema,
    session
  })
);
//# sourceMappingURL=config.js.map
