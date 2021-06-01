import { Element, render } from "./index";
const html = new Element("html");
let div = new Element("div");
div.setAttribute("className", "red");
div.setAttribute("id", "root");
div.appendChild("hello thare");
html.appendChild(div);

let bigNum = 1000;

let ul = new Element("ul");
let li;
for (let i = 0; i < bigNum; i++) {
  li = new Element("li");
  li.setAttribute("href", `randomlink.com/${i}`);
  li.appendChild(`Check out randomsite.com/${i}`);
  if (i === 534) {
    let hiddenBoot = new Element("boot");
    hiddenBoot.setAttribute("id", "boot");
    li.appendChild(hiddenBoot);
  }
  ul.appendChild(li);
}

div.appendChild(ul);

console.log(render(html));
