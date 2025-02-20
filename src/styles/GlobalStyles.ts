import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* CSS Custom Properties (Variables) */
  :root {
    --color-grey-0: #18212f;
    --color-grey-50: #111827;
    --color-grey-100: #1f2937;
    --color-grey-200: #374151;
    --color-grey-300: #4b5563;
    --color-grey-400: #6b7280;
    --color-grey-500: #9ca3af;
    --color-grey-600: #d1d5db;
    --color-grey-700: #e5e7eb;
    --color-grey-800: #f3f4f6;
    --color-grey-900: #f9fafb;

    --color-blue-100: #075985;
    --color-blue-700: #e0f2fe;
    --color-green-100: #166534;
    --color-green-700: #dcfce7;
    --color-yellow-100: #854d0e;
    --color-yellow-700: #fef9c3;
    --color-silver-100: #374151;
    --color-silver-700: #f3f4f6;
    --color-indigo-100: #3730a3;
    --color-indigo-700: #e0e7ff;

    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --backdrop-color: rgba(0, 0, 0, 0.3);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

    --image-grayscale: 10%;
    --image-opacity: 90%;
  }

  /* Reset CSS */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Extension-wide styles */
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: var(--color-grey-700);
    background-color: var(--color-grey-50);
  }

  /* Button styles using variables */
  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    
    &:focus {
      outline: 2px solid var(--color-blue-700);
      outline-offset: 2px;
    }
  }

  /* For popup specific styles */
  body.popup {
    width: 320px;
    height: 400px;
    overflow-x: hidden;
  }

  /* For options page specific styles */
  body.options {
    padding: 20px;
  }

  /* For content script specific styles */
  .my-extension-content {
    all: initial;
    * {
      all: unset;
    }
  }
`;

// Updated theme configuration
export const theme = {
  colors: {
    grey: {
      0: "var(--color-grey-0)",
      50: "var(--color-grey-50)",
      100: "var(--color-grey-100)",
      200: "var(--color-grey-200)",
      300: "var(--color-grey-300)",
      400: "var(--color-grey-400)",
      500: "var(--color-grey-500)",
      600: "var(--color-grey-600)",
      700: "var(--color-grey-700)",
      800: "var(--color-grey-800)",
      900: "var(--color-grey-900)",
    },
    blue: {
      100: "var(--color-blue-100)",
      700: "var(--color-blue-700)",
    },
    green: {
      100: "var(--color-green-100)",
      700: "var(--color-green-700)",
    },
    yellow: {
      100: "var(--color-yellow-100)",
      700: "var(--color-yellow-700)",
    },
    silver: {
      100: "var(--color-silver-100)",
      700: "var(--color-silver-700)",
    },
    indigo: {
      100: "var(--color-indigo-100)",
      700: "var(--color-indigo-700)",
    },
    red: {
      100: "var(--color-red-100)",
      700: "var(--color-red-700)",
      800: "var(--color-red-800)",
    },
  },
  shadows: {
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
  },
  images: {
    grayscale: "var(--image-grayscale)",
    opacity: "var(--image-opacity)",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  breakpoints: {
    mobile: "320px",
    tablet: "768px",
    desktop: "1024px",
  },
};

// Type definitions for the theme
export type Theme = typeof theme;
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
