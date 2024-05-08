"use client"
import * as React from 'react';
import Content from '@/components/layoutadmin/Content';

export const ProviderLayout = React.createContext(null);

export default function adminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <React.Fragment>
      <div style={{ marginBottom: "25rem" }}>
        <Content children={children} />
      </div>
    </React.Fragment>
  );
}
