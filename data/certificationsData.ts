
export interface Certification {
    title: string;
    issuer: string;
    logo: string;
    link: string;
    date?: string;
    credential?: string;
    skills?: string[];
}

export const certifications: Certification[] = [
    {
        title: "Front End Dev Libraries",
        issuer: "freeCodeCamp",
        date: "Jan 2025",
        credential: "Credential ID: fcc7a897077-772b-4e3a-a044-8a180f0554c9-fedl",
        logo: "https://imgs.search.brave.com/KBgDvaVn5oYChY3-996daRis3-8_KBaUxFfKobgnWFg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzM0/bWZ4L3N0eWxlcy9j/b21tdW5pdHlJY29u/X29kYnhvOGxjM3R2/NDEucG5n",
        skills: ["React.js", "Bootstrap", "SASS", "jQuery", "Redux.js"],
        link: "https://www.freecodecamp.org/certification/fcc7a897077-772b-4e3a-a044-8a180f0554c9/front-end-development-libraries",
    },
    {
        title: "CODEMATHON 2024 Participation",
        issuer: "NIT Kurukshetra",
        date: "Oct 2024",
        logo: "https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio_certifications/anant_nit_logo.png",
        skills: ["Mathematics", "Problem Solving", "Mathematical Programming"],
        link: "https://media.licdn.com/dms/image/v2/D4D2DAQETbIWIGtQCuw/profile-treasury-document-cover-images_800/profile-treasury-document-cover-images_800/0/1728309736192?e=1738764000&v=beta&t=zlci709UqDySJK4E26e_4WT5WayLURgbyxtgd5gS9Vw",
    },
    {
        title: "Front End - HTML",
        issuer: "Great Learning",
        date: "Oct 2024",
        logo: "https://cdn.brandfetch.io/idERVXbdy1/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1689351899969",
        skills: ["Programming", "BASIC"],
        link: "https://www.mygreatlearning.com/academy/learn-for-free/courses/front-end-development-html",
    },
    {
        title: "Front End Development - CSS",
        issuer: "Great Learning",
        date: "Oct 2024",
        logo: "https://cdn.brandfetch.io/idERVXbdy1/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1689351899969",
        skills: ["CSS", "Front-End Development"],
        link: "https://olympus.mygreatlearning.com/courses/12800/certificate?pb_id=581",
    },
    {
        title: "HTML Certification Test",
        issuer: "Complete Coding",
        date: "Oct 2024",
        credential: "Credential ID: OFDCU7MU",
        logo: "/images/completecoding.webp",
        skills: ["HTML", "HTML 5"],
        link: "https://learn.completecoding.in/verify-certificate?serialno=OFDCU7MU",
    },
    {
        title: "JS Algorithms & Data Structures",
        issuer: "freeCodeCamp",
        date: "Oct 2024",
        credential: "Credential ID: fcc7a897077-772b-4e3a-a044-8a180f0554c9-jaads",
        logo: "https://imgs.search.brave.com/KBgDvaVn5oYChY3-996daRis3-8_KBaUxFfKobgnWFg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzM0/bWZ4L3N0eWxlcy9j/b21tdW5pdHlJY29u/X29kYnhvOGxjM3R2/NDEucG5n",
        skills: ["JavaScript", "Problem Solving", "Algorithms"],
        link: "https://freecodecamp.org/certification/fcc7a897077-772b-4e3a-a044-8a180f0554c9/javascript-algorithms-and-data-structures-v8",
    },
    {
        title: "ChatGPT 101",
        issuer: "Simplilearn",
        date: "Sep 2024",
        logo: "https://imgs.search.brave.com/PWe-kZCtzbjVa1yAxrT42bazdfEpuaoGH_7CDPDpbo8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2ltcGxpbGVhcm4u/Y29tL2ljZTkvbmV3/X2xvZ28uc3Zneg",
        skills: ["AI", "ChatGPT"],
        link: "https://simpli-web.app.link/e/ViU6fitRFMb",
    },
    {
        title: "Bootstrap in Hindi Course",
        issuer: "Great Learning",
        date: "Sep 2024",
        logo: "https://cdn.brandfetch.io/idERVXbdy1/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1689351899969",
        skills: ["Bootstrap", "Front-End Development"],
        link: "https://www.mygreatlearning.com/certificate/JCKRHUSW",
    },
    {
        title: "Problem Solving (Basics)",
        issuer: "HackerRank",
        date: "Sep 2024",
        logo: "https://imgs.search.brave.com/VXExHDWdtjADNTnAYEBPN_Vco1FU5d_7cANerXpyvu0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Z2V0cm8uY29tL2Nv/bXBhbmllcy8xNWRk/MWY3OS03YjRmLTU2/NzctYjA1Yy0yNjg5/MzgzZDdhM2I.jpeg",
        skills: ["Problem Solving"],
        link: "https://www.hackerrank.com/certificates/89b724a083c0",
    },
    {
        title: "Problem Solving (Intermediate)",
        issuer: "HackerRank",
        date: "Sep 2024",
        logo: "https://imgs.search.brave.com/VXExHDWdtjADNTnAYEBPN_Vco1FU5d_7cANerXpyvu0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Z2V0cm8uY29tL2Nv/bXBhbmllcy8xNWRk/MWY3OS03YjRmLTU2/NzctYjA1Yy0yNjg5/MzgzZDdhM2I.jpeg",
        skills: ["Problem Solving"],
        link: "https://www.hackerrank.com/certificates/d1dc583752ff",
    },
    {
        title: "ChatGPT for Coders",
        issuer: "Great Learning",
        date: "Aug 2024",
        logo: "https://cdn.brandfetch.io/idERVXbdy1/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1689351899969",
        skills: ["ChatGPT", "Coding"],
        link: "https://www.mygreatlearning.com/academy/learn-for-free/courses/chatgpt-for-coders?utm_source_page=public_certificate_view",
    },
    {
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        date: "Aug 2024",
        credential: "Credential ID: fcc7a897077-772b-4e3a-a044-8a180f0554c9-rwd",
        logo: "https://imgs.search.brave.com/KBgDvaVn5oYChY3-996daRis3-8_KBaUxFfKobgnWFg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzM0/bWZ4L3N0eWxlcy9j/b21tdW5pdHlJY29u/X29kYnhvOGxjM3R2/NDEucG5n",
        skills: ["CSS", "HTML", "Responsive Design"],
        link: "https://freecodecamp.org/certification/fcc7a897077-772b-4e3a-a044-8a180f0554c9/responsive-web-design",
    },
    {
        title: "SEO with Squarespace",
        issuer: "Coursera",
        date: "Aug 2024",
        logo: "https://imgs.search.brave.com/zIidzv7haBtO-GZFC4xRDaM4rnTE-HnEa20E7ECL1kM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/Lzk3L0NvdXJzZXJh/LUxvZ29fNjAweDYw/MC5zdmc",
        link: "https://www.coursera.org/account/accomplishments/verify/IO4Q0QVI2L2U",
        skills: ["SEO"],
    },
    {
        title: "UI / UX for Beginners",
        issuer: "Great Learning",
        date: "Jul 2024",
        logo: "https://cdn.brandfetch.io/idERVXbdy1/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1689351899969",
        skills: ["UI Design", "UX Design"],
        link: "https://www.mygreatlearning.com/certificate/LHGXDYNH",
    },
    {
        title: "Responsive AI Certification",
        issuer: "Google",
        date: "Apr 2024",
        credential: "Credential ID: 8789534",
        logo: "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1755835725776",
        skills: ["Responsive AI", "Artificial Intelligence"],
        link: "https://www.cloudskillsboost.google/public_profiles/443bb05a-22d3-4c22-bf89-630a40e0a5a9/badges/8789534",
    },
    {
        title: "Intro to Generative AI",
        issuer: "Google",
        date: "Feb 2024",
        credential: "Credential ID: 8056491",
        logo: "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1755835725776",
        skills: ["Generative AI"],
        link: "https://www.cloudskillsboost.google/public_profiles/443bb05a-22d3-4c22-bf89-630a40e0a5a9/badges/8056491",
    },
    {
        title: "Intro to Large Language Models",
        issuer: "Google",
        date: "Feb 2024",
        credential: "Credential ID: 8056666",
        logo: "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1755835725776",
        skills: ["LLM", "LLMOps"],
        link: "https://www.cloudskillsboost.google/public_profiles/443bb05a-22d3-4c22-bf89-630a40e0a5a9/badges/8056666",
    },
    {
        title: "Intro To Frontend Development",
        issuer: "Simplilearn",
        date: "June 2024",
        logo: "https://imgs.search.brave.com/PWe-kZCtzbjVa1yAxrT42bazdfEpuaoGH_7CDPDpbo8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2ltcGxpbGVhcm4u/Y29tL2ljZTkvbmV3/X2xvZ28uc3Zneg",
        skills: ["Frontend", "Web Design"],
        link: "https://certificates.simplicdn.net/share/thumb_7355776_1725705053",
    }
];
