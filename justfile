
# Default recipe, run on `just`
[private]
default:
  just --list

# FIXME: need to repair this a bit -- Bootstrap
bootstrap:
  # Deploy AWS Resources
  just packages/infr-bootstrap/deploy

deploy:
  just packages/infr-bootstrap/deploy
  just packages/infr-aws-base/deploy
  mkdir -p out/.ssh
  mkdir -p out/.kube
  cp packages/infr-bootstrap/out/.ssh/id_rsa out/.ssh/id_rsa
  cp packages/infr-aws-base/out/.kube/config out/.kube/config
  flux bootstrap git \
  --url=ssh://git@github.com/nullserve/infrastructure \
  --branch=main \
  --private-key-file=./out/.ssh/id_rsa \
  --path=clusters/test-eks

[confirm("!!!
DANGER: THIS IS VERY DESTRUCTIVE!
CANCEL BY TYPING 'no'!
YOU ARE ABOUT TO RUN THE ROOT PROJECT 'undeploy' RECIPE.
THIS DESTROYS ALL INFRASTRUCTURE.
TYPE 'no' IF YOU'RE UNSURE.
TYPE 'yes' TO CONTINUE DESTRUCTION.
!!!:")]
undeploy:
  # @echo "Undeploy was not run."
  # @echo "Sorry if you thought it'd be that easy."
  # @echo "Go uncomment all of the things you're about to run in the 'justfile' and continue"
  @just --yes private-undeploy # Uncomment this

[private, confirm]
private-undeploy:
  echo "boom"
