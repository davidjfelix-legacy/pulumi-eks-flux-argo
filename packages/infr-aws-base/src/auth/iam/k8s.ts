import {iam} from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'
import {accountId} from '../../config'

export const mainClusterAdminAssumeRolePolicy = pulumi.output(accountId).apply(
  (accountId) =>
    iam.getPolicyDocumentOutput({
      statements: [
        {
          actions: ['sts:AssumeRole'],
          effect: 'Allow',
          principals: [
            {
              identifiers: [accountId],
              type: 'AWS',
            },
          ],
        },
      ],
    }).json,
)

export const mainClusterAdminRole = new iam.Role('main-cluster-admin', {
  assumeRolePolicy: mainClusterAdminAssumeRolePolicy,
})

export const mainClusterAdminPolicy = new iam.Policy('main-cluster-admin', {
  policy: iam.getPolicyDocumentOutput({
    statements: [
      {
        actions: [
          'eks:ListFargateProfiles',
          'eks:DescribeNodegroup',
          'eks:ListNodegroups',
          'eks:ListUpdates',
          'eks:AccessKubernetesApi',
          'eks:ListAddons',
          'eks:DescribeCluster',
          'eks:DescribeAddonVersions',
          'eks:ListClusters',
          'eks:ListIdentityProviderConfigs',
          'iam:ListRoles',
        ],
        effect: 'Allow',
        resources: ['*'],
      },
    ],
  }).json,
})

export const mainClusterAdminRolePolicyAttachment = new iam.RolePolicyAttachment('main-cluster-admin', {
  role: mainClusterAdminRole,
  policyArn: mainClusterAdminPolicy.arn,
})
