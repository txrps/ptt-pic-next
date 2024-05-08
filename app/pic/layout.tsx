"use client"
import * as React from 'react';
import Content from '@/components/layoutleft/Content';

export const ProviderLayout = React.createContext(null);

export default function adminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div style={{ marginBottom: "25rem" }}>
      <Content children={children} />
    </div>
  );
}
