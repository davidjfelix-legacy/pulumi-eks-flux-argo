import {getAvailabilityZonesOutput} from '@pulumi/aws'
import {ec2 as ec2x, types} from '@pulumi/awsx'

const azs = getAvailabilityZonesOutput({state: 'available'})

const natGateways: types.input.ec2.NatGatewayConfigurationArgs = {
  strategy: ec2x.NatGatewayStrategy.None,
}

export const vpc = azs.apply(
  (azs) =>
    new ec2x.Vpc('main', {
      natGateways,
      numberOfAvailabilityZones: azs.zoneIds.length,
      subnetSpecs: [
        {cidrMask: 22, name: 'public', type: ec2x.SubnetType.Public},
        {cidrMask: 22, name: 'private', type: ec2x.SubnetType.Private},
        {cidrMask: 22, name: 'internal', type: ec2x.SubnetType.Isolated},
      ],
    }),
)
