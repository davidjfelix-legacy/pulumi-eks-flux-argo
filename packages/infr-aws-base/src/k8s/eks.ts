import * as eks from '@pulumi/eks'
import * as kubernetes from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'
import {mainClusterAdminRole} from '../auth/iam/k8s'
import {callerArn, tags} from '../config'
import {vpc} from '../net/vpc'

const {vpcId, privateSubnetIds, publicSubnetIds} = vpc

// Create an EKS cluster with the default configuration.
export const cluster = pulumi.output(callerArn).apply(
  (callerArn) =>
    new eks.Cluster('cluster', {
      vpcId,
      privateSubnetIds,
      publicSubnetIds,
      roleMappings: [
        {
          groups: ['system:masters'],
          roleArn: mainClusterAdminRole.arn,
          username: 'main-cluster-admin',
        },
      ],
      userMappings: [
        // TODO: remove this and use the role instead
        {
          groups: ['system:masters'],
          userArn: callerArn,
          username: 'manual-admin',
        },
      ],
      tags,
    }),
)

const provider = new kubernetes.Provider('eks-provider', {kubeconfig: cluster.kubeconfigJson})

export const fluxSystemNamespace = new kubernetes.core.v1.Namespace('flux-system', {}, {provider})
export const argocdNamespace = new kubernetes.core.v1.Namespace('argocd', {}, {provider})

// Export the cluster's kubeconfig.
export const kubeconfig = pulumi.secret(cluster.kubeconfig)
