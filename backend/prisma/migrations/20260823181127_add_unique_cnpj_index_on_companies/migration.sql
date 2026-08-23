CREATE UNIQUE INDEX "Companies_cnpj_key" 
ON "Companies"("cnpj") 
WHERE "deletedAt" IS NULL;