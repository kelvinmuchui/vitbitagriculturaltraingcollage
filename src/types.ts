export interface Course {
  id: string;
  title: string;
  category: 'diploma' | 'certificate' | 'short' | 'professional';
  duration: string;
  level: string;
  certification: string;
  description: string;
  syllabus: string[];
  image: string;
  fees: {
    tuition: number;
    labFee: number;
    deposit: number;
  };
  schedule: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  year: string;
}

export interface EnrollmentStep {
  id?: string;
  number: string;
  title: string;
  description: string;
  details: string;
}
