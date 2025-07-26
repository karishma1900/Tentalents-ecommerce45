# ===== VARIABLES =====
SERVICES = user-service product-service order-service payment-service rating-service email-service cart-service search-service invoice-service analytics-service
PRISMA_SERVICES = user-service product-service order-service rating-service cart-service search-service invoice-service analytics-service
REGISTRY = ghcr.io/your-org/mvp-ecom
TAG ?= latest

# ===== PHONY =====
.PHONY: \
  help dev start-service-% test lint build nx-graph \
  prisma-migrate prisma-generate prisma-seed seed prisma-studio \
  docker-build docker-push docker-clean \
  infra-up infra-down infra-restart postgres-init \
  kind-start kind-delete load-images \
  helm-init helm-deploy helm-destroy helmfile-sync \
  monitor-start monitor-stop jaeger-ui grafana-ui \
  logs-% scan-images falco-install falco-uninstall \
  affected affected-build affected-lint affected-test affected-deploy \
  ci deploy reset

# ===== HELP =====
help: ## Show all available commands
	@echo "📦 All Available Commands:"
	@grep -E '^[a-zA-Z0-9_-]+:.*?##' Makefile | awk 'BEGIN {FS = ":.*?##"}; {printf "  \033[36m%-38s\033[0m %s\n", $$1, $$2}'

# ===== DEV & NX =====
dev: ## 🚀 Run all microservices in dev mode
	nx run-many --target=serve --all

start-service-%: ## 🧩 Start single service (e.g., make start-service-user-service)
	cd apps/$* && npm run start:dev

test: ## 🧪 Run all unit tests (Jest)
	nx run-many --target=test --all

lint: ## 🧹 Run ESLint across all services
	nx run-many --target=lint --all

build: ## 🏗️ Build all services
	nx run-many --target=build --all

nx-graph: ## 🧠 Show Nx dependency graph
	nx graph

# ===== PRISMA & DB =====
prisma-migrate: ## 🔄 Apply Prisma migrations
	@for service in $(PRISMA_SERVICES); do \
		echo "🚀 Migrating $$service..."; \
		cd apps/$$service && \
		npx prisma migrate dev --name init --schema=prisma/schema.prisma || true; \
		cd - >/dev/null; \
	done


prisma-generate: ## 🔧 Generate Prisma Client
	@for service in $(PRISMA_SERVICES); do \
		echo "🔧 Generating Prisma Client for $$service..."; \
		npx prisma generate --schema=apps/$$service/prisma/schema.prisma || exit 1; \
	done

prisma-seed: ## 🌱 Seed data via seed.ts
	@for service in $(PRISMA_SERVICES); do \
		if [ -f apps/$$service/prisma/seed.ts ]; then \
			echo "🌱 Seeding $$service..."; \
			npx tsx apps/$$service/prisma/seed.ts; \
		else \
			echo "⚠️  No seed.ts found for $$service. Skipping..."; \
		fi; \
	done

seed: prisma-seed ## 🌱 Shortcut for seeding all Prisma-enabled services

prisma-studio: ## 🧪 Open Prisma Studio for user-service
	npx prisma studio --schema=apps/user-service/prisma/schema.prisma


check-readiness:
	@echo "🔍 Running Backend Readiness Audit..."
	npx tsx tools/scripts/check-readiness.ts



# ===== DOCKER =====
docker-build: ## 🛠️ Build Docker images
	@for service in $(SERVICES); do \
		docker build -t $(REGISTRY)/$$service:$(TAG) apps/$$service; \
	done

docker-push: ## 🚀 Push Docker images to registry
	@for service in $(SERVICES); do \
		docker push $(REGISTRY)/$$service:$(TAG); \
	done

docker-clean: ## 🧼 Remove local Docker images
	@for service in $(SERVICES); do \
		docker rmi -f $(REGISTRY)/$$service:$(TAG) || true; \
	done

# ===== DOCKER COMPOSE INFRASTRUCTURE =====
infra-up: ## 🟩 Start Redis, PostgreSQL, Kafka, MinIO
	docker-compose -f infra/docker-compose.yml up -d

infra-down: ## 🔻 Stop infrastructure containers
	docker-compose -f infra/docker-compose.yml down

infra-restart: ## 🔁 Restart infra stack
	make infra-down && make infra-up

postgres-init: ## ♻️ Reinitialize Postgres with volume cleanup
	cd infra/docker && \
	docker-compose -f docker-compose-tools.yaml --env-file .env_main down -v && \
	docker volume rm docker_postgres_data && \
	docker-compose -f docker-compose-tools.yaml --env-file .env_main up -d postgres

