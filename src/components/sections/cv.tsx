import { motion } from "motion/react";
import IconBook4Line from "~icons/mingcute/book-4-line";
import IconBriefcaseLine from "~icons/mingcute/briefcase-line";
import { Section } from "../section";
import { Card, CardDescription, CardTitle } from "../ui/card";

export default function CV() {
  return (
    <Section title="Experience & Education">
      <div className="relative flex flex-col gap-6">
        <div className="pointer-events-none absolute top-0 left-7 h-full w-px bg-gray-background" />
        <TimelineItem
          title="Full-stack Developer"
          subtitle="VALID Digitalagentur GmbH"
          meta="Mar 2023 — Present · Berlin, Germany"
          description="Digital communication agency specializing in customer experience design and development of web applications for clients in energy, finance, healthcare, and public sectors."
          badges={["TypeScript", "React", "Node.js", "PHP", "Docker", "Kubernetes"]}
          type="work"
        />

        <TimelineItem
          title="Full-stack Developer (Intern)"
          subtitle="TrödelSpende"
          meta="Mar 2022 — Jun 2022 · Berlin, Germany"
          description="Second-hand marketplace where items are exchanged for donations to charities."
          badges={["TypeScript", "Next.js", "Java"]}
          type="work"
        />

        <TimelineItem
          title="Bachelor of Applied Computer Science"
          subtitle="HTW Berlin"
          meta="2019 — 2022 · Berlin, Germany"
          type="education"
        />
      </div>
    </Section>
  );
}

interface TimelineItemProps {
  title: string;
  subtitle: string;
  meta: string;
  description?: string;
  badges?: string[];
  type: "work" | "education";
}

function TimelineItem({ title, subtitle, meta, description, badges = [], type }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    >
      <Card className="relative pl-13">
        <div className="absolute top-4.5 left-4.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground ring-4 ring-primary-background">
          {type === "work" ? <IconBriefcaseLine className="h-3 w-3 text-background" /> : <IconBook4Line className="h-3 w-3 text-background" />}
        </div>
        <div className="flex flex-col gap-1">
          <CardTitle>
            {title}
            <span className="text-muted-foreground"> — {subtitle}</span>
          </CardTitle>
          <CardDescription>{meta}</CardDescription>
          {description ? <p className="text-sm">{description}</p> : null}
          {badges.length > 0 ? <TechBadges items={badges} /> : null}
        </div>
      </Card>
    </motion.div>
  );
}

function TechBadges({ items }: { items: string[] }) {
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-2 flex flex-wrap gap-2">
      {items.map((tech) => (
        <motion.div key={tech} variants={item}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary-background bg-secondary-background px-3 py-1.5 font-mono text-secondary-foreground text-xs">
            {tech}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
