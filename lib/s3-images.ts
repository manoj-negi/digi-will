import { S3Config } from '@k6-contrib/fields-s3';
import 'dotenv/config';

export const s3Config: S3Config = {
  bucket: process.env.S3_BUCKET as string, // name of bucket
  baseUrl: `${process.env.S3_BASE_URL}`,
  // if provided the url is not compouted from endpoint and folder, rather use this as `${baseUrl}/${filename}`
  s3Options: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    endpoint: process.env.S3_ENDPOINT, // use region for aws, endpoint for s3 compatible storage
  },
  uploadParams() {
    return {
      ACL: 'public-read', // needed to make it public
    };
  },
};

export const notificationImages = {
  ...s3Config,
  folder: 'notification-images',
  baseUrl: `${s3Config.baseUrl}/notification-images`,
};
export const videosConfig: S3Config = {
  ...s3Config,
  folder: 'videos',
  baseUrl: `${s3Config.baseUrl}/videos`,
};
export const videoThumbnail: S3Config = {
  ...s3Config,
  folder: 'videos/thumbnails',
  baseUrl: `${s3Config.baseUrl}/videos/thumbnails`,
};
export const anouncementImages: S3Config = {
  ...s3Config,
  folder: 'announcement',
  baseUrl: `${s3Config.baseUrl}/announcement`,
};

export const eventImages: S3Config = {
  ...s3Config,
  folder: 'event-images',
  baseUrl: `${s3Config.baseUrl}/event-images`,
};
export const BannerImages: S3Config = {
  ...s3Config,
  folder: 'banner-images',
  baseUrl: `${s3Config.baseUrl}/banner-images`,
};
export const bulletinImages: S3Config = {
  ...s3Config,
  folder: 'bulletin-images',
  baseUrl: `${s3Config.baseUrl}/bulletin-images`,
};

export const certificates: S3Config = {
  ...s3Config,
  folder: 'certificates',
  baseUrl: `${s3Config.baseUrl}/certificates`,
};
