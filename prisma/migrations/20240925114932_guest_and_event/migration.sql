-- CreateTable
CREATE TABLE "Guest" (
    "Id" TEXT NOT NULL,
    "FullName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Event" (
    "Id" TEXT NOT NULL,
    "GuestId" TEXT NOT NULL,
    "SourceBarcode" TEXT NOT NULL,
    "CheckIn" TIMESTAMP(3),
    "CheckOut" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_GuestId_fkey" FOREIGN KEY ("GuestId") REFERENCES "Guest"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
