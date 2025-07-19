variable "region" {
  description = "AWS region to deploy resources to"
  type        = string
  default     = "eu-west-1"
}

variable "project_name" {
  type = string
}

variable "domain_name" {
  description = "The name of the domain resources are deployed for"
  type        = string
}
