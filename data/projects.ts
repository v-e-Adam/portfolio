export type Project = {
  title: string;
  url?: string;
  role: string;
  description: string;
  /** Path under /public, e.g. "/projects/my-site.png". Recommended size: 1440x900 */
  image: string;
  /** Describe the screenshot for screen readers */
  imageAlt: string;
  tags?: string[];
  color:string;
  textColor: string;
};

export const profile = {
  name: "Veronie Halpin",
  headline: "Web developer",
  bio: "A short line about what you do and what you're looking for.",
  email: "veronie.adamczyk@icloud.com",
  links: [
    { label: "GitHub", url: "https://github.com/v-e-Adam/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/veronie-adamczyk/" },
  ],
  colors:{
    introText:"",
    intro:"#E4A0F7",
    bioText:"",
    bio:"#79BAEC",
    contactText:"",
    contact:"#ffffff"
  }
};

export const projects: Project[] = [
  {
    title: "KDA Property Solutions",
    url: "https://www.kdaproperty.com/",
    role: "Design and development",
    description: "One sentence on what the site is and what you did.",
    image: "/projects/placeholder.svg",
    imageAlt: "Home page of Project one",
    tags: ["Next.js", "Tailwind", "GSAP"],
    color:"#2f455c",
    textColor:"#ffffff"
  },
  {
    title: "John Schofield Trust",
    url: "https://johnschofieldtrust.org.uk/",
    role: "Front-end development",
    description: "One sentence on what the site is and what you did.",
    image: "/projects/placeholder.svg",
    imageAlt: "Home page of Project two",
    tags: ["PHP", "JavaScript", "WordPress"],
    color:"#5c195e",
    textColor:"#ffffff"
  },
  {
    title: "Frank Rose",
    url: "https://www.frankrose.com/",
    role: "Front-end development",
    description: "One sentence on what the site is and what you did.",
    image: "/projects/placeholder.svg",
    imageAlt: "Home page of Project two",
    tags: ["PHP", "JavaScript", "WordPress"],
    color:"#000000",
    textColor:"#ffffff"
  },
  {
    title: "DOOH",
    url: "https://www.dooh.com/",
    role: "Front-end development",
    description: "One sentence on what the site is and what you did.",
    image: "/projects/placeholder.svg",
    imageAlt: "Home page of Project two",
    tags: ["PHP", "JavaScript", "WordPress"],
    color:"#00a7c1",
    textColor:"#ffffff"
  },
  {
    title: "A Co-Operative approach",
    role: "Front-end development",
    description: "One sentence on what the site is and what you did.",
    image: "/projects/placeholder.svg",
    imageAlt: "Home page of Project two",
    tags: ["PHP", "JavaScript", "WordPress"],
    color:"#f4d8e7",
    textColor:"#000000"
  },
];
