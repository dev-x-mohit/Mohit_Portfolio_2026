export interface Theme {
    id: string;
    name: string;
    type: 'dark' | 'light';
    colors: {
        bgMain: string;       // App background (outside IDE)
        bgActivityBar: string;// Far left narrow strip
        bgSidebar: string;    // Explorer panel
        bgWorkspace: string;  // Main editor area
        bgPanel: string;      // Bottom panel / Headers
        fgPrimary: string;    // Main text
        fgSecondary: string;  // Muted text
        focusRing: string;
        border: string;
        accent: string;
        selection: string;
        lineHighlight: string;
    };
}

export const themes: Theme[] = [
    {
        id: 'midnight',
        name: 'Midnight Pro',
        type: 'dark',
        colors: {
            bgMain: '#000000',
            bgActivityBar: '#18181b', // zinc-900
            bgSidebar: '#09090b',     // zinc-950
            bgWorkspace: '#000000',
            bgPanel: '#18181b',
            fgPrimary: '#e4e4e7',     // zinc-200
            fgSecondary: '#71717a',   // zinc-500
            focusRing: '#3f3f46',
            border: '#27272a',        // zinc-800
            accent: '#3b82f6',        // blue-500
            selection: '#1e293b',
            lineHighlight: '#1f1f22',
        }
    },
    {
        id: 'dracula',
        name: 'Vampire',
        type: 'dark',
        colors: {
            bgMain: '#282a36',
            bgActivityBar: '#282a36',
            bgSidebar: '#21222c',
            bgWorkspace: '#282a36',
            bgPanel: '#44475a',
            fgPrimary: '#f8f8f2',
            fgSecondary: '#6272a4',
            focusRing: '#bd93f9',
            border: '#44475a',
            accent: '#ff79c6',
            selection: '#44475a',
            lineHighlight: '#44475a',
        }
    },
    {
        id: 'monokai',
        name: 'Monokai Vivid',
        type: 'dark',
        colors: {
            bgMain: '#272822',
            bgActivityBar: '#272822',
            bgSidebar: '#1e1f1c',
            bgWorkspace: '#272822',
            bgPanel: '#3e3d32',
            fgPrimary: '#f8f8f2',
            fgSecondary: '#75715e',
            focusRing: '#a6e22e',
            border: '#75715e',
            accent: '#a6e22e',
            selection: '#49483e',
            lineHighlight: '#3e3d32',
        }
    },
    {
        id: 'github-light',
        name: 'Polar Day',
        type: 'light',
        colors: {
            bgMain: '#ffffff',
            bgActivityBar: '#f5f5f5',
            bgSidebar: '#f8f9fa',
            bgWorkspace: '#ffffff',
            bgPanel: '#f0f0f0',
            fgPrimary: '#24292e',
            fgSecondary: '#586069',
            focusRing: '#2188ff',
            border: '#e1e4e8',
            accent: '#0366d6',
            selection: '#c8c8fa',
            lineHighlight: '#f6f8fa',
        }
    },
    // New High Contrast Types
    {
        id: 'hc-dark',
        name: 'High Contrast Dark',
        type: 'dark',
        colors: {
            bgMain: '#000000',
            bgActivityBar: '#000000',
            bgSidebar: '#000000',
            bgWorkspace: '#000000',
            bgPanel: '#000000',
            fgPrimary: '#FFFFFF',
            fgSecondary: '#FFFFFF',
            focusRing: '#F38518',
            border: '#6FC3DF', // Stark border
            accent: '#F38518', // Orange
            selection: '#0043aa', // Dark blue selection
            lineHighlight: '#FFFFFF22',
        }
    },
    {
        id: 'tech-neon',
        name: 'Cyber High Contrast',
        type: 'dark',
        colors: {
            bgMain: '#03001C',
            bgActivityBar: '#010008',
            bgSidebar: '#020010',
            bgWorkspace: '#03001C',
            bgPanel: '#080020',
            fgPrimary: '#00FF9C', // Neon Green Text
            fgSecondary: '#B6FFFA',
            focusRing: '#FFF01F',
            border: '#5B8FB9',
            accent: '#FF00E6', // Neon Pink
            selection: '#301E67',
            lineHighlight: '#100030',
        }
    },
    {
        id: 'matrix',
        name: 'The Matrix',
        type: 'dark',
        colors: {
            bgMain: '#000000',
            bgActivityBar: '#020202',
            bgSidebar: '#000000',
            bgWorkspace: '#0D0208',
            bgPanel: '#001100',
            fgPrimary: '#00FF00', // Matrix Green
            fgSecondary: '#008F11',
            focusRing: '#00FF41',
            border: '#003B00',
            accent: '#00FF41',
            selection: '#003300',
            lineHighlight: '#001100',
        }
    },
    {
        id: 'synthwave',
        name: 'Synthwave \'84',
        type: 'dark',
        colors: {
            bgMain: '#262335',
            bgActivityBar: '#262335',
            bgSidebar: '#241b2f',
            bgWorkspace: '#262335',
            bgPanel: '#2a2139',
            fgPrimary: '#ff7edb', // Pink
            fgSecondary: '#bbbbb9',
            focusRing: '#36f9f6',
            border: '#495495',
            accent: '#f97e72', // Orange/Red
            selection: '#3d344f',
            lineHighlight: '#2a2139',
        }
    },
    {
        id: 'nord',
        name: 'Nordic Frost',
        type: 'dark',
        colors: {
            bgMain: '#2e3440',
            bgActivityBar: '#2e3440',
            bgSidebar: '#3b4252',
            bgWorkspace: '#2e3440',
            bgPanel: '#3b4252',
            fgPrimary: '#d8dee9',
            fgSecondary: '#81a1c1',
            focusRing: '#88c0d0',
            border: '#434c5e',
            accent: '#88c0d0', // Cyan
            selection: '#434c5e',
            lineHighlight: '#3b4252',
        }
    }
];
