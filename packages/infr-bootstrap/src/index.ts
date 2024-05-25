import * as github from '@pulumi/github' // Generate ssh keys
import * as tls from '@pulumi/tls'
import {githubRepo} from './config'

export const fluxcdKey = new tls.PrivateKey('key', {
  algorithm: 'ECDSA',
  ecdsaCurve: 'P256',
})

export const fluxcdDeployKey = new github.RepositoryDeployKey('fluxcd', {
  title: 'fluxcd',
  repository: githubRepo,
  key: fluxcdKey.publicKeyOpenssh,
  readOnly: false,
})
