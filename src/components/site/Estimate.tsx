import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { addWebEmail } from "@/lib/leads-store";

export function Estimate() {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [service, setService] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    const form = e.currentTarget;
    const name = (form.querySelector("#name") as HTMLInputElement)?.value || "";
    const phone = (form.querySelector("#phone") as HTMLInputElement)?.value || "";
    const email = (form.querySelector("#email") as HTMLInputElement)?.value || "";
    const msg = (form.querySelector("#msg") as HTMLTextAreaElement)?.value || "";

    try {
      // 1. Save to MongoDB database
      await addWebEmail({
        name,
        phone,
        email,
        service: service || "General Inquiry",
        message: msg,
        source: "Free Estimate Page"
      });

      // 2. Email backup forwarding (background notification)
      fetch("https://formsubmit.co/ajax/allen@upfrontac.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Name: name,
          Phone: phone,
          Email: email,
          "Service Needed": service || "General Inquiry",
          Message: msg
        })
      }).catch((err) => console.log("Background email alert:", err));

      toast.success(t("Thanks! We'll be in touch within 24 hours.", "¡Gracias! Nos pondremos en contacto dentro de las 24 horas."));
      form.reset();
      setService("");
    } catch (err) {
      toast.error(t("Connection error. Please try again.", "Error de conexión. Por favor, inténtelo de nuevo."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">{t("Free Estimate", "Presupuesto Gratis")}</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">
            {t("Get a free, no-pressure quote.", "Obtenga una cotización gratuita y sin compromiso.")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("Tell us about your project and we'll get back within 24 hours with a transparent quote.", "Cuéntenos sobre su proyecto y le responderemos en un plazo de 24 horas con una cotización transparente.")}
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-white p-8 shadow-[var(--shadow-card)]">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t("Full Name", "Nombre Completo")} id="name"><Input id="name" required placeholder={t("Jane Smith", "Juan Pérez")} /></Field>
              <Field label={t("Phone", "Teléfono")} id="phone"><Input id="phone" type="tel" required placeholder="(786) 307-5933" /></Field>
              <div className="sm:col-span-2">
                <Field label={t("Email", "Correo Electrónico")} id="email"><Input id="email" type="email" required placeholder="jane@example.com" /></Field>
              </div>
              <div className="sm:col-span-2">
                <Field label={t("Service Type", "Tipo de Servicio")} id="service">
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger id="service" className="h-11"><SelectValue placeholder={t("Select a service", "Seleccione un servicio")} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">{t("Residential Electrical", "Eléctrico Residencial")}</SelectItem>
                      <SelectItem value="commercial">{t("Commercial Electrical", "Eléctrico Comercial")}</SelectItem>
                      <SelectItem value="industrial">{t("Industrial Electrical", "Eléctrico Industrial")}</SelectItem>
                      <SelectItem value="panel">{t("Panel Upgrade", "Actualización de Panel")}</SelectItem>
                      <SelectItem value="ev">{t("EV Charger", "Cargador EV")}</SelectItem>
                      <SelectItem value="generator">{t("Generator", "Generador")}</SelectItem>
                      <SelectItem value="emergency">{t("Emergency Service", "Servicio de Emergencia")}</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label={t("Message", "Mensaje")} id="msg">
                  <Textarea id="msg" rows={5} placeholder={t("Tell us about your project...", "Cuéntenos sobre su proyecto...")} />
                </Field>
              </div>
            </div>
            <Button type="submit" variant="hero" size="xl" disabled={submitting} className="mt-6 w-full">
              {submitting ? t("Sending...", "Enviando...") : <>{t("Get My Free Estimate", "Obtener Mi Presupuesto Gratis")} <Send className="h-4 w-4" /></>}
            </Button>
          </form>

          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)]">
              <iframe
                title="R&E Electrical Contractor Corp Location"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-80.330%2C25.862%2C-80.318%2C25.872&layer=mapnik&marker=25.8677%2C-80.3243"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard icon={Phone} title={t("Call Us", "Llámenos")} lines={["(786) 307-5933", t("24/7 Emergency", "Emergencia 24/7")]} />
              <InfoCard icon={Mail} title={t("Email", "Correo")} lines={["Williams@electricalcontractorcorp.com"]} />
              <InfoCard icon={MapPin} title={t("Office", "Oficina")} lines={["18730 NW 77 TH CT", "Hialeah, FL 33015"]} />
              <InfoCard icon={Clock} title={t("Hours", "Horarios")} lines={[t("Mon–Sat: 7am–7pm", "Lun–Sáb: 7am–7pm"), t("Sun: Emergency only", "Dom: Solo emergencias")]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-secondary">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, lines }: { icon: React.ElementType; title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="mt-3 font-display text-base font-extrabold text-secondary">{title}</h4>
      {lines.map((l) => (
        <p key={l} className="text-sm text-muted-foreground">{l}</p>
      ))}
    </div>
  );
}
