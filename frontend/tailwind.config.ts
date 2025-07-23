// tailwind.config.ts
import { type Config } from "tailwindcss";

const config: Config = {
    darkMode: "class", // important for .dark class toggling
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: "hsl(var(--primary))",
                "primary-foreground": "hsl(var(--primary-foreground))",
                secondary: "hsl(var(--secondary))",
                "secondary-foreground": "hsl(var(--secondary-foreground))",
                muted: "hsl(var(--muted))",
                "muted-foreground": "hsl(var(--muted-foreground))",
                accent: "hsl(var(--accent))",
                "accent-foreground": "hsl(var(--accent-foreground))",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                card: "hsl(var(--card))",
                "card-foreground": "hsl(var(--card-foreground))",
                popover: "hsl(var(--popover))",
                "popover-foreground": "hsl(var(--popover-foreground))",
                destructive: "hsl(var(--destructive))",
                "destructive-foreground": "hsl(var(--destructive-foreground))",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
            },
            variants: {
                dark: '&:is(.dark *)',
                enterprise: '&:is(.enterprise *)',
                ceb: '&:is(.classic-enterprise-blue *)',
                'dark-enterprise': '&:is(.dark.enterprise *)',
                'dark-ceb': '&:is(.dark.classic-enterprise-blue *)'
            }
        },
    },
    plugins: [
    ],
};

export default config;
