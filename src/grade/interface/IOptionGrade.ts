import { Prisma } from "@prisma/client";

export interface IOptionGrade {
  skip?: number,
  take?: number,
  where?: Prisma.GradeWhereInput,
  select?: Prisma.GradeSelect,
  orderBy? :Prisma.GradeOrderByWithRelationInput,
  cursor?: Prisma.GradeWhereUniqueInput,
  distinct?: Prisma.GradeScalarFieldEnum | Prisma.GradeScalarFieldEnum[],
  include? : Prisma.GradeInclude
}