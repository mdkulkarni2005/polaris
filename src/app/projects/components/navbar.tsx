import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700']
})

export const Navbar = ({ projectId }: { projectId: Id<"projects"> }) => {
  return (
    <nav className="flex justify-between items-center gap-x-2 p-2 bg-sidebar border-b">
      <div className="flex items-center gap-x-2">
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink className="flex items-center gap-1.5" asChild>                    
                    <Button variant="ghost" className="w-fit! p-1.5! h-7!" asChild>
                        <Link href="/">
                            <Image src="/logo.svg" alt="logo" width={30} height={20} />
                            <span className={cn(
                                "text-sm font-medium"
                            )}>
                                Polaris
                            </span>
                        </Link>
                    </Button>
                </BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </nav>
  );
};
