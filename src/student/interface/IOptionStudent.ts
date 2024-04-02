import { Prisma } from "@prisma/client";

export interface IOptionStudent {
  skip?: number,
  take?: number,
  where?: Prisma.StudentWhereInput,
  select?: Prisma.StudentSelect,
  orderBy? :Prisma.StudentOrderByWithRelationInput,
  cursor?: Prisma.StudentWhereUniqueInput,
  distinct?: Prisma.StudentScalarFieldEnum | Prisma.StudentScalarFieldEnum[],
  include? : Prisma.StudentInclude
}