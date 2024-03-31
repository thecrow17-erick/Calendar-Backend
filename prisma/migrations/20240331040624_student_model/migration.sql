-- CreateTable
CREATE TABLE "Student" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "dad_lastname" VARCHAR(50) NOT NULL,
    "mother_lastname" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(8) NOT NULL,
    "ci" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
