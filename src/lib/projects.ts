import { ProjectProps } from "@/types";

export default [
  {
    name: "Project 1",
    image: "/images/projects/project-placeholder.jpg",
    description:
      "This project allows your customers to blah blah. Take your e-com site to the next level.",
    link: {
      external: false,
      url: "/",
    },
    tools: [
      {
        title: "NextJS",
        image: "/images/logos/nextjs-logo.svg",
        url: "https://nextjs.org/",
      },
      {
        title: "TailwindCSS",
        image: "/images/logos/tailwindcss-mark.svg",
        url: "https://tailwindcss.com/",
      },
      {
        title: "MongoDB",
        image: "/images/logos/mongodb/MongoDB_Logomark_SpringGreen.svg",
        url: "https://www.mongodb.com/",
      },
    ],
  },
] as ProjectProps[];
