"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const openings = [
  {
    title: "Senior Perfumer",
    department: "Product Development",
    location: "Grasse, France",
    type: "Full-time",
  },
  {
    title: "E-Commerce Manager",
    department: "Digital",
    location: "Paris, France (Hybrid)",
    type: "Full-time",
  },
  {
    title: "Retail Store Manager",
    department: "Retail",
    location: "New York, USA",
    type: "Full-time",
  },
  {
    title: "Brand Marketing Specialist",
    department: "Marketing",
    location: "London, UK",
    type: "Full-time",
  },
];

export default function CareersClient() {
  return (
    <div className="min-h-screen pt-20">
      <main>
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-card">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Join Our Team
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-medium mb-6">
              Careers at Zavira
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We are always looking for passionate individuals to join us in defining the 
              future of luxury fragrance.
            </p>
          </div>
        </section>

        {/* Culture */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
            <h2 className="font-display text-3xl font-medium mb-8">Our Culture</h2>
            <p className="text-muted-foreground leading-relaxed mb-12">
              At Zavira, we foster a culture of creativity, innovation, and inclusivity. 
              We value diverse perspectives and believe that the best ideas come from collaboration. 
              Whether you are a perfumer, a designer, or a data analyst, you will find a supportive 
              environment where your talents can flourish.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border border-border">
                <h3 className="font-display text-lg font-medium mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">Pushing boundaries in scent creation.</p>
              </div>
              <div className="p-6 border border-border">
                <h3 className="font-display text-lg font-medium mb-2">Excellence</h3>
                <p className="text-sm text-muted-foreground">Commitment to the highest quality.</p>
              </div>
              <div className="p-6 border border-border">
                <h3 className="font-display text-lg font-medium mb-2">Growth</h3>
                <p className="text-sm text-muted-foreground">Continuous learning and development.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Openings */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <h2 className="font-display text-3xl font-medium mb-12 text-center">Current Openings</h2>
            
            <div className="grid gap-4">
              {openings.map((job, index) => (
                <div key={index} className="bg-background border border-border p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-primary transition-colors group">
                  <div>
                    <h3 className="font-display text-xl font-medium mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="shrink-0 group-hover:bg-primary group-hover:text-primary-foreground">
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Don't see a role that fits? We are always interested in meeting exceptional talent.
              </p>
              <a href="mailto:careers@zavira.com" className="text-primary hover:text-foreground underline transition-colors">
                Send us your resume
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
