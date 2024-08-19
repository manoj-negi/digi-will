const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService(
  'willvideos',
  'OQmjSguDC6wsxC9OiqOjTIqjJFNddn/6D/IP7Tq25h0ZXc/uT9ys8EXDarcZHWXN6GIpl7bX4SvXzEkM7GvNsg=='
);

export const getBlobTempPublicUrl = (containerName: String, blobName: String) => {
  const startDate = new Date();

  const expiryDate = new Date(startDate);

  expiryDate.setMinutes(startDate.getMinutes() + 100);

  startDate.setMinutes(startDate.getMinutes() - 100);

  const sharedAccessPolicy = {
    AccessPolicy: {
      Permissions: azureStorage.BlobUtilities.SharedAccessPermissions.READ,

      Start: startDate,

      Expiry: expiryDate,
    },
  };

  const token = blobService.generateSharedAccessSignature(
    containerName,
    blobName,
    sharedAccessPolicy
  );

  return blobService.getUrl(containerName, blobName, token);
};
