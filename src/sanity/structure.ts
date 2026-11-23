import type {
  StructureBuilder,
  StructureResolver,
  StructureResolverContext,
} from "sanity/structure";
import { pageTypes, singletonTypes } from "../sanity/schemaTypes/singletons";

type Ordering = { field: string; direction: "asc" | "desc" }[];

/** A document that opens straight to its editor. Title comes from the schema. */
const singleton = (
  S: StructureBuilder,
  context: StructureResolverContext,
  type: string
) =>
  S.listItem()
    .title(context.schema.get(type)?.title ?? type)
    .id(type)
    .child(S.document().schemaType(type).documentId(type));

/** A list of every document of one type. */
const collection = (
  S: StructureBuilder,
  title: string,
  type: string,
  ordering?: Ordering
) => {
  const list = S.documentTypeList(type).title(title);
  return S.listItem()
    .title(title)
    .schemaType(type)
    .child(ordering ? list.defaultOrdering(ordering) : list);
};

// Types listed explicitly below. Anything else still shows at the bottom,
// so a new schema is never hidden by accident.
const grouped = ["service", "caseStudy", "post", "legalPage"];

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, context, "siteSettings"),
      singleton(S, context, "siteLayout"),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items(pageTypes.map((type: string) => singleton(S, context, type)))
        ),
      S.divider(),

      collection(S, "Services", "service", [
        { field: "order", direction: "asc" },
      ]),
      collection(S, "Case Studies", "caseStudy", [
        { field: "publishedAt", direction: "desc" },
      ]),
      collection(S, "Blog Posts", "post", [
        { field: "publishedAt", direction: "desc" },
      ]),
      collection(S, "Legal Pages", "legalPage", [
        { field: "title", direction: "asc" },
      ]),

      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return (
          id &&
          !(singletonTypes as readonly string[]).includes(id) &&
          !grouped.includes(id)
        );
      }),
    ]);
