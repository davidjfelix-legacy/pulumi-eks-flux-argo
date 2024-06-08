import * as eks from '@pulumi/eks'
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

// Export the cluster's kubeconfig.
export const kubeconfig = pulumi.secret(cluster.kubeconfig)
