import * as pulumi from '@pulumi/pulumi'

export interface IConfig {
  isLocal?: boolean
  tags: Record<string, string>
}

export const {isLocal, tags} = new pulumi.Config().requireObject<IConfig>(
  'data',
)
