import { Element, render, getElementById } from "./index";

const html = new Element("html");
let a = new Element("a");
a.setAttribute("className", "red-box");
a.setAttribute("href", "telci.org");
a.setAttribute("id", "telci.org");
a.appendChild("My personal website");
html.appendChild(a);
console.log(render(html));
console.log(getElementById(html, "telci.org"));
