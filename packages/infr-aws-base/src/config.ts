import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'

export interface IConfig {
  isLocal?: boolean
  tags: Record<string, string>
}

export const {isLocal, tags} = new pulumi.Config().requireObject<IConfig>('data')

const current = aws.getCallerIdentity({})
export const accountId = current.then((current) => current.accountId)
export const callerArn = current.then((current) => current.arn)
export const callerUser = current.then((current) => current.userId)
