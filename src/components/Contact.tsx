
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { t } = useLanguage();
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

  const contactInfo = [
    {
      icon: Phone,
      label: t("contact.phone"),
      value: "+49 163 90 55 276",
      href: "tel:+491639055276",
    },
    {
      icon: Mail,
      label: t("contact.email"),
      value: "amjad.awadallah93@gmail.com",
      href: "mailto:amjad.awadallah93@gmail.com",
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: "Essen, Germany",
      href: "https://maps.google.com/?q=Essen,Germany",
    },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="heading-lg mb-4">{t("contact.title")}</h2>
          <p className="paragraph">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card p-8">
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
                className="w-full"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin"></div>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    {t("contact.send")}
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col space-y-8">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-8 flex items-start gap-5 hover-scale"
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.label}</h3>
                  <p className="text-muted-foreground">{item.value}</p>
                </div>
              </a>
            ))}
            
            <div className="glass-card p-8 flex-1 flex flex-col justify-center">
              <h3 className="heading-sm mb-4">Let's connect!</h3>
              <p className="paragraph mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <p className="text-sm text-muted-foreground">
                Feel free to reach out through any of the channels above or by filling out the contact form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
