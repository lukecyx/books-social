# Architecture Overview

This document explains how the various pieces of the Books Social application are structured and work together, starting from the root layout and flowing through the provider hierarchy.

## Root Layout (`src/app/layout.tsx`)

The root layout is the entry point for all pages in the Next.js application. It sets up a provider hierarchy that wraps all child components:

```tsx
<StyledComponentsRegistry>
  <ThemeWrapper>
    <ApolloWrapper>
      <SessionWrapper>
        {children}
      </SessionWrapper>
    </ApolloWrapper>
  </ThemeWrapper>
</StyledComponentsRegistry>
```

### Provider Hierarchy (Outer to Inner)

1. **StyledComponentsRegistry** - Handles server-side rendering for styled-components
2. **ThemeWrapper** - Provides theme context and global styles
3. **ApolloWrapper** - Provides GraphQL client context
4. **SessionWrapper** - Provides NextAuth session context

---

## 1. Styled Components Registry (`src/lib/StyledComponentRegistry.tsx`)

**Purpose**: Enables server-side rendering (SSR) for styled-components in Next.js.

**How it works**:
- Uses `ServerStyleSheet` from styled-components to collect styles during SSR
- `useServerInsertedHTML` hook injects collected styles into the HTML `<head>` before hydration
- On the client side, it simply renders children without the style sheet manager
- This prevents styled-components from causing hydration mismatches and ensures styles are available on initial render

**Key Features**:
- Lazy initialization of the style sheet to avoid unnecessary re-renders
- Clears tags after extraction to prevent memory leaks
- Only applies `StyleSheetManager` on the server

**Why it's needed**: Next.js uses React Server Components by default, but styled-components requires client-side JavaScript. This registry bridges the gap between server and client rendering.

---

## 2. Theme Wrapper (`src/lib/providers/ThemeWrapper.tsx`)

**Purpose**: Provides theme context throughout the application using styled-components' `ThemeProvider`.

**What it provides**:
- **Theme**: Windows 95-inspired design system (`baseTheme` from `src/styles/theme.ts`)
  - Colors (background, text, borders, primary, disabled states)
  - Typography (font family, font size)
  - Spacing scale
  - Border styles and shadows
  - Button-specific styles
- **Global Styles**: Base styles and font definitions (`GlobalStyles` from `src/styles/GlobalStyles.ts`)
  - Windows95 font loading
  - CSS reset
  - Default body and form element styling

**Theme Access**: Any styled-component can access the theme via props:
```tsx
const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
`;
```

**TypeScript Support**: The theme is typed through `src/styles/styled.d.ts`, which extends styled-components' `DefaultTheme` interface.

---

## 3. Apollo Wrapper (`src/lib/providers/graphql/ApolloProvider.tsx`)

**Purpose**: Provides GraphQL client context using Apollo Client.

**What it provides**:
- **Apollo Client Instance**: Configured to connect to `/api/graphql` endpoint
- **In-Memory Cache**: Stores query results for efficient data fetching
- **GraphQL Queries/Mutations**: Enables components to fetch and mutate data using GraphQL

**Client Configuration** (`src/lib/providers/graphql/apolloClient.ts`):
```tsx
new ApolloClient({
  uri: "/api/graphql",  // Points to Next.js API route
  cache: new InMemoryCache(),
})
```

**Usage in Components**:
```tsx
import { useQuery } from "@apollo/client";

const { data, loading, error } = useQuery(GET_BOOKS_QUERY);
```

**GraphQL Server**: The GraphQL endpoint (`src/app/api/graphql/route.ts`) uses GraphQL Yoga, which handles both GET and POST requests.

---

## 4. Session Wrapper (`src/lib/providers/SessionWrapper.tsx`)

**Purpose**: Provides authentication context using NextAuth.js.

**What it provides**:
- **Session Context**: Access to current user session throughout the app
- **Authentication State**: Components can check if user is authenticated
- **Session Data**: User information and tokens

**Authentication Setup** (`src/app/api/auth/[...nextauth]/route.ts`):
- Uses AWS Cognito as the authentication provider
- Credentials-based authentication (email/password)
- Stores Cognito tokens (access token, ID token, refresh token) in NextAuth session
- Exposes tokens to client-side components via session

**Usage in Components**:
```tsx
import { useSession } from "next-auth/react";

