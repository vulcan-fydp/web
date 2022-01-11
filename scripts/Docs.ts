import kebabCase from "lodash.kebabcase";

const ALPHANUMERIC_CHAR = /^\w$/;
const UPPERCASE_CHAR = /^[A-Z]$/;

export class DocData {
  constructor(
    public readonly definitionPath: string,
    public readonly definitionComponentSrc: string,
    public readonly title: string
  ) {}

  private _definitionFileName?: string;
  public get definitionFileName() {
    if (this._definitionFileName !== undefined) {
      return this._definitionFileName;
    }

    const pathParts = this.definitionPath.split("/");
    return pathParts[pathParts.length - 1].replace(".doc.tsx", "");
  }

  private _route?: string;
  public get route() {
    if (this._route !== undefined) {
      return this._route;
    }

    const parts = this.definitionPath.split("/");
    this._route =
      parts.slice(3, -1).join("/") +
      "/" +
      kebabCase(parts[parts.length - 1].replace(".doc.tsx", ""));
    if (!this._route.startsWith("/")) {
      this._route = "/" + this._route;
    }
    return this._route;
  }

  private _generatedComponentName?: string;
  public get generatedComponentName() {
    if (this._generatedComponentName !== undefined) {
      return this._generatedComponentName;
    }
    return (
      "Doc" +
      this.definitionFileName
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

  private _generatedFilePath?: string;
  public get generatedFilePath() {
    if (this._generatedFilePath !== undefined) {
      return this._generatedFilePath;
    }

    this._generatedFilePath = `src/pages/docs/generated/${this.generatedComponentName}.generated.tsx`;
    return this._generatedFilePath;
  }
}

export class DocNode {
  public parent: DocNode | undefined;
  public children: Map<string, DocNode> = new Map();

  constructor(
    public readonly key: string,
    public data: DocData | undefined = undefined
  ) {}

  public setParent(node: DocNode) {
    this.parent = node;
  }

  public setData(data: DocData) {
    this.data = data;
  }

  private _shortTitle?: string;
  public get shortTitle() {
    if (this._shortTitle) {
      return this._shortTitle;
    }

    this._shortTitle = this.key
      .split("-")
      .map((str) => str[0].toUpperCase() + str.substring(1))
      .join(" ");

    return this._shortTitle;
  }
}

export class Docs {
  public list: DocNode[];
  public tree: DocNode;

  private _dataList?: DocData[];
  public get dataList() {
    if (this._dataList !== undefined) {
      return this._dataList;
    }

    this._dataList = this.list
      .map((node) => node.data)
      .filter((data) => data !== undefined) as DocData[];
    return this._dataList;
  }

  public static getTreePath(data: DocData): string[] {
    return data.route.substring(1).split("/").slice(1);
  }

  constructor(rootData: DocData) {
    const node = new DocNode("docs", rootData);
    this.tree = node;
    this.list = [node];
  }

  public addDoc(data: DocData) {
    this.addDocDataToTree(this.tree, data, Docs.getTreePath(data));
  }

  private addDocDataToTree(
    tree: DocNode,
    data: DocData,
    remainingPath: string[]
  ) {
    if (remainingPath.length === 1) {
      this.addDocDataAtKey(tree, data, remainingPath[0]);
      return;
    }

    const subtree = this.getOrInsertDocNodeAtKey(tree, remainingPath[0]);
    this.addDocDataToTree(subtree, data, remainingPath.slice(1));
  }

  private addDocDataAtKey(tree: DocNode, data: DocData, key: string) {
    const node = this.getOrInsertDocNodeAtKey(tree, key);
    node.data = data;
  }

  private getOrInsertDocNodeAtKey(tree: DocNode, key: string) {
    const node = tree.children.get(key);
    if (node) {
      return node;
    } else {
      const newNode = new DocNode(key);
      newNode.setParent(tree);
      tree.children.set(key, newNode);
      this.list.push(newNode);
      return newNode;
    }
  }

  public printTree(tree = this.tree, indentation = 0) {
    console.log(indent(indentation) + tree.key);
    tree.children.forEach((subtree) =>
      this.printTree(subtree, indentation + 1)
    );
  }
}

function indent(n: number) {
  let s = "";
  for (let i = 0; i < n; i++) {
    s += "  ";
  }
  return s;
}