# ===== KUBERNETES / KIND =====
kind-start: ## 🚀 Create kind cluster
	kind create cluster --name mvp-ecom --config infra/kind/kind-config.yaml

kind-delete: ## 🔥 Delete kind cluster
	kind delete cluster --name mvp-ecom

load-images: ## 📦 Load Docker images into kind
	@for service in $(SERVICES); do \
		kind load docker-image $(REGISTRY)/$$service:$(TAG) --name mvp-ecom; \
	done

# ===== HELM & HELMFILE =====
helm-init: ## 📦 Initialize Helm repositories
	helm repo add bitnami https://charts.bitnami.com/bitnami
	helm repo add falcosecurity https://falcosecurity.github.io/charts
	helm repo update

helm-deploy: ## 🚀 Deploy all services using Helm
	@for service in $(SERVICES); do \
		helm upgrade --install $$service infra/helm/microservices/$$service \
		-f infra/helm/microservices/$$service/values.yaml; \
	done

helm-destroy: ## 🧨 Uninstall all Helm services
	@for service in $(SERVICES); do \
		helm uninstall $$service || true; \
	done

helmfile-sync: ## 🔁 Sync with Helmfile (infra/helmfile/helmfile.yaml)
	cd infra/helmfile && helmfile sync

# ===== OBSERVABILITY =====
monitor-start: ## 📊 Start Prometheus, Grafana, Loki, Jaeger
	helm upgrade --install monitoring infra/helm/monitoring \
		-f infra/helm/monitoring/values.yaml

monitor-stop: ## ❌ Uninstall monitoring stack
	helm uninstall monitoring || true

jaeger-ui: ## 🔍 Port forward Jaeger UI
	kubectl port-forward svc/jaeger-query 16686:16686 -n observability

grafana-ui: ## 📈 Port forward Grafana
	kubectl port-forward svc/grafana 3000:3000 -n observability

# ===== LOGGING & METRICS =====
logs-%: ## 📄 Tail logs of service pod (e.g., make logs-user-service)
	kubectl logs -l app=$* -f

# ===== SECURITY & SCANNING =====
scan-images: ## 🔒 Trivy scan of Docker images
	@for service in $(SERVICES); do \
		trivy image $(REGISTRY)/$$service:$(TAG); \
	done

falco-install: ## 🛡️ Install Falco runtime security
	helm upgrade --install falco falcosecurity/falco -n falco --create-namespace

falco-uninstall: ## ❌ Uninstall Falco
	helm uninstall falco -n falco || true

# ===== NX AFFECTED =====
affected: ## 🧠 Show affected projects
	nx show projects --affected

affected-build: ## 🔨 Build only affected services
	nx affected:build --base=origin/main --head=HEAD

affected-lint: ## 🧹 Lint only affected services
	nx affected:lint --base=origin/main --head=HEAD

affected-test: ## 🧪 Test only affected services
	nx affected:test --base=origin/main --head=HEAD

affected-deploy: affected-build docker-build docker-push helm-deploy ## 🚀 Deploy only affected services

# ===== CI/CD SHORTCUTS =====
ci: lint test build ## ⚙️ CI Shortcut: lint, test, build

deploy: docker-build docker-push helm-deploy ## 🚀 Build + Push + Deploy all services

reset: docker-clean kind-delete kind-start load-images helm-deploy ## ♻️ Full reset: clean, recreate, deploy

# === INDIVIDUAL CORE SERVICES ===

user-service:
	npm run user-service

product-service:
	npm run product-service

order-service:
	npm run order-service

rating-service:
	npm run rating-service

email-service:
	npm run email-service

payment-service:
	npm run payment-service

search-service:
	npm run search-service

cart-service:
	npm run cart-service

admin-service:
	npm run admin-service

invoice-service:
	npm run invoice-service

analytics-service:
	npm run analytics-service

vendor-service:
	npm run vendor-service


# === INDIVIDUAL POST-MVP SERVICES ===

coupon-service:
	npm run coupon-service

cms-service:
	npm run cms-service

refund-service:
	npm run refund-service

recommendation-service:
	npm run recommendation-service


# === GROUPED RUNNERS ===

core-services:
	npx concurrently \
		"npm run user:service" \
		"npm run product:service" \
		"npm run order:service" \
		"npm run rating:service" \
		"npm run email:service" \
		"npm run payment:service" \
		"npm run search:service" \
		"npm run cart:service" \
		"npm run admin:service" \
		"npm run invoice:service" \
		"npm run analytics:service" \
		"npm run vendor:service"

