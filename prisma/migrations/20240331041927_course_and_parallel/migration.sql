-- CreateTable
CREATE TABLE "Grade" (
    "id" UUID NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "desc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" UUID NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "gradeId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parallel" (
    "id" UUID NOT NULL,
    "courseId" UUID NOT NULL,

    CONSTRAINT "Parallel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Parallel_courseId_idx" ON "Parallel"("courseId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parallel" ADD CONSTRAINT "Parallel_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
