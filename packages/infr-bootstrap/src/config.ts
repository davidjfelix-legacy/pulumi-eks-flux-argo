import * as pulumi from '@pulumi/pulumi'

export interface Config {
  isLocal?: boolean
  githubRepo: string
  tags: Record<string, string>
}

export const {isLocal, githubRepo, tags} = new pulumi.Config().requireObject<Config>('data')
