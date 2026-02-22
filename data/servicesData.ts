
import {
    FaCode,
    FaShieldAlt,
    FaRocket,
    FaMobileAlt,
    FaSearch,
    FaTools,
    FaLayerGroup,
    FaUserCheck,
} from "react-icons/fa";

export interface ServiceQuality {
    title: string;
    icon: any;
    description: string;
}

export const serviceQualities: ServiceQuality[] = [
    {
        title: "Engineering Precision",
        icon: FaCode,
        description:
            "Clean, semantic, and maintainable code architecture. I build systems that are robust, scalable, and a joy to extend.",
    },
    {
        title: "Fortified Security",
        icon: FaShieldAlt,
        description:
            "Security isn't an afterthought. HTTPS, data encryption, and secure authentication are baked into every solution by default.",
    },
    {
        title: "Performance Obsessed",
        icon: FaRocket,
        description:
            "Milliseconds matter. I optimize every asset, script, and query to ensure lightning-fast load times and smooth interactions.",
    },
    {
        title: "Adaptive Design",
        icon: FaMobileAlt,
        description:
            "Fluid layouts that adapt perfectly to any device. From 4k monitors to mobile screens, the experience remains flawless.",
    },
    {
        title: "Search Optimized",
        icon: FaSearch,
        description:
            "Built for visibility. Semantic HTML, proper meta tags, and structured data ensure your content gets found by the right audience.",
    },
    {
        title: "Scalable Infrastructure",
        icon: FaLayerGroup,
        description:
            "Future-proof foundations. I design with growth in mind, ensuring your application handles increased traffic and complexity effortlessly.",
    },
    {
        title: "Automated Reliability",
        icon: FaTools,
        description:
            "CI/CD pipelines, automated testing, and daily backups. I build workflows that guarantee stability and peace of mind.",
    },
    {
        title: "User-Centric Focus",
        icon: FaUserCheck,
        description:
            "Empathy-driven development. I craft intuitive interfaces and seamless flows that convert visitors into loyal users.",
    },
];
