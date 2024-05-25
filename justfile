
# Default recipe, run on `just`
_default:
  just --list

# FIXME: need to repair this a bit -- Bootstrap
bootstrap:
  # Deploy AWS Resources
  just packages/infr-aws-base/deploy
  just packages/infr-test-eks/deploy

deploy:
  just packages/infr-bootstrap/deploy
  just packages/infr-aws-base/deploy
  mkdir -p packages/infr-test-eks/out/.kube
  cp packages/infr-aws-base/out/.kube/config packages/infr-test-eks/out/.kube/config
  just packages/infr-test-eks/deploy

teardown:
  just packages/test-eks/undeploy
  # Remove AWS Resources
  just packages/infr-aws-base/undeploy
