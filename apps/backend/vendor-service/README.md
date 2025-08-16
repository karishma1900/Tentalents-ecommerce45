🛒 Vendor Service – Multi-Vendor E-Commerce Platform

The Vendor Service manages the lifecycle of sellers (vendors) in the marketplace. It handles vendor registration, onboarding (KYC / GST verification), product association, payouts, invoices, and vendor ratings.

📌 Responsibilities

✅ Register new vendors (store name, KYC, documents, etc.)

✅ Manage vendor status (pending, approved, rejected, suspended)

✅ Store and retrieve vendor KYC/GST documents (via MinIO)

✅ Link vendors to products, orders, invoices, and payouts

✅ Track ratings and feedback from buyers

✅ Emit Kafka events (vendor.created, vendor.status.updated)

🧠 Domain Models (Prisma Schema)
Model	Description
Vendor	Seller profile with store details, KYC documents, and approval status
User	Linked user account (role: VENDOR, CUSTOMER, ADMIN, etc.)
Product	Products listed by the vendor
Order	Orders fulfilled by the vendor
Payout	Payouts issued to vendor (earnings/revenue share)
Invoice	Invoices generated for vendor’s orders
Rating	Buyer reviews and ratings for vendors

📄 Prisma schema location:
apps/vendor-service/prisma/schema.prisma

🧱 Tech Stack

Framework: Express.js

ORM: Prisma (PostgreSQL)

Auth & RBAC: JWT-based (@shared/auth)

File Storage: MinIO (for vendor docs like KYC/GST)

Messaging: Kafka (vendor.created, vendor.status.updated)

Monitoring: Swagger, Prometheus

Containerization: Docker, Kubernetes

🚀 Getting Started
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Run database migrations
npx prisma migrate dev --name init

# 4. Start the service
npm run start:dev

⚙️ Environment Variables (.env)
DATABASE_URL=postgresql://user:password@localhost:5432/vendor_service_db
JWT_SECRET=super_secret_jwt_key
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minio
MINIO_SECRET_KEY=minio123
MINIO_BUCKET=vendor-docs
KAFKA_BROKER=localhost:9092

📚 Key API Endpoints
Method	Endpoint	Role	Description
POST	/vendors	public	Register as a vendor (pending status)
GET	/vendors/:id	vendor	Get vendor profile
PATCH	/vendors/:id/status	admin	Approve, reject, or suspend a vendor
GET	/vendors/:id/products	vendor	List products belonging to a vendor
GET	/vendors/:id/orders	vendor	List orders fulfilled by the vendor
GET	/vendors/:id/payouts	vendor	View payout history
GET	/vendors/:id/ratings	public	View vendor ratings and reviews

🔒 Endpoints are protected with JWT + RBAC.

🧪 Testing
# Run unit tests
npm run test

# Open Prisma Studio
npx prisma studio

📦 Kafka Events

vendor.created → emitted when a new vendor registers

vendor.status.updated → emitted when admin updates vendor status

Would you like me to also include a folder structure section (like apps/vendor-service/src/app/...) so contributors know where controllers, services, and schemas live?
