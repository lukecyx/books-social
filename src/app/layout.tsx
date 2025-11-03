import { ApolloWrapper, SessionWrapper, ThemeWrapper } from "@/lib/providers";
import StyledComponentsRegistry from "@/lib/StyledComponentRegistry";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Styled Components SSR",
  description: "Next.js + Styled Components + SSR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeWrapper>
            <ApolloWrapper>
              <SessionWrapper>{children}</SessionWrapper>
            </ApolloWrapper>
          </ThemeWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
