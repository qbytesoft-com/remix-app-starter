import React, {type ReactNode} from "react";
import AccordionItem from "./AccordionItem";

export const Accordion: React.FC<{ items: { title: string; content: ReactNode }[] }> = ({items}) => (
  <div>
    {items.map((item, index) => (
      <AccordionItem key={index} title={item.title}>
        {item.content}
      </AccordionItem>
    ))}
  </div>
);

export default Accordion;
