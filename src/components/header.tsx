import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Header() {
  return (
    <header className="px-3 py-2 border-b-2 shadow-md sticky top-0 z-30 backdrop-blur-md bg-background/80">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-x-8">
          <Link href="/">
            <h2 className="text-2xl font-light">gpburton</h2>
          </Link>
          <div className="flex items-center gap-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<Link href="/projects" />}
                    className={navigationMenuTriggerStyle()}
                  >
                    Projects
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<Link href="/blog" />}
                    className={navigationMenuTriggerStyle()}
                  >
                    Blog
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<Link href="/contact" />}
                    className={navigationMenuTriggerStyle()}
                  >
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
