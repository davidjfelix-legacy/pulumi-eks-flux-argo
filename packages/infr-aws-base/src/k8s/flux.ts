import * as flux from '@worawat/flux'
import {fluxcdKey} from '../config'
import {argocdNamespace, cluster, fluxSystemNamespace} from './eks'

export const provider = new flux.Provider('flux', {
  kubernetes: {
    host: cluster.eksCluster.endpoint,
    clusterCaCertificate: cluster.eksCluster.certificateAuthority.data.apply((data) => Buffer.from(data, 'base64').toString()),
    exec: {
      apiVersion: 'client.authentication.k8s.io/v1beta1',
      args: ['eks', 'get-token', '--cluster-name', cluster.eksCluster.name],
      command: 'aws',
    },
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
    dependsOn: [fluxSystemNamespace, argocdNamespace],
  },
)
