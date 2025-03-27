
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Phone, MapPin, Send, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePersonalInfo } from "@/hooks/usePersonalInfo";
import { Skeleton } from "@/components/ui/skeleton";

const Contact = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { personalInfo, isLoading } = usePersonalInfo();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Your message has been sent! I'll get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  // Contact info from database
  const contactInfo = [
    {
      icon: Phone,
      label: t("contact.phone"),
      value: "+49 123 456 789", // Placeholder - would come from personalInfo in real implementation
      href: "tel:+49123456789",
    },
    {
      icon: Mail,
      label: t("contact.email"),
      value: "example@email.com", // Placeholder - would come from personalInfo in real implementation
      href: "mailto:example@email.com",
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: personalInfo?.current_location || "Berlin, Germany",
      href: `https://maps.google.com/?q=${personalInfo?.current_location || "Berlin,Germany"}`,
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="section-container">
        <div className="max-w-3xl mx-auto mb-10 md:mb-16 text-center">
          <h2 className="heading-lg mb-4">{t("contact.title")}</h2>
          <p className="paragraph">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden hover-scale transition-all duration-300 border-primary/10">
              <CardHeader className="bg-primary/5 dark:bg-primary/10 py-4 px-4 sm:px-6">
                <CardTitle className="text-xl">{t("contact.getInTouch")}</CardTitle>
                <CardDescription>{t("contact.formInstructions")}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t("contact.name")}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t("contact.email")}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t("contact.message")}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      className="w-full min-h-[120px] sm:min-h-[150px]"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size={isMobile ? "default" : "lg"}
                    className="w-full transition-all duration-300 hover:shadow-lg font-medium"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin"></div>
                        {t("contact.sending")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        {t("contact.submit")}
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            {/* Contact details */}
            <Card className="overflow-hidden border-primary/10">
              <CardHeader className="bg-primary/5 dark:bg-primary/10 py-4 px-4 sm:px-6">
                <CardTitle className="text-xl">{t("contact.contactInfo")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                {isLoading ? (
                  // Loading skeletons
                  Array(3).fill(0).map((_, index) => (
                    <div key={index} className="flex items-start gap-3 sm:gap-4 p-2 sm:p-3">
                      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                      <div className="space-y-2 w-full">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  ))
                ) : (
                  contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 sm:gap-4 p-2 sm:p-3 rounded-md hover:bg-secondary/50 transition-colors mobile-touch-target"
                    >
                      <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold">{item.label}</h3>
                        <p className="text-muted-foreground text-sm">{item.value}</p>
                      </div>
                    </a>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Download section */}
            <Card id="downloadFiles" className="overflow-hidden border-primary/10 transition-all duration-300">
              <CardHeader className="bg-primary/5 dark:bg-primary/10 py-4 px-4 sm:px-6">
                <CardTitle className="text-xl">{t("contact.downloadFiles")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6">
                {isLoading ? (
                  // Loading skeletons
                  Array(2).fill(0).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    {/* CV Downloads */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <h3 className="text-sm font-semibold">{t("contact.downloadCV")}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full justify-start mobile-touch-target"
                        >
                          <a href={personalInfo?.cv_en || "#"} download>
                            <Download className="mr-2 h-3 w-3" />
                            English
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full justify-start mobile-touch-target"
                        >
                          <a href={personalInfo?.cv_de || "#"} download>
                            <Download className="mr-2 h-3 w-3" />
                            Deutsch
                          </a>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Work Experience Downloads */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <h3 className="text-sm font-semibold">{t("contact.downloadWorkExperience")}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full justify-start mobile-touch-target"
                        >
                          <a href={personalInfo?.work_experience_en || "#"} download>
                            <Download className="mr-2 h-3 w-3" />
                            English
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full justify-start mobile-touch-target"
                        >
                          <a href={personalInfo?.work_experience_de || "#"} download>
                            <Download className="mr-2 h-3 w-3" />
                            Deutsch
                          </a>
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
