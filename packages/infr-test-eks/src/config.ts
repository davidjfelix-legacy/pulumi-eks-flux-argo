import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'
import * as pulumi from '@pulumi/pulumi'
import * as tls from '@pulumi/tls'

export interface IConfig {
  awsBaseStackName: string
  bootstrapStackName: string
  isLocal?: boolean
  tags: Record<string, string>
}

export const {awsBaseStackName, bootstrapStackName, isLocal, tags} = new pulumi.Config().requireObject<IConfig>('data')

export const awsBaseStack = new pulumi.StackReference(awsBaseStackName)
export const vpc = awsBaseStack.getOutput('vpc') as pulumi.Output<awsx.ec2.Vpc>
export const {privateSubnetIds, publicSubnetIds, vpcId} = vpc

export const bootstrapStack = new pulumi.StackReference(bootstrapStackName)
export const fluxcdKey = bootstrapStack.getOutput('fluxcdKey') as pulumi.Output<tls.PrivateKey>

const current = aws.getCallerIdentity({})
export const accountId = current.then((current) => current.accountId)
export const callerArn = current.then((current) => current.arn)
export const callerUser = current.then((current) => current.userId)
