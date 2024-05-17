
# Default recipe, run on `just`
_default:
  just --list

# Bootstrap
bootstrap:
  # Deploy AWS Resources
  just packages/infr-aws-base/deploy
  just packages/test-eks/deploy

teardown:
  just packages/test-eks/undeploy
  # Remove AWS Resources
  just packages/infr-aws-base/undeploy
