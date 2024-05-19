import * as pulumi from '@pulumi/pulumi'

export interface IConfig {
  awsBaseStackName: string
  isLocal?: boolean
  tags: Record<string, string>
}

export const {awsBaseStackName, isLocal, tags} = new pulumi.Config().requireObject<IConfig>('data')
