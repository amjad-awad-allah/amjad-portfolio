
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, ChevronUp, Code, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const { t, isReady } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const prevScrollY = useRef(0);
  const isMobile = useIsMobile();

  const navItems = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.experience"), href: "#experience" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.languages"), href: "#languages" },
    { name: t("nav.downloads"), href: "#downloads" },
    { name: t("hobbies.title"), href: "#hobbies" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setShowScrollTop(currentScrollY > 500);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      let currentSection = "home";
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop - 100;
          const bottom = top + element.offsetHeight;
          
          if (currentScrollY >= top && currentScrollY < bottom) {
            currentSection = section;
          }
        }
      });
      
      setActiveSection(currentSection);
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navItems]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Don't render navigation until language is ready
  if (!isReady) {
    return null;
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-800/50"
            : "py-5 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <a href="#home" className="text-lg font-medium font-display flex items-center gap-2 group">
            <span className="text-primary group-hover:text-primary/80 transition-colors">
              <Code className="h-5 w-5" />
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              Amjad Awad-Allah
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors relative group",
                    activeSection === item.href.substring(1)
                      ? "text-primary"
                      : "hover:text-primary"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transform transition-transform duration-300",
                    activeSection === item.href.substring(1)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}></span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <LanguageToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="ml-1 p-1 h-9 w-9 rounded-md"
            >
              {isMenuOpen ? 
                <X className="h-5 w-5 text-primary" /> : 
                <Menu className="h-5 w-5 text-primary" />
              }
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Improved positioning and scrolling */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-0 top-[61px] bottom-0 z-50 bg-white dark:bg-gray-900 md:hidden overflow-y-auto"
            >
              <motion.div 
                className="flex flex-col items-center py-4 min-h-full"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                  closed: {},
                }}
              >
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "w-full text-center text-lg font-medium py-4 px-6 transition-colors",
                      activeSection === item.href.substring(1)
                        ? "text-primary bg-primary/5"
                        : "hover:text-primary hover:bg-primary/5"
                    )}
                    onClick={closeMenu}
                    variants={{
                      open: { 
                        opacity: 1, 
                        y: 0, 
                        transition: { duration: 0.2 } 
                      },
                      closed: { 
                        opacity: 0, 
                        y: 10, 
                        transition: { duration: 0.1 } 
                      },
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {activeSection === item.href.substring(1) && (
                        <Terminal className="h-4 w-4" />
                      )}
                      {item.name}
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="secondary"
              size="icon"
              className="fixed bottom-6 right-6 z-40 rounded-full shadow-md hover:shadow-lg hover:bg-primary/10"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ChevronUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
