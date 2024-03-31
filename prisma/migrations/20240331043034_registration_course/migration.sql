-- DropIndex
DROP INDEX "Parallel_courseId_idx";

-- AlterTable
ALTER TABLE "Parallel" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Management" (
    "id" UUID NOT NULL,
    "year" VARCHAR(4) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Management_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration_Course" (
    "parallelId" UUID NOT NULL,
    "studentId" UUID NOT NULL,
    "managementId" UUID NOT NULL,

    CONSTRAINT "Registration_Course_pkey" PRIMARY KEY ("parallelId","studentId")
);

-- CreateTable
CREATE TABLE "Matter" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Matter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Registration_Course" ADD CONSTRAINT "Registration_Course_parallelId_fkey" FOREIGN KEY ("parallelId") REFERENCES "Parallel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration_Course" ADD CONSTRAINT "Registration_Course_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration_Course" ADD CONSTRAINT "Registration_Course_managementId_fkey" FOREIGN KEY ("managementId") REFERENCES "Management"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
