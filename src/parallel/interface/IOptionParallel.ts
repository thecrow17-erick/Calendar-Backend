import { Prisma } from "@prisma/client";

export interface IOptionParallel {
  skip?: number,
  take?: number,
  where?: Prisma.ParallelWhereInput,
  select?: Prisma.ParallelSelect,
  orderBy? :Prisma.ParallelOrderByWithRelationInput,
  cursor?: Prisma.ParallelWhereUniqueInput,
  distinct?: Prisma.ParallelScalarFieldEnum | Prisma.ParallelScalarFieldEnum[],
  include? : Prisma.ParallelInclude
}