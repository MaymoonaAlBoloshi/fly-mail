import { Link } from "@remix-run/react";

export default function NoteIndexPage() {
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
      html: `<h1 class="text-2xl text-pink-600">Template 3</h1>`,
    },
    {
      id: 4,
      name: "Template 4",
      description: "This is a template",
      html: "<h1>Template 4</h1>",
    },
    {
      id: 5,
      name: "Template 5",
      description: "This is a template",
      html: "<h1>Template 5</h1>",
    },
  ];

  return (
    <div className="flex h-full flex-row flex-wrap justify-center gap-12">
      {templates.map((template) => {
        return (
          <div
            key={template.id}
            className="flex h-2/4 w-1/3 flex-col rounded p-2 shadow-md"
          >
            <h1 className="text-2xl text-pink-600">{template.name}</h1>
            <p className="text-sm text-gray-600">{template.description}</p>
            <section className="mt-2 flex-1 shadow-sm">
              {/* add an image instead of how it looks like */}
              <div className="scale-50 w-full"   dangerouslySetInnerHTML={{ __html: template.html }} />
            </section>
            <button className="m-2 mt-2 rounded bg-pink-600 p-2 text-white hover:animate-pulse hover:bg-pink-500 hover:shadow-md">
              use template
            </button>
          </div>
        );
      })}
    </div>
  );
}
// you need this to edit html
//https://www.npmjs.com/package/react-contenteditable?activeTab=readme
