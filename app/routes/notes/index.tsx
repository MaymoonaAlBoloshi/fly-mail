import { Link } from "@remix-run/react";

export default function NoteIndexPage() {
  // create a list of html templates for emails strings in an array

  const templates = [
    {
      id: 1,
      name: "Template 1",
      description: "This is a template",
      html: "<h1>Template 1</h1>",
    },
    {
      id: 2,
      name: "Template 2",
      description: "This is a template",
      html: "<h1>Template 2</h1>",
    },
    {
      id: 3,
      name: "Template 3",
      description: "This is a template",
      html: "<h1>Template 3</h1>",
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      {templates.map((template) => {
        return (
          <div
            key={template.id}
            className="rounded border-2 border-red-300 p-2"
          >
            <h1 className="text-2xl text-pink-600">{template.name}</h1>
            <p className="text-sm text-gray-600">{template.description}</p>
            <section className="mt-2 shadow-sm">
              <div dangerouslySetInnerHTML={{ __html: template.html }} />
            </section>
          </div>
        );
      })}
    </div>
  );
}
