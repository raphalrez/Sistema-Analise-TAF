import { ReactNode } from 'react';
import Header from '@/components/common/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
