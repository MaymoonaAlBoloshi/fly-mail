import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getTemplateListItems } from "~/models/templates.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const noteListItems = await getTemplateListItems({ userId });
  return json({ noteListItems });
}

export default function TemplatesPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  console.log(data, "templatesPage data");
  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-purple-900 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Fly Mail templates</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-pink-600 py-2 px-4 text-pink-100 hover:bg-pink-500 active:bg-pink-600"
          >
            Logout temp
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-purple-50">
          <Link to="new" className="block p-4 text-xl text-purple-500">
            + Add new template 
          </Link>
          <hr />

          {data.noteListItems.length === 0 ? (
            <p className="p-4">No templates yet</p>
          ) : (
            <ol>
              {data.noteListItems.map((note) => (
                <li key={note.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={note.id}
                  >
                    📝 {note.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
