import * as eks from '@pulumi/eks'
import {privateSubnetIds, publicSubnetIds, tags, vpcId} from './config'

// Create an EKS cluster with the default configuration.
export const cluster = new eks.Cluster('cluster', {vpcId, privateSubnetIds, publicSubnetIds, tags})

// Export the cluster's kubeconfig.
export const kubeconfig = cluster.kubeconfig
