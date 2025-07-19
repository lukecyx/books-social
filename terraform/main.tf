module "cognito" {
  source       = "./cognito"
  project_name = var.project_name
  domain_name  = var.domain_name
}
