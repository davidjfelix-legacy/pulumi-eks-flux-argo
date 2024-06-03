import * as eks from '@pulumi/eks'
import {tags} from '../config'
import {vpc} from '../net/vpc'

const {vpcId, privateSubnetIds, publicSubnetIds} = vpc

// Create an EKS cluster with the default configuration.
export const cluster = new eks.Cluster('vpc-cluster', {
  // vpcId,
  // privateSubnetIds,
  // publicSubnetIds,
  tags,
})

// Export the cluster's kubeconfig.
export const kubeconfig = cluster.kubeconfig
