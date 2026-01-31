import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => {
  return (
    <section className={`mb-10 ${className}`}>
      <h2 className="text-xl font-bold tracking-tight uppercase border-b-2 border-black pb-2 mb-6">
        {title}
      </h2>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
};
