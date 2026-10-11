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
    contact:"#ffffff",
    skills:"#E6F0C3"
  },
  skills: [
  { name: "TypeScript", color: "#d1321a" },
  { name: "JavaScript", color: "#ae5629" },
  { name: "HTML5", color: "#a35f0d" },
  { name: "CSS", color: "#866b18" },
  { name: "SCSS", color: "#76720f" },
  { name: "React", color: "#67761c" },
  { name: "Next.js", color: "#3f3f46" },
  { name: "Gatsby", color: "#507b0a" },
  { name: "Tailwind CSS", color: "#407c16" },
  { name: "Bootstrap", color: "#277f10" },
  { name: "GSAP", color: "#1e801e" },
  { name: "WordPress", color: "#0a7f22" },
  { name: "PHP", color: "#178042" },
  { name: "JSON", color: "#107f54" },
  { name: "Git", color: "#1d7c6b" },
  { name: "GitHub", color: "#52525b" },
  { name: "Vercel", color: "#111827" },
  { name: "CI/CD", color: "#0a7c7f" },
  { name: "Figma", color: "#1a7896" },
  { name: "Adobe XD", color: "#1772ba" },
  { name: "Photoshop", color: "#356bd0" },
  { name: "GitHub Copilot", color: "#425bf0" },
  { name: "SEO", color: "#5b52e0" },
  { name: "Open Graph", color: "#7549e9" },
  { name: "Semantic HTML", color: "#8e4dd5" },
  { name: "Accessibility", color: "#ac1fed" },
  { name: "Responsive Design", color: "#ba24cc" },
  { name: "Cross-browser Testing", color: "#c518b4" },
  { name: "Performance", color: "#c42e96" },
  { name: "Code Reviews", color: "#d41170" },
  { name: "Component Architecture", color: "#d22556" },
  { name: "Time Management", color: "#da1b29" },
  { name: "Claude", color: "#312e81" },
],
};

export const projects: Project[] = [
  {
    title: "KDA Property Solutions",
    url: "https://www.kdaproperty.com/",
    role: "Design and development",
    description: "As a freelance developer, I worked closely with a family-run property solutions company to design and develop a bespoke website tailored to their needs. From establishing the initial requirements through to the final build, the project was shaped by ongoing collaboration, feedback and refinements throughout the development process.",
    image: "/projects/kda.png",
    imageAlt: "Home page of KDA",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    color:"#2f455c",
    textColor:"#ffffff"
  },
  {
    title: "John Schofield Trust",
    url: "https://johnschofieldtrust.org.uk/",
    role: "Front-end development",
    description: "While working at the digital creative agency, I was involved in the development of this website from start to finish, collaborating closely with other team members to bring the client's vision to life. Since its launch, I've continued to support and maintain the website, refining existing components, developing new features to meet evolving requirements and resolving bugs to ensure a smooth user experience.",
    image: "/projects/jst.png",
    imageAlt: "Home page of JOhn Schofield Trust",
    tags: ["PHP", "JavaScript", "WordPress", "SCSS", "CSS"],
    color:"#5c195e",
    textColor:"#ffffff"
  },
  {
    title: "Frank Rose",
    url: "https://www.frankrose.com/",
    role: "Front-end development",
    description: "During my time at a digital creative agency, I was given the task to develop this website from initial build through to launch, working closely with the designer to transform the client's vision into a fully functional and engaging digital experience.",
    image: "/projects/fr.png",
    imageAlt: "Home page of Frank Rose",
    tags: ["PHP", "JavaScript", "WordPress", "SCSS", "CSS"],
    color:"#000000",
    textColor:"#ffffff"
  },
  {
    title: "DOOH",
    url: "https://www.dooh.com/",
    role: "Front-end development",
    description: "During my time at the digital creative agency, I worked closely with the lead developer to build a robust and scalable website using modern technologies, including React, Next.js and GraphQL. This collaborative approach allowed us to create a flexible, maintainable solution tailored to the client's requirements, while delivering a seamless and engaging user experience.",
    image: "/projects/dooh.png",
    imageAlt: "Home page of Project two",
    tags: ["React", "Next.js","PHP", "GSAP", "WordPress"],
    color:"#00a7c1",
    textColor:"#ffffff"
  },
  {
    title: "A Co-Operative approach",
    role: "Front-end development",
    description: "As a freelancer, I collaborated with a former agency to design and develop a single-page informational website for their client. Working closely with both the agency and the client, I helped establish the project scope, provide cost estimates and adapt the requirements to align with the client's budget and launch timeframe.",
    image: "/projects/cooperative.png",
    imageAlt: "Home page of A Co-Operative approach",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    color:"#f4d8e7",
    textColor:"#000000"
  },
];
