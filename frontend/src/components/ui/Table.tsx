import { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';

export function Table({ className = '', ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-100 dark:border-dark-border">
      <table className={`w-full text-left border-collapse ${className}`} {...props} />
    </div>
  );
}

export function Thead(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-gray-50 dark:bg-dark-card border-b border-gray-100 dark:border-dark-border" {...props} />;
}

export function Tbody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="bg-white dark:bg-dark-bg divide-y divide-gray-100 dark:divide-dark-border" {...props} />;
}

export function Tr({ className = '', ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={`transition-colors hover:bg-gray-50/50 dark:hover:bg-dark-card/50 ${className}`} {...props} />;
}

export function Th({ className = '', ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={`p-4 text-sm font-bold text-gray-500 dark:text-gray-400 ${className}`} {...props} />;
}

export function Td({ className = '', ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={`p-4 text-sm text-gray-800 dark:text-gray-200 ${className}`} {...props} />;
}
