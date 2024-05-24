import * as github from '@pulumi/github'
import * as tls from '@pulumi/tls'
import * as flux from '@worawat/flux'
import {cluster} from './eks'

const key = new tls.PrivateKey('key', {
  algorithm: 'ECDSA',
  ecdsaCurve: 'P256',
})

export const deployKey = new github.RepositoryDeployKey('flux-key', {
  title: 'fluxcd',
  repository: 'nullserve/infrastructure',
  key: key.publicKeyOpenssh,
  readOnly: false,
})

export const provider = new flux.Provider('flux', {
  git: {
    url: `ssh://git@github.com/nullserve/infrastructure.git`,
    branch: 'main',
    ssh: {
      username: 'git',
      privateKey: key.privateKeyPem,
    },
  },
})

export const resource = new flux.FluxBootstrapGit(
  'flux',
  {
    path: 'clusters/test-eks',
  },
  {
    provider: provider,
    dependsOn: [deployKey, cluster],
  },
)
