"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ImageReveal } from "@/components/animations/ImageReveal";

export function ProjectCard({
  project,
  index,
  className,
  layout = "grid"
}) {
  if (layout === "list") {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "group grid gap-4 border-b border-current/10 py-6 transition-colors md:grid-cols-[7rem_1.2fr_1fr_8rem] md:items-center",
          className
        )}
        data-cursor="hover"
      >
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-square">
          <ImageReveal
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes="120px"
            quality={60}
            className="absolute inset-0 h-full w-full"
            variant="wipe"
            delay={0}
          />
        </div>
        <div>
          <p className="label-caps mb-2">
            {index !== undefined
              ? String(index + 1).padStart(2, "0")
              : project.category}
          </p>
          <h3 className="font-display text-2xl md:text-3xl">{project.title}</h3>
        </div>
        <p className="text-sm text-concrete md:text-base">
          {project.city} · {project.year} · {project.status}
        </p>
        <p className="label-caps text-brick">View</p>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group block", className)}
      data-cursor="hover"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
        <ImageReveal
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 33vw"
          quality={65}
          priority={index !== undefined && index < 2}
          className="absolute inset-0 h-full w-full"
          imageClassName="transition-transform duration-500 group-hover:scale-[1.03]"
          variant="wipe"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="label-caps mb-2 text-concrete">
            {project.category} · {project.city}
          </p>
          <h3 className="font-display text-2xl text-warm-ivory md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-concrete">
            {project.shortDescription}
          </p>
          <p className="label-caps mt-4 text-brick">
            {project.year} · {project.status}
          </p>
        </div>
      </div>
    </Link>
  );
}
