import {getRegionOutput} from '@pulumi/aws'
import {isLocal} from './config'
import {localProvider} from './providers'

export const awsLocal = getRegionOutput({}, {...(isLocal ? {provider: localProvider} : {})}).apply(({name}) => name)
