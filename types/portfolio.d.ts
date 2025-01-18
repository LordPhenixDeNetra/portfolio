interface Personal {
    name: string;
    title: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    socials: {
        github: string;
        linkedin: string;
        twitter: string;
        instagram: string;
    };
}

interface Skill {
    category: string;
    icon: string;
    items: string[];
    color: string;
}

interface Project {
    title: string;
    description: string;
    image: string;
    tech: string[];
    category: string;
    color: string;
}

interface PortfolioData {
    personal: Personal;
    skills: Skill[];
    projects: Project[];
}

declare module "*.json" {
    const value: PortfolioData;
    export default value;
}