post-mvp-services:
	npx concurrently \
		"npm run coupon:service" \
		"npm run cms:service" \
		"npm run refund:service" \
		"npm run recommendation:service"

all-services:
	make core-services &
	make post-mvp-services



# Docker

# Makefile for managing microservices and infrastructure

# Default target
.PHONY: help
help:
	@echo "Usage:"
	@echo "  make up           - Build and start all containers"
	@echo "  make down         - Stop and remove all containers"
	@echo "  make restart      - Restart all containers"
	@echo "  make logs         - View logs of all services"
	@echo "  make logs SERVICE=name - View logs of a specific service"
	@echo "  make ps           - List running containers"
	@echo "  make build        - Rebuild all Docker images"
	@echo "  make clean        - Remove all volumes and containers"
	@echo "  make prune        - Prune all stopped containers, networks, volumes, and images"

# Start all containers and rebuild images
up:
	docker-compose up --build

# Stop and remove all containers, networks, volumes
down:
	docker-compose down

# Restart all services
restart: down up

# View logs for all services
logs:
	docker-compose logs -f --tail=100

# View logs for a specific service
# Example: make logs SERVICE=user-service
logs-service:
	docker-compose logs -f --tail=100 $(SERVICE)

# List running containers
ps:
	docker-compose ps

# Rebuild Docker images
build:
	docker-compose build

# Remove all volumes and containers
clean:
	docker-compose down -v

# Prune stopped containers, unused volumes, images, etc.
prune:
	docker system prune -af --volumes





# # ====================== 🧭 GENERAL ======================
# make help                  # Show all available commands
# make dev                   # Run all microservices in dev mode
# make start-service-<name>  # Start single service (e.g., user-service)
# make nx-graph              # Show Nx dependency graph

# # ==================== ✅ CODE QUALITY ====================
# make lint                  # Run ESLint across all services
# make test                  # Run all Jest unit tests
# make build                 # Build all services

# # ==================== 🧠 PRISMA & DB ====================
# make prisma-migrate        # Apply Prisma migrations for all Prisma services
# make prisma-generate       # Generate Prisma clients
# make prisma-seed           # Seed all services with seed.ts (if exists)
# make seed                  # Alias for `prisma-seed`
# make prisma-studio         # Open Prisma Studio (user-service default)

# make check-readiness

# # ==================== 🐳 DOCKER ====================
# make docker-build          # Build Docker images for all services
# make docker-push           # Push Docker images to registry
# make docker-clean          # Remove local Docker images

# # ========== 🏗️ INFRASTRUCTURE (Docker Compose) ==========
# make infra-up              # Start PostgreSQL, Redis, Kafka, MinIO
# make infra-down            # Stop infra stack
# make infra-restart         # Restart infra
# make postgres-init         # Reinitialize PostgreSQL volumes

# # ========== ☸️ KUBERNETES (kind + Helm) ==========
# make kind-start            # Start kind cluster
# make kind-delete           # Delete kind cluster
# make load-images           # Load images into kind

# make helm-init             # Add/update Helm repos
# make helm-deploy           # Deploy all services via Helm
# make helm-destroy          # Uninstall all Helm releases
# make helmfile-sync         # Sync Helm deployments via helmfile.yaml

# # ========== 📊 OBSERVABILITY ==========
# make monitor-start         # Deploy Prometheus, Grafana, Loki, Jaeger
# make monitor-stop          # Uninstall observability stack
# make jaeger-ui             # Port-forward Jaeger UI (localhost:16686)
# make grafana-ui            # Port-forward Grafana UI (localhost:3000)

# # ========== 📄 LOGGING ==========
# make logs-<service>        # Tail logs from a service pod (e.g., logs-user-service)

# # ========== 🔐 SECURITY ==========
# make scan-images           # Scan all Docker images with Trivy
# make falco-install         # Install Falco (runtime threat detection)
# make falco-uninstall       # Uninstall Falco

# # ========== 🎯 NX AFFECTED COMMANDS ==========
# make affected              # Show affected projects
# make affected-build        # Build only affected services
# make affected-lint         # Lint only affected services
# make affected-test         # Test only affected services
# make affected-deploy       # Build + Push + Deploy only affected services

# # ========== 🚀 CI/CD SHORTCUTS ==========
# make ci                    # Lint + Test + Build (CI shortcut)
# make deploy                # Docker build + push + deploy via Helm
# make reset                 # Clean Docker + kind + redeploy all


# Start one service
# make user-service

# Start all core services
# # make core-services

# # Start all post-MVP services
# make post-mvp-services

# # Start everything
# make all-services
