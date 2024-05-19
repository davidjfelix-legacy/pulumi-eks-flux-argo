import * as eks from '@pulumi/eks'
import {vpcId} from './config'

// Create an EKS cluster with the default configuration.
const cluster = new eks.Cluster('cluster', {vpcId})

// Export the cluster's kubeconfig.
export const kubeconfig = cluster.kubeconfig
