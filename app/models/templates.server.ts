import type { User, Template } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Template } from "@prisma/client";


export function getTemplate({
  id,
  userId,
}: Pick<Template, "id"> & {
  userId: User["id"];
}) {
  return prisma.template.findFirst({
    select: { id: true, title: true, description: true, html: true },
    where: { id, userId },
  });
}

export function getTemplateListItems({ userId }: { userId: User["id"] }) {
  return prisma.template.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createTemplate({
  title,
  description,
  html,
  userId,
}: Pick<Template, "description" | "title" | 'html'> & {
  userId: User["id"];
}) {
  return prisma.template.create({
    data: {
      title,
      description,
      html,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteTemplate({
  id,
  userId,
}: Pick<Template, "id"> & { userId: User["id"] }) {
  return prisma.template.deleteMany({
    where: { id, userId },
  });
}
