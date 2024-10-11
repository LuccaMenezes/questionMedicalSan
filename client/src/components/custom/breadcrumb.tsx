import React from "react";
import { Link, useParams } from 'react-router-dom'
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@radix-ui/react-icons";

type BreadCrumbType = {
  title: string;
  link: string;
};

type BreadCrumbPropsType = {
  items: BreadCrumbType[];
};

export default function BreadCrumb({ items }: BreadCrumbPropsType) {
  return (
    <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        to={'/primeiraPergunta'}
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      >
        Avaliação
      </Link>
      {items?.map((item: BreadCrumbType, index: number) => (
        <React.Fragment key={item.title}>
          <ChevronRightIcon className="h-4 w-4" />
          <Link
            to={item.link}
            className={cn(
              "font-medium",
              index === items.length - 1
                ? "text-foreground pointer-events-none"
                : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
