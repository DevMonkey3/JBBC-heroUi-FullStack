import { pageMetadata } from "@/config/seo";
import { servicesPage, serviceDetails } from "@/content/services";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { CtaButton } from "@/components/site/cta-button";
import { ServiceCards } from "@/components/site/services/service-cards";
import { ServiceDetail } from "@/components/site/services/service-detail";
import { IndustryGrid } from "@/components/site/services/industry-grid";

export const metadata = pageMetadata("services");

export default function ServicesPage() {
  return (
    <>
      <Container>
        <PageHeader
          pill={servicesPage.pill}
          title={servicesPage.title}
          crumbs={[{ label: servicesPage.title }]}
        />
      </Container>

      {/* Intro + service cards */}
      <div className="bg-brand-soft/60 py-10 md:py-14">
        <Container>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">{servicesPage.heading}</h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm md:text-base">
              {servicesPage.lead}
            </p>
          </div>
          <ServiceCards />
        </Container>
      </div>

      {/* Detail sections */}
      <Container className="space-y-10 py-12 md:space-y-14 md:py-16">
        {serviceDetails.map((s, i) => (
          <ServiceDetail key={s.id} service={s} index={i} />
        ))}
      </Container>

      {/* Industries */}
      <Container className="pb-12 md:pb-16">
        <IndustryGrid />
      </Container>

      {/* CTA */}
      <div className="bg-brand-dark py-12 text-center text-white md:py-14">
        <Container>
          <h2 className="text-2xl font-bold md:text-3xl">{servicesPage.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">{servicesPage.cta.lead}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaButton href={servicesPage.cta.primary.href} size="lg" arrow={false}>
              {servicesPage.cta.primary.label}
            </CtaButton>
            <CtaButton
              href={servicesPage.cta.secondary.href}
              size="lg"
              variant="outline"
              arrow={false}
            >
              {servicesPage.cta.secondary.label}
            </CtaButton>
          </div>
        </Container>
      </div>
    </>
  );
}
