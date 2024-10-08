export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'SupaBlog',
  description: 'Supabase, Next.js, NextUI and Tailwind CSS Blog',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Notes',
      href: '/notes',
    },
    {
      label: 'Tags',
      href: '/tags',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'Users',
      href: '/user',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    }
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
  ],
  links: {
    github: 'https://github.com/the1-dreamcode/dokichat-cms',
    docs: 'https://nextui.org',
  },
};
