interface Attributes {
  [Name: string]: String;
}

export class Element {
  selfClosing: boolean = false;
  parent: Element | Document;
  tagName: string;
  innerHTML: Array<string | Element> = [];
  attributes: Attributes = {};
  /**
   *
   * @param tagName Name of the html tag
   * @param parent Optional, instance of the html element to be appended to
   *
   * We recommend using parent in the constructor instead of manually calling appendChild because
   * getElementById does not work if the id is set before the element is appended to an element on a document
   */
  constructor(tagName: string, parent?: Element) {
    this.tagName = tagName;
    if (parent) {
      parent.appendChild(this);
    }
  }
  setAttribute(name: string, data: string) {
    this.attributes[name] = data;
    // To chain setting
    return this;
  }
  getAttribute(name: string) {
    return this.attributes[name];
  }
  appendChild(element: Element | string) {
    this.innerHTML.push(element);
    if (element instanceof Element) {
      element.parent = this;
    }
  }

  isSelfClosing() {
    this.selfClosing = true;
    return this;
  }

  /**
   * !!! NOTE !!!
   *
   * WE HAVE A SEPARATE SETID FUNCTION TO MAKE IT EASY TO HANDLE IDS
   * BUT BECAUSE OF HOW WE HANDLE IDS, YOU HAVE TO ADD THE ELEMENT TO THE DOCUMENT BEFORE GIVING IT AN ID THROUGH THIS METHOD
   * THIS METHOD IS ONLY FOR GRABING ELMENTS BY ID IN NODE, THE NORMAL setAttribute FUNCTION WILL WORK IF YOU ONLY NEED TO
   * GRABBYID CLIENTSIDE
   */
  setId(id: string) {
    this.setAttribute("id", id);

    let ele: Element | Document = <Element>this;
    while (ele.parent instanceof Element) {
      ele = ele.parent;
    }
    const doc: Document = ele.parent;
    if (doc !== undefined) {
      doc.ids[id] = this;
    } else {
      console.log("setId Error: document is undefined");
    }
  }
}

export function render(element: Element): string {
  const inner = element.innerHTML;
  let hold = "";
  if (inner != [] || element.selfClosing) {
    inner.forEach((element) => {
      if (typeof element === "string") {
        hold += element;
      } else if (element instanceof Element) {
        hold += render(element);
      }
    });
  }
  let attribs = "";
  for (const key in element.attributes) {
    attribs += ` ${key}="${element.attributes[key]}"`;
  }
  if (element.selfClosing) {
    return `<${element.tagName}${attribs}/>`;
  }
  return `<${element.tagName}${attribs}>${hold}</${element.tagName}>`;
}

export class Document {
  ids: any = {};
  HTML: Element = new Element("html");
  constructor() {
    this.HTML.parent = this;
  }
  getElementById(id: string) {
    return this.ids[id];
  }
}
