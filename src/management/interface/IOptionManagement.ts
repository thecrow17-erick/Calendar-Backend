import { Prisma } from "@prisma/client";

export interface IOptionManagement {
  skip?: number,
  take?: number,
  where?: Prisma.ManagementWhereInput,
  select?: Prisma.ManagementSelect,
  orderBy? :Prisma.ManagementOrderByWithRelationInput,
  cursor?: Prisma.ManagementWhereUniqueInput,
  distinct?: Prisma.ManagementScalarFieldEnum | Prisma.ManagementScalarFieldEnum[],
  include? : Prisma.ManagementInclude
}