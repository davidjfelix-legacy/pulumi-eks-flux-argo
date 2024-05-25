import * as flux from '@worawat/flux'
import {fluxcdKey} from './config'

export const provider = new flux.Provider('flux', {
  kubernetes: {
    configPath: '../dist/.kube/config',
  },
  git: {
    url: `ssh://git@github.com/nullserve/infrastructure.git`,
    branch: 'main',
    ssh: {
      username: 'git',
      privateKey: fluxcdKey.privateKeyPem,
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
  },
)
