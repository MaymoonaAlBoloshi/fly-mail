import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteTemplate, getTemplate } from "~/models/templates.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.templateId, "templateId not found");

  const template = await getTemplate({ userId, id: params.templateId });
  if (!template) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ template });
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request);
  invariant(params.templateId, "templateId not found");

  await deleteTemplate({ userId, id: params.templateId });

  return redirect("/templates");
}

export default function TemplateDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.template.title}</h3>
      <p className="py-6">{data.template.description}</p>
      <hr className="my-4" />
      <div contentEditable dangerouslySetInnerHTML={{ __html: data.template.html }} />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>template not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
