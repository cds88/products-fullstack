# Fullstack Application for Product Placeholders

This repository provides a fullstack implementation for managing product placeholders fetched from [dummyjson.com](https://dummyjson.com), using C# (.NET) and Node.js/React libraries.

## Key Features

### Backend (C# .NET)
- **OData Protocol**: 
    - Implements efficient query filtering with verbose parameters.
    - Quick configuration that works effectively [Odata documentation](https://www.odata.org/documentation/)
- **EF ORM**: 
    - Simplifies access to the database layer.
    - Distinct dbaccess layer allows to share abstraction between APIs and console applications
- **Console Application**: 
    - Provides an interface for managing the application.
    - Allows to quickly manage common migration chores and fetching initiating tasks on the backend
- **Decoupled Tests**: 
    - Tests are separated from the implementation logic for better maintainability.
    - Unit and Integration tests deboupled from each other 
    - XUnit and Moq implemented

### Frontend (Node.js/React)
Built using a decoupled architecture with Yarn workflows and a monorepo structure powered by TurboRepo.

#### Directory Structure
- **`dependencies`**
  - Manages shared, grouped dependencies between packages.
  - Enables efficient dependency management and versioning without clutter.
  
- **`packages`**
  - Includes shared libraries, such as type definitions used across the application.

- **`components`**
  - Contains a library of reusable UI components for building applications.

- **`apps`**
  - Workspace for main applications, which can include:
    - Next.js applications
    - React clients
    - Admin panels
    - Express lambda functions
    - Proxy APIs
  - **Example Application**:
    - A Next.js application for rendering the client products app.
    - An admin panel that shares common components (e.g., footer) with the client app.
    - Features full hot-reload for local development and supports future versioning.
  - Promotes efficient development with reusable building blocks.

#### Testing Framework
- **e2e Tests**: Created with Playwright.
- **Integration & Regression Tests**:
  - Decoupled from implementation logic.
  - Utilize shared dependencies.
  - Regression tests include pixel matching to ensure visual consistency.
- **Unit Tests**:
  - Jest and react-testing-library
  - Can be placed alongside components or fully decoupled, depending on developer preference.
  - Designed for modularity and scalability.

---

## Staging Deployment

The application is deployed on a staging remote server running a **proxy Docker network** with **Nginx**. This setup ensures seamless routing and scalability:

- **Wildcard Subdomains**:
  - The Docker proxy intercepts wildcard subdomains and translates them into Docker services hostnames. This allows developers to dynamically create staging deployment containers, which are automatically mapped to corresponding subdomain names.

- **Staging Deployment Example**:
  - Pushing a branch named: `develop` will result in automatic deployment and routing to main deployment branch:
    - **`products.app.setsudo.net`**
  - Pushing a staging branch, such as `staging/test-branches`, will be deployed under:
    - **`test-branches.app.setsudo.net`**
  - Pushing a staging branch, such as `staging/test-branches-1`, will be deployed under:
    - **`test-branches-1.app.setsudo.net`**  etc.

- **Seamless Communication**:
  - The Next.js application communicates at the network level with other containers. This enables developers to stack images and services at their own will, orchestrating them dynamically without manual configuration.
  - This deployment strategy simplifies the process for staging , providing flexibility, scalability, and automation for developers.
  - Environment orchestrations are isolated from one another, enabling the full utilization of the testing process.

---

### Production Deployment
Production deployment is powered by **Kubernetes**, **Terraform**, and **Ansible**, ensuring a robust, scalable, and automated environment:

- **Kubernetes**:
  - Manages container orchestration with features like load balancing, scaling, and service discovery.
  - YAML configuration files for deployment, services, and ingress ensure consistency and flexibility.
  - Examples in the repository:
    - `deployment-products-api.yaml`
    - `deployment-products-next.yaml`
    - `ingress-products.yaml`

- **Terraform**:
  - Automates infrastructure provisioning and ensures infrastructure as code (IaC) for consistency and repeatability.
  - Configuration files, such as `main.tf`, demonstrate cloud-based deployment setup.

- **Ansible**:
  - Used for configuration management and automation of tasks such as software installation, updates, and orchestration.
  - Example: `playbook.yml` for deploying updates or managing services.

- **Dynamic Load Handling**:
  - Kubernetes enables seamless scaling to handle variable workloads.
  - The system allows for zero-downtime updates and efficient resource utilization.

### Deployment Pipeline
The deployment pipeline integrates:
- CI/CD workflows defined in `.github/workflows/`
  - `deploy-staging.yml`: Deployment workflow reponsible for main staging environment. Works on push to develop branch
  - `deploy-staging-branch.yml`: Action workflow designed to deploy distinct staging branches to their corresponding environments
- Automated testing and infrastructure validation steps.
- Support for multiple environments, including staging and production.

---


## Highlights
- **Separation of Concerns**: Enforced across multiple levels for clean and maintainable architecture.
- **Containerization**: Supports separation of environments and orchestration.
- **Hot Reload**: Streamlines local development.
- **Scalability**: Designed for modularity, enabling efficient collaboration and future enhancements.


## Summary
This repository showcases a modern fullstack application with a focus on clean architecture, efficient workflows, and developer productivity. It demonstrates best practices in both backend and frontend development, offering a scalable solution for building robust applications.

 