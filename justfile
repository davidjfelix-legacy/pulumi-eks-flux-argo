
# Default recipe, run on `just`
_default:
  just --list

# Bootstrap
bootstrap:
  just packages/test-eks/deploy

teardown:
  just packages/test-eks/undeploy
