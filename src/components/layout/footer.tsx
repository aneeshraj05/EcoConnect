import Link from "next/link";
import { Icons } from "../icons";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold flex items-center">
              <Icons.logo className="h-5 w-5 mr-2 text-primary"/>
              EcoConnect
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your travel companion for Kanyakumari.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/explore" className="text-muted-foreground hover:text-primary">
                  Attractions
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-muted-foreground hover:text-primary">
                  Local Experiences
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-muted-foreground hover:text-primary">
                  Stays
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">About</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex mt-4 space-x-4">
              {/* Add social icons here */}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} EcoConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
