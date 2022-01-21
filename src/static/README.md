# Vulcan Gaming Platform - Web - Static

## Getting Started

Since the static site is isolated from the rest of the platform the only environment variable that needs to be set is `REACT_APP_TARGET=static`.

## Writing A Doc

The docs are one of the most important parts of the static site. All doc code can be found at `src/static/pages/docs`. Within there you'll find 3 folders

- `components`: Design system components for writing docs
- `content`: The actual documentation
- `generated`: The results of running `npm run codegen:docs`. This will create components, optimize routing and set up navigation.

Within the `content` folder is where you'll write the doc. The folder structure from there mimics the url.

Given the structure

```
Docs.doc.tsx
docs/
  Vulcast.doc.tsx
  vulcast/
    CreatingAVulcast.doc.tsx
```

There will be docs at

```
/docs
/docs/vulcast
/docs/vulcast/creating-a-vulcast
```

Individual doc files are named using PascalCase and end with `.doc.tsx`. The filenames are used to generate the short names of each doc used in the navigation tree and breadcrumbs. They must be unique.

Folders are named in kebab-case and are also used to generate short names.

Each doc must have the structure

```typescript
import { defineDoc } from "static/pages/docs/components/defineDoc";
import { /* Doc components */ } "static/pages/docs/components";

defineDoc({
  title: "Docs",
  content: <>{/* Doc content */}</>,
});
```

Once a doc is written run `npm run codegen:docs` to create it!
