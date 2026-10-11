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
  bio: "<p>I'm a passionate Front-End Developer with over 7 years of commercial experience. My journey began with a self-funded coding fundamentals course, followed by continuous self-directed learning and hands-on experience in professional environments.</p><p>Having worked both within a digital creative agency and independently as a freelancer, I've developed a passion for building responsive, interactive and visually engaging websites that bring creative ideas to life.</p><p>For me, development is about more than just writing code. It's about creativity, problem-solving and creating digital experiences that people genuinely enjoy using. I'm always looking to build on my skills, explore new technologies and find better ways to bring ideas to the web.</p>",
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
    image: "/projects/kda.png",
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
    image: "/projects/jst.png",
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
    image: "/projects/fr.png",
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
    image: "/projects/dooh.png",
    imageAlt: "Home page of Project two",
    tags: ["PHP", "JavaScript", "WordPress"],
    color:"#00a7c1",
    textColor:"#ffffff"
  },
  {
    title: "A Co-Operative approach",
    role: "Front-end development",
    description: "One sentence on what the site is and what you did.",
    image: "/projects/cooperative.png",
    imageAlt: "Home page of Project two",
    tags: ["PHP", "JavaScript", "WordPress"],
    color:"#f4d8e7",
    textColor:"#000000"
  },
];
