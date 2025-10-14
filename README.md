# E-Commerce Storefront

A modern, full-stack-ready **React + TypeScript** storefront application built for scalability and maintainability. It includes a modular component system, SCSS styling, and environment variable management using both **local `.env` files** and **Infisical** for secure, cloud-stored secrets.

## Features

- **React 18 + TypeScript** — strict typing and component safety
- **SCSS Modules** — locally scoped, themeable styles
- **Modular UI components** — reusable `Button`, `QuantitySelector`, and layout primitives
- **Environment Config with Infisical** — secure, centralized secret management
- **Vite Dev Server** — fast builds and hot module reloading

## Project Structure

```bash
ecommerce-storefront/
│
├── src/
│   ├── components/ # Reusable UI components
│   ├── pages/      # Page-level views
│   ├── hooks/      # Custom React hooks
│   ├── assets/     # Images, fonts, and icons
│   ├── styles/     # Global and SCSS module files
│   └── main.tsx    # App entry point
│
├── .env            # Local development environment variables
├── .env.example    # Example variable names
├── infisical.json  # Optional: Infisical project configuration
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Environment Setup

You can configure environment variables in two ways — locally or via Infisical Cloud Secrets.

### Option 1: Local `.env` File

Copy the example file and add your local keys:

```bash
cp .env.example .env
```

Edit `.env`:

```bash
VITE_SUPABASE_URL=<supabase-url-here>
VITE_SUPABASE_KEY=<supabase-auth-key-here>
SUPABASE_SERVICE_KEY=<supabase-service-key-here>
```

**Note:** Only variables prefixed with `VITE_` are exposed to your frontend when using Vite.

### Option 2: Using Infisical

Infisical allows you to securely store and sync environment variables across devices and environments.

#### 1. Install Infisical CLI

```bash
npm install -g @infisical/cli
```

#### 2. Login and Link Your Project

```bash
infisical login
infisical init
```

This creates an `infisical.json` file in your project root.

#### 3. Pull Environment Variables

For development:

```bash
infisical run --env=dev -- npm run dev
```

For production:

```bash
infisical run --env=prod -- npm run build
```

`infisical run` automatically injects your remote secrets into the runtime environment.

## Development

Run the local dev server:

```bash
npm run dev
```

Lint and format code:

```bash
npm run lint
npm run format
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Common Issues

**1. Missing `.env` variables**  
Ensure `.env` or Infisical keys are available before running `npm run dev`.

**2. TypeScript error for custom components**  
Make sure component prop types extend native HTML attributes, for example:

```ts
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string;
};
```

**3. Styles not applying**  
Check that SCSS modules are imported correctly:

```ts
import styles from "./Button.module.scss";
```

## Tech Stack

- **Front End:** [React](https://react.dev/), [React Router](https://reactrouter.com/), [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [SCSS Modules](https://sass-lang.com/), CSS Variables
- **State Management:** React Context API for cart and UI state
- **API / Backend:** [Supabase](https://supabase.com/) for database and authentication
- **Utilities:** [Faker](https://fakerjs.dev/) for seeding mock data, [clsx](https://github.com/lukeed/clsx) for className management
- **Linting & Formatting:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **CI/CD:** [GitHub Actions](https://github.com/features/actions), [Netlify](https://www.netlify.com/) for hosting
- **Image Handling:** [Unsplash](https://unsplash.com/) or [LoremFlickr](https://loremflickr.com/) for placeholder images

## License

This project is licensed under the **MIT License**.  
Feel free to modify and use it in your own projects.
