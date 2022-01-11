import glob from "glob";
import fs from "fs";
import kebabCase from "lodash.kebabcase";
import rimraf from "rimraf";

const DEFINE_DOC =
  /defineDoc\(\{\s*title:\s*"([\w ]+)",\s*breadcrumbPath:\s*"([\w ]+)",\s*content:\s*<>(.*)<\/>,\s*}\)/ms;

const ALPHANUMERIC_CHAR = /^[a-zA-Z0-9]/;

interface DocResource {
  title: string;
  definitionPath: string;
  content: string;
  breadcrumbPath: string;
  route: string;

  generatedSrc: string;
  generatedComponentName: string;
  generatedFilePath: string;
}

function getRoute({ definitionPath }: DocResource): string {
  const parts = definitionPath.split("/");
  return (
    parts.slice(3, -1).join("/") +
    "/" +
    kebabCase(parts[parts.length - 1].replace(".doc.tsx", ""))
  );
}

function getGeneratedComponentName({ title }: DocResource): string {
  return (
    "Doc" +
    title
      .split("")
      .map((ch, i, arr) => {
        if (
          i > 0 &&
          !ALPHANUMERIC_CHAR.test(arr[i - 1]) &&
          ALPHANUMERIC_CHAR.test(arr[i])
        ) {
          return ch.toUpperCase();
        }

        return ch;
      })
      .map((ch) => (ALPHANUMERIC_CHAR.test(ch) ? ch : ""))
      .join("")
  );
}

function getGeneratedSrc({
  content,
  generatedComponentName,
  title,
}: DocResource) {
  return `
/* eslint-disable */
import { DocParagraph } from "pages/docs/components";
import { DocPage } from "pages/docs/components/DocPage";

export default () => <DocPage title="${title}">${content}</DocPage>;
`.trimStart();
}

function getGeneratedFilePath({ generatedComponentName }: DocResource) {
  return `src/pages/docs/generated/${generatedComponentName}.generated.tsx`;
}

async function generateDocResources(
  fileName: string
): Promise<DocResource | undefined> {
  const fileContent = await fs.promises.readFile(fileName, {
    encoding: "utf-8",
  });

  const match = fileContent.match(DEFINE_DOC);

  if (match === null) {
    console.error(`Failed to parse file ${fileName}`);
    return;
  }

  const [_, title, breadcrumbPath, content] = match;

  const resource = {
    title,
    breadcrumbPath,
    content,
    definitionPath: fileName,
  } as DocResource;

  resource.route = getRoute(resource);
  resource.generatedComponentName = getGeneratedComponentName(resource);
  resource.generatedSrc = getGeneratedSrc(resource);
  resource.generatedFilePath = getGeneratedFilePath(resource);

  return resource;
}

async function saveDocResource(resource: DocResource) {
  await fs.promises.writeFile(
    resource.generatedFilePath,
    resource.generatedSrc
  );
}

async function generateRouterFile(resources: DocResource[]) {
  const content = `
import { Route, Switch } from "react-router";
import React from "react";
${resources
  .map(
    (r) =>
      `const ${r.generatedComponentName} = React.lazy(() => import("./${r.generatedComponentName}.generated"));`
  )
  .join("\n")}

function createLazyDoc(
  Component: React.LazyExoticComponent<() => JSX.Element>
) {
  return () => (
    <React.Suspense fallback={null}>
      <Component />
    </React.Suspense>
  );
}

export const DocsRouter = () => {
  return (
    <Switch>
      ${resources
        .map(
          (r) =>
            `<Route exact path="/${r.route}" render={createLazyDoc(${r.generatedComponentName})} />`
        )
        .join("\n      ")}
    </Switch>
  );
};
`.trimStart();

  await fs.promises.writeFile(
    "src/pages/docs/generated/DocsRouter.tsx",
    content
  );
}

async function main() {
  rimraf.sync(__dirname + "src/pages/docs/generated");
  const docFiles = glob.sync("src/pages/docs/**/*.doc.tsx");
  const docResources = await Promise.all(docFiles.map(generateDocResources));

  if (docResources.some((r) => !r)) {
    console.log("Stopping because of errors");
    return;
  }

  await Promise.all((docResources as DocResource[]).map(saveDocResource));

  await generateRouterFile(docResources as DocResource[]);
}

main();
