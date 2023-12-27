-- CreateTable
CREATE TABLE "clients_invoices" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL,
    "eletrical_energy_kwh" INTEGER NOT NULL,
    "eletrical_energy_price" INTEGER NOT NULL,
    "eletrical_sceee_without_icms_kwh" INTEGER NOT NULL,
    "eletrical_sceee_without_icms_price" INTEGER NOT NULL,
    "eletrical_compensated_gdi_kwh" INTEGER NOT NULL,
    "municipal_public_contribution_price" INTEGER NOT NULL,
    "invoice_file_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_invoices_pkey" PRIMARY KEY ("id")
);
