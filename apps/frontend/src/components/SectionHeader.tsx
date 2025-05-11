import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon, children }) => {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] via-[var(--accent-2)] to-[var(--accent-6)] bg-clip-text text-transparent drop-shadow">{title}</h2>
      </div>
      {subtitle && <p className="text-[#EDEDED]/80">{subtitle}</p>}
      {children}
    </div>
  );
};

export default SectionHeader; 