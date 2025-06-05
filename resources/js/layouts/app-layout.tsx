import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode, useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import Loader from '@/components/loader';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const removeStart = router.on('start', () => setLoading(true));
    const removeFinish = router.on('finish', () => setLoading(false));

    // Remove os listeners ao desmontar
    return () => {
      removeStart();
      removeFinish();
    };
  }, []);

  return (
    <>
      {loading && <Loader />}
      <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
      </AppLayoutTemplate>
    </>
  );
};
