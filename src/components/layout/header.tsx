"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mainNav = [
  { title: "Explore", href: "/explore" },
  { title: "Experiences", href: "/experiences" },
  { title: "Travel Assistance", href: "/travel-assistance" },
  { title: "Trip Planner", href: "/trip-planner" },
];

function UserNavButtons({ handleSignOut }: { handleSignOut: () => Promise<void> }) {
    const { user, isLoading } = useUser();
  
    if (isLoading) {
      return <div className="h-9 w-24 rounded-md animate-pulse bg-muted" />;
    }
  
    if (user) {
      return (
        <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Avatar className="h-9 w-9">
                {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />}
                <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
                <LogOut className="h-5 w-5" />
            </Button>
        </div>
      );
    }
  
    return (
      <div className="flex gap-2">
        <Button variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    );
  }

export default function Header() {
    const { user } = useUser();
    const auth = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        if(auth) {
            await signOut(auth);
            router.push('/');
        }
    };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-6 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold hidden sm:inline-block">
              EcoConnect
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden md:flex">
            <UserNavButtons handleSignOut={handleSignOut} />
          </div>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="px-1 py-6">
                <Link href="/" className="flex items-center space-x-2 mb-8">
                  <Icons.logo className="h-6 w-6 text-primary" />
                  <span className="font-bold">EcoConnect</span>
                </Link>
                <div className="flex flex-col space-y-4">
                  {mainNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  ))}
                   {user && (
                    <Link href="/dashboard" className="text-lg font-medium hover:text-primary">
                        Dashboard
                    </Link>
                   )}
                </div>
                <div className="flex flex-col space-y-2 mt-8">
                {!user ? (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/signup">Sign Up</Link>
                      </Button>
                    </>
                  ) : (
                     <Button variant="outline" onClick={handleSignOut}>
                        Sign Out
                      </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
