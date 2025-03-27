
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
import { usePersonalInfo } from "@/hooks/use-supabase-data";

const Contact = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { data: personalInfo, isLoading } = usePersonalInfo();
  
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
        title: language === 'en' ? "Error" : "Fehler",
        description: language === 'en' ? "Please fill in all fields" : "Bitte füllen Sie alle Felder aus",
        variant: "destructive",
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: language === 'en' ? "Error" : "Fehler",
        description: language === 'en' ? "Please enter a valid email address" : "Bitte geben Sie eine gültige E-Mail-Adresse ein",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: language === 'en' ? "Success" : "Erfolg",
        description: language === 'en' 
          ? "Your message has been sent! I'll get back to you soon." 
          : "Ihre Nachricht wurde gesendet! Ich werde mich in Kürze bei Ihnen melden.",
      });
      
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  // Contact info
  const contactInfo = [
    {
      icon: Phone,
      label: t("contact.phone"),
      value: personalInfo?.phone || "+49 123 456 789",
      href: `tel:${personalInfo?.phone || "+49123456789"}`,
    },
    {
      icon: Mail,
      label: t("contact.email"),
      value: personalInfo?.email || "contact@example.com",
      href: `mailto:${personalInfo?.email || "contact@example.com"}`,
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: personalInfo?.current_location || "Berlin, Germany",
      href: `https://maps.google.com/?q=${personalInfo?.current_location || "Berlin,Germany"}`,
    },
  ];

  // CV Download options
  const downloadFiles = [
    {
      icon: FileText,
      label: language === 'en' ? "Download CV" : "Lebenslauf herunterladen",
      files: [
        { language: "English", url: personalInfo?.cv_en || "/src/assets/cv/CV_English.pdf" },
        { language: "Deutsch", url: personalInfo?.cv_de || "/src/assets/cv/CV_German.pdf" }
      ]
    },
    {
      icon: FileText,
      label: language === 'en' ? "Download Work Experience" : "Arbeitserfahrung herunterladen",
      files: [
        { language: "English", url: personalInfo?.work_experience_en || "/src/assets/cv/WorkExperience_English.pdf" },
        { language: "Deutsch", url: personalInfo?.work_experience_de || "/src/assets/cv/WorkExperience_German.pdf" }
      ]
    }
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
                <CardTitle className="text-xl">
                  {language === 'en' ? "Get In Touch" : "Kontakt aufnehmen"}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? "Fill out the form below and I'll get back to you as soon as possible." 
                    : "Füllen Sie das untenstehende Formular aus und ich werde mich so schnell wie möglich bei Ihnen melden."}
                </CardDescription>
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
                      placeholder={language === 'en' ? "John Doe" : "Max Mustermann"}
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
                      placeholder={language === 'en' ? "john@example.com" : "max@beispiel.de"}
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
                      placeholder={language === 'en' ? "Your message..." : "Ihre Nachricht..."}
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
                        {language === 'en' ? "Sending..." : "Wird gesendet..."}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        {language === 'en' ? "Send Message" : "Nachricht senden"}
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
                <CardTitle className="text-xl">
                  {language === 'en' ? "Contact Information" : "Kontaktinformationen"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                {contactInfo.map((item, index) => (
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
                ))}
              </CardContent>
            </Card>

            {/* Download section */}
            <Card className="overflow-hidden border-primary/10 transition-all duration-300 download-files-section">
              <CardHeader className="bg-primary/5 dark:bg-primary/10 py-4 px-4 sm:px-6">
                <CardTitle className="text-xl">
                  {language === 'en' ? "Download Files" : "Dateien herunterladen"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6">
                {downloadFiles.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold">{item.label}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {item.files.map((file, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full justify-start mobile-touch-target"
                        >
                          <a href={file.url} download>
                            <Download className="mr-2 h-3 w-3" />
                            {file.language}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
