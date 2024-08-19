import { AzureStorageConfig } from '@k6-contrib/fields-azure';
export const azureStorageConfig: AzureStorageConfig = {
  azureStorageOptions: {
    account: process.env.AZURE_STORAGE_ACCOUNT_NAME as string,
    accessKey: process.env.AZURE_STORAGE_ACCESS_KEY as string,
    container: process.env.AZURE_STORAGE_CONTAINER as string,
  },
};
