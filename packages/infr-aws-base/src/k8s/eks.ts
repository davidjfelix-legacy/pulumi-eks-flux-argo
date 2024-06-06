import * as eks from '@pulumi/eks'
import {mainClusterAdminRole} from '../auth/iam/k8s'
import {tags} from '../config'
import {vpc} from '../net/vpc'

const {vpcId, privateSubnetIds, publicSubnetIds} = vpc

// Create an EKS cluster with the default configuration.
export const cluster = new eks.Cluster('cluster', {
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
  ],
  tags,
})

// Export the cluster's kubeconfig.
export const kubeconfig = cluster.kubeconfig
