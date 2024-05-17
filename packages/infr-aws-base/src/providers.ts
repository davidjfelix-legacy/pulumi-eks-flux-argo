import {Provider} from '@pulumi/aws'
import {CustomResourceOptions} from '@pulumi/pulumi'
import {isLocal} from './config'

export const localProvider = new Provider('local-provider', {
  skipCredentialsValidation: true,
  skipRequestingAccountId: true,
  endpoints: [
    {
      dynamodb: 'http://localhost:4566',
    },
    {
      iam: 'http://localhost:4566',
    },
  ],
})

export const providerOpts: CustomResourceOptions = {
  ...(isLocal ? {provider: localProvider} : {}),
}
