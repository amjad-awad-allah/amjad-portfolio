import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, User } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { usePersonalInfo } from "@/hooks/use-supabase-data";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const { t } = useLanguage();
  const { data: personalInfo } = usePersonalInfo();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsEmailSent(true);
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
        })
        reset();
      } else {
        const errorData = await response.json();
        setSubmissionError(errorData.message || 'Failed to send email.');
        toast({
          title: "Error!",
          description: submissionError || "Failed to send email.",
        })
      }
    } catch (error: any) {
      setSubmissionError(error.message || 'An unexpected error occurred.');
      toast({
        title: "Error!",
        description: submissionError || "An unexpected error occurred.",
      })
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-secondary/10 dark:bg-secondary/20 relative">
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.02]"></div>

      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-3">{t("contact.title")}</h2>
          <p className="paragraph max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="glass-card p-6 rounded-xl shadow-sm">
            <h3 className="heading-sm mb-4">{t("contact.formTitle")}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={t("contact.name")}
                    className="pl-10"
                    {...register("name", { required: t("contact.nameRequired") })}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder={t("contact.email")}
                    className="pl-10"
                    {...register("email", {
                      required: t("contact.emailRequired"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("contact.emailInvalid"),
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Textarea
                  placeholder={t("contact.message")}
                  className="resize-none"
                  rows={4}
                  {...register("message", { required: t("contact.messageRequired") })}
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("contact.sending") : t("contact.send")}
              </Button>
              {submissionError && (
                <p className="text-sm text-red-500 mt-2">{submissionError}</p>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="glass-card p-6 rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="heading-sm mb-4">{t("contact.infoTitle")}</h3>
              <div className="space-y-3">
                {personalInfo?.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <a href={`mailto:${personalInfo?.email}`} className="hover:underline">
                      {personalInfo?.email}
                    </a>
                  </div>
                )}
                {personalInfo?.phone_number && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <a href={`tel:${personalInfo?.phone_number}`} className="hover:underline">
                      {personalInfo?.phone_number}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
