
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

const Contact = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
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

  // Updated placeholder contact info
  const contactInfo = [
    {
      icon: Phone,
      label: t("contact.phone"),
      value: "+49 123 456 789",
      href: "tel:+49123456789",
    },
    {
      icon: Mail,
      label: t("contact.email"),
      value: "example@email.com",
      href: "mailto:example@email.com",
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: "Berlin, Germany",
      href: "https://maps.google.com/?q=Berlin,Germany",
    },
  ];

  // CV Download options
  const downloadFiles = [
    {
      icon: FileText,
      label: t("contact.downloadCV"),
      files: [
        { language: "English", url: "/src/assets/cv/CV_English.pdf" },
        { language: "Deutsch", url: "/src/assets/cv/CV_German.pdf" }
      ]
    },
    {
      icon: FileText,
      label: t("contact.downloadWorkExperience"),
      files: [
        { language: "English", url: "/src/assets/cv/WorkExperience_English.pdf" },
        { language: "Deutsch", url: "/src/assets/cv/WorkExperience_German.pdf" }
      ]
    }
  ];

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="heading-lg mb-4">{t("contact.title")}</h2>
          <p className="paragraph">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden hover-scale transition-all duration-300 border-primary/10">
              <CardHeader className="bg-primary/5 dark:bg-primary/10">
                <CardTitle>{t("contact.getInTouch")}</CardTitle>
                <CardDescription>{t("contact.formInstructions")}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="w-full min-h-[150px]"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
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
                        Contact Me
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
              <CardHeader className="bg-primary/5 dark:bg-primary/10">
                <CardTitle>{t("contact.contactInfo")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-3 rounded-md hover:bg-secondary/50 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
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
              <CardHeader className="bg-primary/5 dark:bg-primary/10">
                <CardTitle>{t("contact.downloadFiles")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
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
                          className="w-full justify-start"
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
