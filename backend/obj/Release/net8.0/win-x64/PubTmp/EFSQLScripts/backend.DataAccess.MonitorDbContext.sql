CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20250120120208_init') THEN
    CREATE TABLE "Devices" (
        "Id" uuid NOT NULL,
        "CreateAt" timestamp with time zone NOT NULL,
        "ContractName" text NOT NULL,
        "ContractId" text NOT NULL,
        "Address" text NOT NULL,
        "IpAddress" text NOT NULL,
        "MacAddress" text NOT NULL,
        "Note" text NOT NULL,
        "IsConnected" text NOT NULL,
        "TimeOffline" integer NOT NULL,
        "Log" text[] NOT NULL,
        CONSTRAINT "PK_Devices" PRIMARY KEY ("Id")
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20250120120208_init') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20250120120208_init', '9.0.0');
    END IF;
END $EF$;
COMMIT;

