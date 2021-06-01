export class Element {
  tagName: string;
  innerHTML: Array<string | Element> = [];
  attributes: any = {};
  constructor(tagName: string) {
    this.tagName = tagName;
  }
  setAttribute(name: string, data: string) {
    this.attributes[name] = data;
  }
  getAttribute(name: string) {
    return this.attributes[name];
  }
  appendChild(element: Element | string) {
    this.innerHTML.push(element);
  }
}

export function render(element: Element): string {
  const inner = element.innerHTML;
  let hold = "";
  if (inner != []) {
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
  return `<${element.tagName}${attribs}>${hold}</${element.tagName}>`;
}

export function getElementById(element: any, id: string): Element {
  if (element.attributes.id === id) {
    return element;
  } else {
    const inner = element.innerHTML;
    let out;
    inner.forEach((newElement: any) => {
      console.log("here");
      out = getElementById(newElement, id);
    });
    return out;
  }
}
