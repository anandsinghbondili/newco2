// lib/themes.ts
export const themes = [
    {
        name: "light",
        label: "Light",
        activeColor: "hsl(47.9 95.8% 53.1%)",
        cssVars: {
            light: {
                background: "0 0% 100%",
                foreground: "222.2 47.4% 11.2%",
                primary: "221.2 83.2% 53.3%",
                "primary-foreground": "210 40% 98%",
                border: "214.3 31.8% 91.4%",
                input: "214.3 31.8% 91.4%",
            },
        },
    },
    {
        name: "dark",
        label: "Dark",
        activeColor: "hsl(204 100% 40%)",
        cssVars: {
            dark: {
                background: "224 71% 4%",
                foreground: "213 31% 91%",
                primary: "210 40% 98%",
                "primary-foreground": "222.2 47.4% 1.2%",
                border: "216 34% 17%",
                input: "216 34% 17%",
            },
        },
    },
    {
        name: "enterprise",
        label: "Enterprise",
        activeColor: "hsl(221.2 83.2% 53.3%)",
        cssVars: {
            light: {
                background: "0 0% 100%",
                foreground: "222.2 47.4% 11.2%",
                primary: "221.2 83.2% 53.3%",
                "primary-foreground": "210 40% 98%",
                border: "214.3 31.8% 91.4%",
                input: "214.3 31.8% 91.4%",
            },
            dark: {
                background: "222.2 47.4% 11.2%",
                foreground: "210 40% 98%",
                primary: "221.2 83.2% 53.3%",
                "primary-foreground": "222.2 47.4% 1.2%",
                border: "216 34% 17%",
                input: "216 34% 17%",
            },
        },
    },
    {
        name: "classic-enterprise-blue",
        label: "Classic Enterprise Blue",
        activeColor: "#2563EB",
        cssVars: {
            light: {
                background: "0 0% 100%", // #FFFFFF
                foreground: "222.2 47.4% 7.1%", // #111827
                primary: "222 87% 53%", // #2563EB
                "primary-foreground": "210 40% 98%", // #F9FAFB
                secondary: "222 66% 40%", // #1E40AF
                accent: "211 96% 61%", // #3B82F6
                border: "210 20% 96%", // #F9FAFB
                input: "210 20% 96%", // #F9FAFB
                card: "210 20% 96%", // #F9FAFB
                success: "160 84% 39%", // #10B981
                warning: "42 96% 54%", // #F59E0B
                error: "0 84% 60%", // #EF4444
            },
            dark: {
                background: "222.2 47.4% 7.1%", // #111827
                foreground: "0 0% 100%", // #FFFFFF
                primary: "222 87% 53%", // #2563EB
                "primary-foreground": "210 40% 98%", // #F9FAFB
                secondary: "222 66% 40%", // #1E40AF
                accent: "211 96% 61%", // #3B82F6
                border: "222.2 47.4% 11.2%", // #1E293B
                input: "222.2 47.4% 11.2%", // #1E293B
                card: "222.2 47.4% 11.2%", // #1E293B
                success: "160 84% 39%", // #10B981
                warning: "42 96% 54%", // #F59E0B
                error: "0 84% 60%", // #EF4444
            },
        },
    },
    {
        name: "modern-neutral",
        label: "Modern Neutral",
        activeColor: "#4F46E5",
        cssVars: {
            light: {
                background: "220 14% 96%", // #F3F4F6
                foreground: "215 28% 17%", // #1F2937
                primary: "246 84% 59%", // #4F46E5
                "primary-foreground": "0 0% 100%", // #FFFFFF
                secondary: "220 14% 46%", // #6B7280
                accent: "265 84% 58%", // #7C3AED
                border: "220 13% 91%", // #E5E7EB
                input: "220 13% 91%", // #E5E7EB
                card: "0 0% 100%", // #FFFFFF
                success: "158 94% 30%", // #059669
                warning: "35 92% 44%", // #D97706
                error: "0 74% 51%", // #DC2626
            },
            dark: {
                background: "215 28% 17%", // #1F2937
                foreground: "220 13% 91%", // #E5E7EB
                primary: "246 84% 59%", // #4F46E5
                "primary-foreground": "0 0% 100%", // #FFFFFF
                secondary: "220 14% 46%", // #6B7280
                accent: "265 84% 58%", // #7C3AED
                border: "215 28% 17%", // #1F2937
                input: "215 28% 17%", // #1F2937
                card: "215 28% 17%", // #1F2937
                success: "158 94% 30%", // #059669
                warning: "35 92% 44%", // #D97706
                error: "0 74% 51%", // #DC2626
            },
        },
    },
    {
        name: "dark-analytics",
        label: "Dark Analytics",
        activeColor: "#6366F1",
        cssVars: {
            dark: {
                background: "222 47% 11%", // #111827
                foreground: "220 13% 91%", // #E5E7EB
                primary: "239 84% 67%", // #6366F1
                "primary-foreground": "0 0% 100%", // #FFFFFF
                secondary: "234 89% 74%", // #818CF8
                accent: "265 89% 66%", // #8B5CF6
                border: "215 28% 17%", // #1F2937
                input: "215 28% 17%", // #1F2937
                card: "215 28% 17%", // #1F2937
                success: "158 84% 52%", // #34D399
                warning: "43 96% 56%", // #FBBF24
                error: "0 84% 71%", // #F87171
            },
        },
    }
] as const

export type Theme = (typeof themes)[number]