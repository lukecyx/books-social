"use client";

import { ReactNode } from "react";

import { SessionProvider } from "next-auth/react";

export type SessionWrapperProps = {
  children: ReactNode;
};

export function SessionWrapper(props: SessionWrapperProps) {
  return <SessionProvider>{props.children}</SessionProvider>;
}
