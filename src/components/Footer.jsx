'use client'
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const paths = ["/", "/courses"];
  if (paths.includes(pathname)) {
    return (
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content font-semibold p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            NextLearn
          </p>
        </aside>
      </footer>
    );
  }
  else{
    return null
  }
};

export default Footer;
