import glob from "glob";
import fs from "fs";
import rimraf from "rimraf";
import { DocData, DocNode, Docs } from "./Docs";

const DEFINE_DOC =
  /defineDoc\(\{\s*title:\s*"([\w ]+)",\s*content:\s*(?:\(\s*)?<>(.*)<\/>(?:\s*\s*\))?,\s*}\)/ms;

async function generateDocData(fileName: string): Promise<DocData | undefined> {
  const fileContent = await fs.promises.readFile(fileName, {
    encoding: "utf-8",
  });

  const match = fileContent.match(DEFINE_DOC);

  if (match === null) {
    console.error(`Failed to parse file ${fileName}`);
    return;
  }

  const [, title, content] = match;

  return new DocData(fileName, content, title);
}

async function generateRouterFile(datas: DocData[]) {
  const content = `
import { Route, Routes } from "react-router-dom";
import React from "react";
${datas
  .map(
    (r) =>
      `const ${r.generatedComponentName} = React.lazy(() => import("./${r.generatedComponentName}.generated"));`
  )
  .join("\n")}

function createLazyDoc(
  Component: React.LazyExoticComponent<() => JSX.Element>
) {
  return (
    <React.Suspense fallback={null}>
      <Component />
    </React.Suspense>
  );
}

export const DocsRouter = () => {
  return (
    <Routes>
      ${datas
        .map((r) => {
          const relativeRoute = r.route.replace(/^\/docs\/?/, "");
          if (relativeRoute.length > 0) {
            return `<Route path="${relativeRoute}" element={createLazyDoc(${r.generatedComponentName})} />`;
          }
          return `<Route index element={createLazyDoc(${r.generatedComponentName})} />`;
        })
        .join("\n      ")}
    </Routes>
  );
};
`.trimStart();

  await fs.promises.writeFile(
    "src/static/pages/docs/generated/DocsRouter.generated.tsx",
    content
  );
}

function generateSidebarNode(node: DocNode, indentation = 0): string {
  const title = node.shortTitle;
  const toProp = node.data?.route ? `to="${node.data.route}"` : "";
  if (node.children.size > 0) {
    return `
<DocSidebarNode label="${title}" ${toProp}>
  ${Array.from(node.children.values())
    .map((child) => generateSidebarNode(child, indentation + 1))
    .join("\n")}
</DocSidebarNode>
    `
      .trim()
      .split("\n")
      .join("\n" + indent(indentation));
  }

  return `<DocSidebarNode label="${title}" ${toProp} />`
    .trim()
    .split("\n")
    .join("\n" + indent(indentation));
}

function indent(n: number) {
  let s = "";
  for (let i = 0; i < n; i++) {
    s += "  ";
  }
  return s;
}

async function generateSidebar(root: DocNode) {
  const content = `
import {
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DocSidebarNode } from "static/pages/docs/components/DocSidebarNode";

export const DocsSidebar = () => {
  return (
    <>
${Array.from(root.children.values())
  .map((child) => generateSidebarNode(child, 3))
  .join("\n")}
    </>
  );
}
`.trimStart();

  await fs.promises.writeFile(
    "src/static/pages/docs/generated/DocsSidebar.generated.tsx",
    content
  );
}

function generateDocBreadcrumbs(node: DocNode | undefined): string {
  if (node === undefined) {
    return `["Home", "/"]`;
  }

  if (node.parent === undefined) {
    return `["Home", "/"],["${node.shortTitle}","${node.key}"]`;
  }

  return `${generateDocBreadcrumbs(node.parent)},["${node.shortTitle}", "/${
    node.key
  }"]`;
}

async function generateDoc(node: DocNode) {
  if (!node.data) {
    return;
  }

  const content = `
  /* eslint-disable */
  import { DocParagraph, DocSubtitle, DocUnorderedList, DocListItem, DocOrderedList } from "static/pages/docs/components";
  import { DocPage } from "static/pages/docs/components/DocPage";
  
  export default () => <DocPage title="${
    node.data.title
  }" breadcrumbPieces={[${generateDocBreadcrumbs(node.parent)}]}>${
    node.data.definitionComponentSrc
  }</DocPage>;
`;

  await fs.promises.writeFile(node.data.generatedFilePath, content);
}

async function main() {
  rimraf.sync("src/static/pages/docs/generated/*.generated.tsx");
  const docFiles = glob.sync("src/static/pages/docs/content/**/*.doc.tsx");
  const docDataResults = await Promise.all(docFiles.map(generateDocData));

  if (docDataResults.some((r) => !r)) {
    console.log("Stopping because of errors");
    return;
  }

  const docDataArr = docDataResults as DocData[];

  const rootData = docDataArr.find((d) => d.title === "Docs");
  if (!rootData) {
    console.error("Could not find root doc definition");
    return;
  }

  const nonRootDataArr = docDataArr.filter((d) => d.title !== "Docs");

  const docs = new Docs(rootData);
  nonRootDataArr.forEach((d) => docs.addDoc(d));

  await Promise.all([
    ...docs.list.map(generateDoc),
    generateRouterFile(docs.dataList),
    generateSidebar(docs.tree),
  ]);
}

main();
