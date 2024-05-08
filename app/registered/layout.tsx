"use client"
import Content from '@/components/layoutleft/Content';
import * as React from 'react';

export const ProviderLayout = React.createContext(null);

export default function registeredLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <React.Fragment>
      <div style={{ marginTop: "1rem", marginBottom: "25rem" }}>
        <Content children={children} />
      </div>
    </React.Fragment>
  );
}
