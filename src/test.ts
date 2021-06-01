import { connected } from "process";
import { Document, Element, render } from "./index";

const d = new Document();

const html = d.HTML;

let div = new Element("div");
html.appendChild(div);

div.setAttribute("className", "red");
div.setId("root");
div.appendChild("hello thare");
let bigNum = 540;

let ul = new Element("ul", div);
let li;
for (let i = 0; i < bigNum; i++) {
  li = new Element("li", ul);
  li.setAttribute("href", `randomlink.com/${i}`);
  li.appendChild(`Check out randomsite.com/${i}`);
  if (i === 534) {
    let hiddenBoot = new Element("boot", li);
    hiddenBoot.setId("boot");
  }
}

d.getElementById("boot").appendChild("\n\n\nHELLO WORLD \n\n\n");

console.log(d.getElementById("boot"));
console.log(render(html));
