'use client';

import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

interface IProps extends ThemeProviderProps {
  defaultTheme: 'light' | 'dark' | 'system' | undefined; // compatible with Toaster theme prop
}
export function Providers({ children, ...props }: IProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...props}>
        <NextTopLoader color={'hsl(var(--primary))'} height={3} showSpinner={false} />
        {children}
        <Toaster position="top-center" theme={props.defaultTheme} />
      </NextThemesProvider>
    </NextUIProvider>
  );
}