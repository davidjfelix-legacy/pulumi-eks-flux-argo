import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'
import * as tls from '@pulumi/tls'

export interface Config {
  bootstrapStackName: string
  isLocal?: boolean
  tags: Record<string, string>
}

export const {bootstrapStackName, isLocal, tags} = new pulumi.Config().requireObject<Config>('data')

export const bootstrapStack = new pulumi.StackReference(bootstrapStackName)
export const fluxcdKey = bootstrapStack.getOutput('fluxcdKey') as pulumi.Output<tls.PrivateKey>

const current = aws.getCallerIdentity({})
export const accountId = current.then((current) => current.accountId)
export const callerArn = current.then((current) => current.arn)
export const callerUser = current.then((current) => current.userId)
