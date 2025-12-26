import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";

/**
 * Careers Page
 * 
 * Lists job openings and company culture information.
 */

// Mock job listings - replace with API response
const jobs = [
  {
    id: 1,
    title: "Senior Perfumer",
    department: "Creation",
    location: "Paris, France",
    type: "Full-time",
  },
  {
    id: 2,
    title: "E-Commerce Manager",
    department: "Digital",
    location: "New York, USA",
    type: "Full-time",
  },
  {
    id: 3,
    title: "Boutique Manager",
    department: "Retail",
    location: "London, UK",
    type: "Full-time",
  },
  {
    id: 4,
    title: "Brand Marketing Specialist",
    department: "Marketing",
    location: "Paris, France",
    type: "Full-time",
  },
  {
    id: 5,
    title: "Quality Assurance Technician",
    department: "Production",
    location: "Grasse, France",
    type: "Full-time",
  },
];

const values = [
  {
    title: "Excellence",
    description: "We pursue perfection in everything we create, never compromising on quality.",
  },
  {
    title: "Creativity",
    description: "Innovation drives us forward. We encourage bold ideas and artistic expression.",
  },
  {
    title: "Integrity",
    description: "We act with honesty and transparency in all our relationships.",
  },
  {
    title: "Sustainability",
    description: "We are committed to protecting our planet for future generations.",
  },
];

const Careers = () => {
  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
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
              Be part of a team that's redefining luxury fragrance. We're looking for 
              passionate individuals who share our commitment to excellence.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-medium mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                These principles guide everything we do and define who we are as a company.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6">
                  <h3 className="font-display text-xl font-medium mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-3xl font-medium mb-8">Why Work With Us</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Competitive Compensation</h3>
                    <p className="text-muted-foreground text-sm">
                      Attractive salary packages with performance bonuses and equity options.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Growth Opportunities</h3>
                    <p className="text-muted-foreground text-sm">
                      Continuous learning programs, mentorship, and clear career progression paths.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Work-Life Balance</h3>
                    <p className="text-muted-foreground text-sm">
                      Flexible working arrangements, generous PTO, and wellness programs.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Product Benefits</h3>
                    <p className="text-muted-foreground text-sm">
                      Generous discounts on all Zavira products and early access to new releases.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Global Culture</h3>
                    <p className="text-muted-foreground text-sm">
                      Work with talented colleagues from around the world in an inclusive environment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl font-medium mb-12 text-center">
              Open Positions
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {jobs.map((job) => (
                <div 
                  key={job.id} 
                  className="bg-card border border-border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-accent/50 transition-colors group"
                >
                  <div>
                    <h3 className="font-display text-lg font-medium mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 self-start md:self-center">
                    View Details
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>

            {/* No Jobs Message */}
            {jobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No open positions at the moment. Check back soon!
                </p>
                <Button variant="outline">Submit General Application</Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
            <h2 className="font-display text-3xl font-medium mb-4">
              Don't See the Right Role?
            </h2>
            <p className="text-muted-foreground mb-8">
              We're always looking for exceptional talent. Send us your resume and we'll 
              keep you in mind for future opportunities.
            </p>
            <Button variant="luxury" size="lg">
              Submit Your Resume
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
