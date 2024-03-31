import { Prisma } from "@prisma/client";

export interface IOptionCourse {
  skip?: number,
  take?: number,
  where?: Prisma.CourseWhereInput,
  select?: Prisma.CourseSelect,
  orderBy? :Prisma.CourseOrderByWithRelationInput,
  cursor?: Prisma.CourseWhereUniqueInput,
  distinct?: Prisma.CourseScalarFieldEnum | Prisma.CourseScalarFieldEnum[],
  include? : Prisma.CourseInclude
}