const { data: session, status } = useSession();
```

**Token Management**: Cognito tokens are stored in NextAuth's JWT and exposed in the session object, allowing authenticated GraphQL requests.

---

## Data Flow

### Initial Page Load
1. Next.js renders the root layout on the server
2. `StyledComponentsRegistry` collects styles during SSR
3. Styles are injected into HTML via `useServerInsertedHTML`
4. HTML is sent to the client with all styles embedded
5. React hydrates on the client with matching styles

### Client-Side Navigation
1. Providers maintain their state (theme, Apollo cache, session)
2. Components can access context from any provider
3. Styled-components use theme from `ThemeProvider`
4. GraphQL queries use Apollo Client cache
5. Authentication state persists via NextAuth session

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with provider hierarchy
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global CSS (legacy, minimal)
│   └── api/
│       ├── auth/[...nextauth]/ # NextAuth API route
│       └── graphql/            # GraphQL Yoga endpoint
│
├── lib/
│   ├── StyledComponentRegistry.tsx  # SSR setup for styled-components
│   └── providers/
│       ├── index.ts                 # Exports all providers
│       ├── ThemeWrapper.tsx         # Theme provider
│       ├── SessionWrapper.tsx       # NextAuth provider
│       └── graphql/
│           ├── ApolloProvider.tsx   # Apollo Client provider
│           └── apolloClient.ts     # Apollo Client configuration
│
└── styles/
    ├── theme.ts                # Theme definition
    ├── GlobalStyles.ts         # Global styles component
    └── styled.d.ts            # TypeScript theme types
```

---

## Key Technologies

- **Next.js 15**: React framework with App Router
- **React Server Components**: Server-first rendering strategy
- **Styled Components**: CSS-in-JS with theme support
- **Apollo Client**: GraphQL client for data fetching
- **GraphQL Yoga**: GraphQL server implementation
- **NextAuth.js**: Authentication framework
- **AWS Cognito**: User authentication service
- **TypeScript**: Type safety throughout

---

## Configuration Files

### `next.config.ts`
- Enables styled-components compiler for optimal performance
- Removes unnecessary styled-components runtime

### `.storybook/preview.tsx`
- Mirrors the provider setup for Storybook
- Wraps stories with `ThemeProvider` and `GlobalStyles`
- Ensures components render correctly in Storybook

---

## Best Practices

1. **Provider Order**: Providers are ordered from most foundational (styled-components) to most specific (session). This ensures dependencies are available when needed.

2. **Client Components**: Providers that use hooks or browser APIs are marked with `"use client"` directive, allowing them to use React hooks and access browser APIs.

3. **Theme Typing**: The theme is typed through module augmentation, providing autocomplete and type safety when using theme values.

4. **SSR Compatibility**: All providers are designed to work with Next.js SSR, ensuring styles and data are available on initial render.

---

## Adding New Providers

To add a new provider:

1. Create the provider component in `src/lib/providers/`
2. Mark it as `"use client"` if it uses hooks or browser APIs
3. Export it from `src/lib/providers/index.ts`
4. Add it to the provider hierarchy in `src/app/layout.tsx`
5. Place it in the appropriate position based on dependencies

Example:
```tsx
// src/lib/providers/NewProvider.tsx
"use client";

export function NewProvider({ children }: { children: React.ReactNode }) {
  return <ContextProvider>{children}</ContextProvider>;
}

// src/app/layout.tsx
<StyledComponentsRegistry>
  <ThemeWrapper>
    <NewProvider>  {/* Add here */}
      <ApolloWrapper>
        <SessionWrapper>{children}</SessionWrapper>
      </ApolloWrapper>
    </NewProvider>
  </ThemeWrapper>
</StyledComponentsRegistry>
```

---

This architecture provides a solid foundation for a scalable, type-safe, and maintainable Next.js application with modern tooling and best practices.

