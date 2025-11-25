# Project Context Map for: peak-commerce-app

This file contains the directory structure and the contents of important project files.

---

## 1. Directory Structure

├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── project_mapper.py
├── README.md
├── SETUP_GUIDE.md
├── tsconfig.json
│   ├── **app/**
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── **admin/**
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── **customers/**
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── page.tsx
│   │   │   ├── **orders/**
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── page.tsx
│   │   │   ├── **products/**
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── page.tsx
│   │   ├── **api/**
│   │   │   ├── **checkout/**
│   │   │   │   ├── route.ts
│   │   │   ├── **inventory/**
│   │   │   │   ├── route.ts
│   │   │   ├── **orders/**
│   │   │   │   ├── route.ts
│   │   │   ├── **products/**
│   │   │   │   ├── route.ts
│   │   │   │   ├── **[id]/**
│   │   │   │   │   ├── route.ts
│   │   ├── **cart/**
│   │   │   ├── page.tsx
│   │   ├── **checkout/**
│   │   │   ├── page.tsx
│   │   ├── **products/**
│   │   │   ├── **[id]/**
│   │   │   │   ├── page.tsx
│   │   ├── **shop/**
│   │   │   ├── page.tsx
│   │   ├── **sign-in/**
│   │   │   ├── page.tsx
│   │   ├── **sign-up/**
│   │   │   ├── page.tsx
│   ├── **components/**
│   │   ├── admin-sidebar.tsx
│   │   ├── cta-section.tsx
│   │   ├── featured-products.tsx
│   │   ├── footer.tsx
│   │   ├── hero-section.tsx
│   │   ├── navigation.tsx
│   │   ├── testimonials.tsx
│   │   ├── theme-provider.tsx
│   ├── **lib/**
│   │   ├── api-client.ts
│   │   ├── stripe.ts
│   │   ├── utils.ts
│   ├── **public/**
│   ├── **styles/**
│   │   ├── globals.css

---

## 2. File Contents


### File: `.gitignore`

```text
node_modules

# clerk configuration (can include secrets)
/.clerk/

```

### File: `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}

```

### File: `next-env.d.ts`

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

### File: `next.config.mjs`

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
}

export default nextConfig
```

### File: `package-lock.json`

```json
{
  "name": "my-v0-project",
  "version": "0.1.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "my-v0-project",
      "version": "0.1.0",
      "dependencies": {
        "@clerk/nextjs": "^6.35.5",
        "@hookform/resolvers": "^3.10.0",
        "@radix-ui/react-accordion": "1.2.2",
        "@radix-ui/react-alert-dialog": "1.1.4",
        "@radix-ui/react-aspect-ratio": "1.1.1",
        "@radix-ui/react-avatar": "1.1.2",
        "@radix-ui/react-checkbox": "1.1.3",
        "@radix-ui/react-collapsible": "1.1.2",
        "@radix-ui/react-context-menu": "2.2.4",
        "@radix-ui/react-dialog": "1.1.4",
        "@radix-ui/react-dropdown-menu": "2.1.4",
        "@radix-ui/react-hover-card": "1.1.4",
        "@radix-ui/react-label": "2.1.1",
        "@radix-ui/react-menubar": "1.1.4",
        "@radix-ui/react-navigation-menu": "1.2.3",
        "@radix-ui/react-popover": "1.1.4",
        "@radix-ui/react-progress": "1.1.1",
        "@radix-ui/react-radio-group": "1.2.2",
        "@radix-ui/react-scroll-area": "1.2.2",
        "@radix-ui/react-select": "2.1.4",
        "@radix-ui/react-separator": "1.1.1",
        "@radix-ui/react-slider": "1.2.2",
        "@radix-ui/react-slot": "1.1.1",
        "@radix-ui/react-switch": "1.1.2",
        "@radix-ui/react-tabs": "1.1.2",
        "@radix-ui/react-toast": "1.2.4",
        "@radix-ui/react-toggle": "1.1.1",
        "@radix-ui/react-toggle-group": "1.1.1",
        "@radix-ui/react-tooltip": "1.1.6",
        "@vercel/analytics": "latest",
        "autoprefixer": "^10.4.20",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "cmdk": "1.0.4",
        "date-fns": "4.1.0",
        "embla-carousel-react": "8.5.1",
        "input-otp": "1.4.1",
        "lucide-react": "^0.454.0",
        "next": "16.0.3",
        "next-themes": "^0.4.6",
        "react": "19.2.0",
        "react-day-picker": "9.8.0",
        "react-dom": "19.2.0",
        "react-hook-form": "^7.60.0",
        "react-resizable-panels": "^2.1.7",
        "recharts": "latest",
        "sonner": "^1.7.4",
        "stripe": "latest",
        "tailwind-merge": "^2.5.5",
        "tailwindcss-animate": "^1.0.7",
        "vaul": "^1.1.2",
        "zod": "3.25.76"
      },
      "devDependencies": {
        "@tailwindcss/postcss": "^4.1.9",
        "@types/node": "^22",
        "@types/react": "^19",
        "@types/react-dom": "^19",
        "postcss": "^8.5",
        "tailwindcss": "^4.1.9",
        "tw-animate-css": "1.3.3",
        "typescript": "^5"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@clerk/backend": {
      "version": "2.24.0",
      "resolved": "https://registry.npmjs.org/@clerk/backend/-/backend-2.24.0.tgz",
      "integrity": "sha512-6If+zmUiNEWVt5MoTjCl+0xiAq+uRR5kj+6HBXDG75KwRrG0eW3gH43QntQYBQU/SqhGwY2UbogEplM8ndF7Fg==",
      "license": "MIT",
      "dependencies": {
        "@clerk/shared": "^3.36.0",
        "@clerk/types": "^4.101.3",
        "cookie": "1.0.2",
        "standardwebhooks": "^1.0.0",
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=18.17.0"
      }
    },
    "node_modules/@clerk/clerk-react": {
      "version": "5.57.0",
      "resolved": "https://registry.npmjs.org/@clerk/clerk-react/-/clerk-react-5.57.0.tgz",
      "integrity": "sha512-GCBFF03HjEWvx58myjauJ7NrwTqhxHdetjWWxVM3YJGPOsAVXg4WuquL/hyn8KDuduCYSkRin4Hg6+QVP1NXAg==",
      "license": "MIT",
      "dependencies": {
        "@clerk/shared": "^3.36.0",
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=18.17.0"
      },
      "peerDependencies": {
        "react": "^18.0.0 || ^19.0.0 || ^19.0.0-0",
        "react-dom": "^18.0.0 || ^19.0.0 || ^19.0.0-0"
      }
    },
    "node_modules/@clerk/nextjs": {
      "version": "6.35.5",
      "resolved": "https://registry.npmjs.org/@clerk/nextjs/-/nextjs-6.35.5.tgz",
      "integrity": "sha512-UmVSrfvMpkAU4ky+bam9bSc/Uvbv0XKR+KMWGWBKiGxsMluQI9Xt2bm7kPoxhHvTUnUQzP3BFgkbEgwIKeL4nQ==",
      "license": "MIT",
      "dependencies": {
        "@clerk/backend": "^2.24.0",
        "@clerk/clerk-react": "^5.57.0",
        "@clerk/shared": "^3.36.0",
        "@clerk/types": "^4.101.3",
        "server-only": "0.0.1",
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=18.17.0"
      },
      "peerDependencies": {
        "next": "^13.5.7 || ^14.2.25 || ^15.2.3 || ^16",
        "react": "^18.0.0 || ^19.0.0 || ^19.0.0-0",
        "react-dom": "^18.0.0 || ^19.0.0 || ^19.0.0-0"
      }
    },
    "node_modules/@clerk/shared": {
      "version": "3.36.0",
      "resolved": "https://registry.npmjs.org/@clerk/shared/-/shared-3.36.0.tgz",
      "integrity": "sha512-Yp4tL/x/iVft40DnxBjT/g/kQilZ+i9mYrqC1Lk6fUnfZV8t7E54GX19JtJSSONzjHsH6sCv3BmJaF1f7Eomkw==",
      "hasInstallScript": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "3.1.3",
        "dequal": "2.0.3",
        "glob-to-regexp": "0.4.1",
        "js-cookie": "3.0.5",
        "std-env": "^3.9.0",
        "swr": "2.3.4"
      },
      "engines": {
        "node": ">=18.17.0"
      },
      "peerDependencies": {
        "react": "^18.0.0 || ^19.0.0 || ^19.0.0-0",
        "react-dom": "^18.0.0 || ^19.0.0 || ^19.0.0-0"
      },
      "peerDependenciesMeta": {
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@clerk/types": {
      "version": "4.101.3",
      "resolved": "https://registry.npmjs.org/@clerk/types/-/types-4.101.3.tgz",
      "integrity": "sha512-QkYSiR8EDjLhQ3K9aCZ323knzZQggzhi3qxSdFrtI/C8Osyytua3Bu4TOGGRgYSSD4VO3s8WUz3wQf4Qe0ps/g==",
      "license": "MIT",
      "dependencies": {
        "@clerk/shared": "^3.36.0"
      },
      "engines": {
        "node": ">=18.17.0"
      }
    },
    "node_modules/@date-fns/tz": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@date-fns/tz/-/tz-1.2.0.tgz",
      "integrity": "sha512-LBrd7MiJZ9McsOgxqWX7AaxrDjcFVjWH/tIKJd7pnR7McaslGYOP1QmmiBXdJH/H/yLCT+rcQ7FaPBUxRGUtrg==",
      "license": "MIT"
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.7.1",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.7.1.tgz",
      "integrity": "sha512-PVtJr5CmLwYAU9PZDMITZoR5iAOShYREoR45EyyLrbntV50mdePTgUn4AmOw90Ifcj+x2kRjdzr1HP3RrNiHGA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.9.0",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.9.0.tgz",
      "integrity": "sha512-ayVFHdtZ+hsq1t2Dy24wCmGXGe4q9Gu3smhLYALJrr473ZH27MsnSL+LKUlimp4BWJqMDMLmPpx/Q9R3OAlL4g==",
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.2",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
      "integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.21.1",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.21.1.tgz",
      "integrity": "sha512-aw1gNayWpdI/jSYVgzN5pL0cfzU02GT3NBpeT/DXbx1/1x7ZKxFPd9bwrzygx/qiwIQiJ1sw/zD8qY/kRvlGHA==",
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/object-schema": "^2.1.7",
        "debug": "^4.3.1",
        "minimatch": "^3.1.2"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/config-helpers": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.4.2.tgz",
      "integrity": "sha512-gBrxN88gOIf3R7ja5K9slwNayVcZgK6SOUORm2uBzTeIEfeVaIhOpCtTox3P6R7o2jLFwLFTLnC7kU/RGcYEgw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/core": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-0.17.0.tgz",
      "integrity": "sha512-yL/sLrpmtDaFEiUj1osRP4TI2MDz1AddJL+jZ7KSqvBuliN4xqYY54IfdN8qD8Toa6g1iloph1fxQNkjOxrrpQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@types/json-schema": "^7.0.15"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/eslintrc": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-3.3.1.tgz",
      "integrity": "sha512-gtF186CXhIl1p4pJNGZw8Yc6RlshoePRvE0X91oPGb3vZ8pM3qOS9W9NGPat9LziaBV7XrJWGylNQXkGcnM3IQ==",
      "license": "MIT",
      "dependencies": {
        "ajv": "^6.12.4",
        "debug": "^4.3.2",
        "espree": "^10.0.1",
        "globals": "^14.0.0",
        "ignore": "^5.2.0",
        "import-fresh": "^3.2.1",
        "js-yaml": "^4.1.0",
        "minimatch": "^3.1.2",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint/js": {
      "version": "9.39.1",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-9.39.1.tgz",
      "integrity": "sha512-S26Stp4zCy88tH94QbBv3XCuzRQiZ9yXofEILmglYTh/Ug/a9/umqvgFtYBAo3Lp0nsI/5/qH1CCrbdK3AP1Tw==",
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-2.1.7.tgz",
      "integrity": "sha512-VtAOaymWVfZcmZbp6E2mympDIHvyjXs/12LqWYjVw6qjrfF+VK+fyG33kChz3nnK+SU5/NeHOqrTEHS8sXO3OA==",
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.4.1.tgz",
      "integrity": "sha512-43/qtrDUokr7LJqoF2c3+RInu/t4zfrpYdoSDfYyhg52rwLV6TnOvdG4fXm7IkSB3wErkcmJS9iEhjVtOSEjjA==",
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0",
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@floating-ui/core": {
      "version": "1.7.3",
      "resolved": "https://registry.npmjs.org/@floating-ui/core/-/core-1.7.3.tgz",
      "integrity": "sha512-sGnvb5dmrJaKEZ+LDIpguvdX3bDlEllmv4/ClQ9awcmCZrlx5jQyyMWFM5kBI+EyNOCDDiKk8il0zeuX3Zlg/w==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/utils": "^0.2.10"
      }
    },
    "node_modules/@floating-ui/dom": {
      "version": "1.7.4",
      "resolved": "https://registry.npmjs.org/@floating-ui/dom/-/dom-1.7.4.tgz",
      "integrity": "sha512-OOchDgh4F2CchOX94cRVqhvy7b3AFb+/rQXyswmzmGakRfkMgoWVjfnLWkRirfLEfuD4ysVW16eXzwt3jHIzKA==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/core": "^1.7.3",
        "@floating-ui/utils": "^0.2.10"
      }
    },
    "node_modules/@floating-ui/react-dom": {
      "version": "2.1.6",
      "resolved": "https://registry.npmjs.org/@floating-ui/react-dom/-/react-dom-2.1.6.tgz",
      "integrity": "sha512-4JX6rEatQEvlmgU80wZyq9RT96HZJa88q8hp0pBd+LrczeDI4o6uA2M+uvxngVHo4Ihr8uibXxH6+70zhAFrVw==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/dom": "^1.7.4"
      },
      "peerDependencies": {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      }
    },
    "node_modules/@floating-ui/utils": {
      "version": "0.2.10",
      "resolved": "https://registry.npmjs.org/@floating-ui/utils/-/utils-0.2.10.tgz",
      "integrity": "sha512-aGTxbpbg8/b5JfU1HXSrbH3wXZuLPJcNEcZQFMxLs3oSzgtVu6nFPkbbGGUvBcUjKV2YyB9Wxxabo+HEH9tcRQ==",
      "license": "MIT"
    },
    "node_modules/@hookform/resolvers": {
      "version": "3.10.0",
      "resolved": "https://registry.npmjs.org/@hookform/resolvers/-/resolvers-3.10.0.tgz",
      "integrity": "sha512-79Dv+3mDF7i+2ajj7SkypSKHhl1cbln1OGavqrsF7p6mbUv11xpqpacPsGDCTRvCSjEEIez2ef1NveSVL3b0Ag==",
      "license": "MIT",
      "peerDependencies": {
        "react-hook-form": "^7.0.0"
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.1",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.1.tgz",
      "integrity": "sha512-5DyQ4+1JEUzejeK1JGICcideyfUbGixgS9jNgex5nqkW+cY7WZhxBigmieN5Qnw9ZosSNVC9KQKyb+GUaGyKUA==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.7",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.7.tgz",
      "integrity": "sha512-/zUx+yOsIrG4Y43Eh2peDeKCxlRt/gET6aHfaKpuq267qXdYDFViVHfMaLyygZOnl0kGWxFIgsBy8QFuTLUXEQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/core": "^0.19.1",
        "@humanwhocodes/retry": "^0.4.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-

... [Content truncated at 15000 characters] ...
```

### File: `package.json`

```json
{
  "name": "my-v0-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "lint": "eslint .",
    "start": "next start"
  },
  "dependencies": {
    "@clerk/nextjs": "^6.35.5",
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "1.2.2",
    "@radix-ui/react-alert-dialog": "1.1.4",
    "@radix-ui/react-aspect-ratio": "1.1.1",
    "@radix-ui/react-avatar": "1.1.2",
    "@radix-ui/react-checkbox": "1.1.3",
    "@radix-ui/react-collapsible": "1.1.2",
    "@radix-ui/react-context-menu": "2.2.4",
    "@radix-ui/react-dialog": "1.1.4",
    "@radix-ui/react-dropdown-menu": "2.1.4",
    "@radix-ui/react-hover-card": "1.1.4",
    "@radix-ui/react-label": "2.1.1",
    "@radix-ui/react-menubar": "1.1.4",
    "@radix-ui/react-navigation-menu": "1.2.3",
    "@radix-ui/react-popover": "1.1.4",
    "@radix-ui/react-progress": "1.1.1",
    "@radix-ui/react-radio-group": "1.2.2",
    "@radix-ui/react-scroll-area": "1.2.2",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-separator": "1.1.1",
    "@radix-ui/react-slider": "1.2.2",
    "@radix-ui/react-slot": "1.1.1",
    "@radix-ui/react-switch": "1.1.2",
    "@radix-ui/react-tabs": "1.1.2",
    "@radix-ui/react-toast": "1.2.4",
    "@radix-ui/react-toggle": "1.1.1",
    "@radix-ui/react-toggle-group": "1.1.1",
    "@radix-ui/react-tooltip": "1.1.6",
    "@vercel/analytics": "latest",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "1.0.4",
    "date-fns": "4.1.0",
    "embla-carousel-react": "8.5.1",
    "input-otp": "1.4.1",
    "lucide-react": "^0.454.0",
    "next": "16.0.3",
    "next-themes": "^0.4.6",
    "react": "19.2.0",
    "react-day-picker": "9.8.0",
    "react-dom": "19.2.0",
    "react-hook-form": "^7.60.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "latest",
    "sonner": "^1.7.4",
    "stripe": "latest",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^1.1.2",
    "zod": "3.25.76"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.9",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "postcss": "^8.5",
    "tailwindcss": "^4.1.9",
    "tw-animate-css": "1.3.3",
    "typescript": "^5"
  }
}

```

### File: `pnpm-lock.yaml`

```yaml
lockfileVersion: '9.0'

settings:
  autoInstallPeers: true
  excludeLinksFromLockfile: false

importers:

  .:
    dependencies:
      '@clerk/nextjs':
        specifier: latest
        version: 6.35.5(next@16.0.3(react-dom@19.2.0(react@19.2.0))(react@19.2.0))(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@hookform/resolvers':
        specifier: ^3.10.0
        version: 3.10.0(react-hook-form@7.60.0(react@19.2.0))
      '@radix-ui/react-accordion':
        specifier: 1.2.2
        version: 1.2.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-alert-dialog':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-aspect-ratio':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-avatar':
        specifier: 1.1.2
        version: 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-checkbox':
        specifier: 1.1.3
        version: 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-collapsible':
        specifier: 1.1.2
        version: 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-context-menu':
        specifier: 2.2.4
        version: 2.2.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-dialog':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-dropdown-menu':
        specifier: 2.1.4
        version: 2.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-hover-card':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-label':
        specifier: 2.1.1
        version: 2.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-menubar':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-navigation-menu':
        specifier: 1.2.3
        version: 1.2.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-popover':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-progress':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-radio-group':
        specifier: 1.2.2
        version: 1.2.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-scroll-area':
        specifier: 1.2.2
        version: 1.2.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-select':
        specifier: 2.1.4
        version: 2.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-separator':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-slider':
        specifier: 1.2.2
        version: 1.2.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-slot':
        specifier: 1.1.1
        version: 1.1.1(@types/react@19.0.0)(react@19.2.0)
      '@radix-ui/react-switch':
        specifier: 1.1.2
        version: 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-tabs':
        specifier: 1.1.2
        version: 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-toast':
        specifier: 1.2.4
        version: 1.2.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-toggle':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-toggle-group':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@radix-ui/react-tooltip':
        specifier: 1.1.6
        version: 1.1.6(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      '@vercel/analytics':
        specifier: latest
        version: 1.5.0(next@16.0.3(react-dom@19.2.0(react@19.2.0))(react@19.2.0))(react@19.2.0)
      autoprefixer:
        specifier: ^10.4.20
        version: 10.4.20(postcss@8.5.0)
      class-variance-authority:
        specifier: ^0.7.1
        version: 0.7.1
      clsx:
        specifier: ^2.1.1
        version: 2.1.1
      cmdk:
        specifier: 1.0.4
        version: 1.0.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      date-fns:
        specifier: 4.1.0
        version: 4.1.0
      embla-carousel-react:
        specifier: 8.5.1
        version: 8.5.1(react@19.2.0)
      input-otp:
        specifier: 1.4.1
        version: 1.4.1(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      lucide-react:
        specifier: ^0.454.0
        version: 0.454.0(react@19.2.0)
      next:
        specifier: 16.0.3
        version: 16.0.3(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      next-themes:
        specifier: ^0.4.6
        version: 0.4.6(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      react:
        specifier: 19.2.0
        version: 19.2.0
      react-day-picker:
        specifier: 9.8.0
        version: 9.8.0(react@19.2.0)
      react-dom:
        specifier: 19.2.0
        version: 19.2.0(react@19.2.0)
      react-hook-form:
        specifier: ^7.60.0
        version: 7.60.0(react@19.2.0)
      react-resizable-panels:
        specifier: ^2.1.7
        version: 2.1.7(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      recharts:
        specifier: latest
        version: 3.5.0(@types/react@19.0.0)(eslint@9.39.1(jiti@2.6.1))(react-dom@19.2.0(react@19.2.0))(react-is@19.2.0)(react@19.2.0)(redux@5.0.1)
      sonner:
        specifier: ^1.7.4
        version: 1.7.4(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      stripe:
        specifier: latest
        version: 20.0.0(@types/node@22.0.0)
      tailwind-merge:
        specifier: ^2.5.5
        version: 2.5.5
      tailwindcss-animate:
        specifier: ^1.0.7
        version: 1.0.7(tailwindcss@4.1.9)
      vaul:
        specifier: ^1.1.2
        version: 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.2.0(react@19.2.0))(react@19.2.0)
      zod:
        specifier: 3.25.76
        version: 3.25.76
    devDependencies:
      '@tailwindcss/postcss':
        specifier: ^4.1.9
        version: 4.1.9
      '@types/node':
        specifier: ^22
        version: 22.0.0
      '@types/react':
        specifier: ^19
        version: 19.0.0
      '@types/react-dom':
        specifier: ^19
        version: 19.0.0
      postcss:
        specifier: ^8.5
        version: 8.5.0
      tailwindcss:
        specifier: ^4.1.9
        version: 4.1.9
      tw-animate-css:
        specifier: 1.3.3
        version: 1.3.3
      typescript:
        specifier: ^5
        version: 5.0.2

packages:

  '@alloc/quick-lru@5.2.0':
    resolution: {integrity: sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==}
    engines: {node: '>=10'}

  '@ampproject/remapping@2.3.0':
    resolution: {integrity: sha512-30iZtAPgz+LTIYoeivqYo853f02jBYSd5uGnGpkFV0M3xOt9aN73erkgYAmZU43x4VfqcnLxW9Kpg3R5LC4YYw==}
    engines: {node: '>=6.0.0'}

  '@clerk/backend@2.24.0':
    resolution: {integrity: sha512-6If+zmUiNEWVt5MoTjCl+0xiAq+uRR5kj+6HBXDG75KwRrG0eW3gH43QntQYBQU/SqhGwY2UbogEplM8ndF7Fg==}
    engines: {node: '>=18.17.0'}

  '@clerk/clerk-react@5.57.0':
    resolution: {integrity: sha512-GCBFF03HjEWvx58myjauJ7NrwTqhxHdetjWWxVM3YJGPOsAVXg4WuquL/hyn8KDuduCYSkRin4Hg6+QVP1NXAg==}
    engines: {node: '>=18.17.0'}
    peerDependencies:
      react: ^18.0.0 || ^19.0.0 || ^19.0.0-0
      react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-0

  '@clerk/nextjs@6.35.5':
    resolution: {integrity: sha512-UmVSrfvMpkAU4ky+bam9bSc/Uvbv0XKR+KMWGWBKiGxsMluQI9Xt2bm7kPoxhHvTUnUQzP3BFgkbEgwIKeL4nQ==}
    engines: {node: '>=18.17.0'}
    peerDependencies:
      next: ^13.5.7 || ^14.2.25 || ^15.2.3 || ^16
      react: ^18.0.0 || ^19.0.0 || ^19.0.0-0
      react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-0

  '@clerk/shared@3.36.0':
    resolution: {integrity: sha512-Yp4tL/x/iVft40DnxBjT/g/kQilZ+i9mYrqC1Lk6fUnfZV8t7E54GX19JtJSSONzjHsH6sCv3BmJaF1f7Eomkw==}
    engines: {node: '>=18.17.0'}
    peerDependencies:
      react: ^18.0.0 || ^19.0.0 || ^19.0.0-0
      react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-0
    peerDependenciesMeta:
      react:
        optional: true
      react-dom:
        optional: true

  '@clerk/types@4.101.3':
    resolution: {integrity: sha512-QkYSiR8EDjLhQ3K9aCZ323knzZQggzhi3qxSdFrtI/C8Osyytua3Bu4TOGGRgYSSD4VO3s8WUz3wQf4Qe0ps/g==}
    engines: {node: '>=18.17.0'}

  '@date-fns/tz@1.2.0':
    resolution: {integrity: sha512-LBrd7MiJZ9McsOgxqWX7AaxrDjcFVjWH/tIKJd7pnR7McaslGYOP1QmmiBXdJH/H/yLCT+rcQ7FaPBUxRGUtrg==}

  '@emnapi/runtime@1.7.1':
    resolution: {integrity: sha512-PVtJr5CmLwYAU9PZDMITZoR5iAOShYREoR45EyyLrbntV50mdePTgUn4AmOw90Ifcj+x2kRjdzr1HP3RrNiHGA==}

  '@eslint-community/eslint-utils@4.9.0':
    resolution: {integrity: sha512-ayVFHdtZ+hsq1t2Dy24wCmGXGe4q9Gu3smhLYALJrr473ZH27MsnSL+LKUlimp4BWJqMDMLmPpx/Q9R3OAlL4g==}
    engines: {node: ^12.22.0 || ^14.17.0 || >=16.0.0}
    peerDependencies:
      eslint: ^6.0.0 || ^7.0.0 || >=8.0.0

  '@eslint-community/regexpp@4.12.2':
    resolution: {integrity: sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==}
    engines: {node: ^12.0.0 || ^14.0.0 || >=16.0.0}

  '@eslint/config-array@0.21.1':
    resolution: {integrity: sha512-aw1gNayWpdI/jSYVgzN5pL0cfzU02GT3NBpeT/DXbx1/1x7ZKxFPd9bwrzygx/qiwIQiJ1sw/zD8qY/kRvlGHA==}
    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}

  '@eslint/config-helpers@0.4.2':
    resolution: {integrity: sha512-gBrxN88gOIf3R7ja5K9slwNayVcZgK6SOUORm2uBzTeIEfeVaIhOpCtTox3P6R7o2jLFwLFTLnC7kU/RGcYEgw==}
    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}

  '@eslint/core@0.17.0':
    resolution: {integrity: sha512-yL/sLrpmtDaFEiUj1osRP4TI2MDz1AddJL+jZ7KSqvBuliN4xqYY54IfdN8qD8Toa6g1iloph1fxQNkjOxrrpQ==}
    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}

  '@eslint/eslintrc@3.3.1':
    resolution: {integrity: sha512-gtF186CXhIl1p4pJNGZw8Yc6RlshoePRvE0X91oPGb3vZ8pM3qOS9W9NGPat9LziaBV7XrJWGylNQXkGcnM3IQ==}
    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}

  '@eslint/js@9.39.1':
    resolution: {integrity: sha512-S26Stp4zCy88tH94QbBv3XCuzRQiZ9yXofEILmglYTh/Ug/a9/umqvgFtYBAo3Lp0nsI/5/qH1CCrbdK3AP1Tw==}
    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}

  '@eslint/object-schema@2.1.7':
    resolution: {integrity: sha512-VtAOaymWVfZcmZbp6E2mympDIHvyjXs/12LqWYjVw6qjrfF+VK+fyG33kChz3nnK+SU5/NeHOqrTEHS8sXO3OA==}
    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}

  '@eslint/plugin-kit@0.4.1':
    resolution: {integrity: sha512-43/qtrDUokr7LJqoF2c3+RInu/t4zfrpYdoSDfYyhg52rwLV6TnOvdG4fXm7IkSB3wErkcmJS9iEhjVtOSEjjA==}
    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}

  '@floating-ui/core@1.7.3':
    resolution: {integrity: sha512-sGnvb5dmrJaKEZ+LDIpguvdX3bDlEllmv4/ClQ9awcmCZrlx5jQyyMWFM5kBI+EyNOCDDiKk8il0zeuX3Zlg/w==}

  '@floating-ui/dom@1.7.4':
    resolution: {integrity: sha512-OOchDgh4F2CchOX94cRVqhvy7b3AFb+/rQXyswmzmGakRfkMgoWVjfnLWkRirfLEfuD4ysVW16eXzwt3jHIzKA==}

  '@floating-ui/react-dom@2.1.6':
    resolution: {integrity: sha512-4JX6rEatQEvlmgU80wZyq9RT96HZJa88q8hp0pBd+LrczeDI4o6uA2M+uvxngVHo4Ihr8uibXxH6+70zhAFrVw==}
    peerDependencies:
      react: '>=16.8.0'
      react-dom: '>=16.8.0'

  '@floating-ui/utils@0.2.10':
    resolution: {integrity: sha512-aGTxbpbg8/b5JfU1HXSrbH3wXZuLPJcNEcZQFMxLs3oSzgtVu6nFPkbbGGUvBcUjKV2YyB9Wxxabo+HEH9tcRQ==}

  '@hookform/resolvers@3.10.0':
    resolution: {integrity: sha512-79Dv+3mDF7i+2ajj7SkypSKHhl1cbln1OGavqrsF7p6mbUv11xpqpacPsGDCTRvCSjEEIez2ef1NveSVL3b0Ag==}
    peerDependencies:
      react-hook-form: ^7.0.0

  '@humanfs/core@0.19.1':
    resolution: {integrity: sha512-5DyQ4+1JEUzejeK1JGICcideyfUbGixgS9jNgex5nqkW+cY7WZhxBigmieN5Qnw9ZosSNVC9KQKyb+GUaGyKUA==}
    engines: {node: '>=18.18.0'}

  '@humanfs/node@0.16.7':
    resolution: {integrity: sha512-/zUx+yOsIrG4Y43Eh2peDeKCxlRt/gET6aHfaKpuq267qXdYDFViVHfMaLyygZOnl0kGWxFIgsBy8QFuTLUXEQ==}
    engines: {node: '>=18.18.0'}

  '@humanwhocodes/module-importer@1.0.1':
    resolution: {integrity: sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==}
    engines: {node: '>=12.22'}

  '@humanwhocodes/retry@0.4.3':
    resolution: {integrity: sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==}
    engines: {node: '>=18.18'}

  '@img/colour@1.0.0':
    resolution: {integrity: sha512-A5P/LfWGFSl6nsckYtjw9da+19jB8hkJ6ACTGcDfEJ0aE+l2n2El7dsVM7UVHZQ9s2lmYMWlrS21YLy2IR1LUw==}
    engines: {node: '>=18'}

  '@img/sharp-darwin-arm64@0.34.5':
    resolution: {integrity: sha512-imtQ3WMJXbMY4fxb/Ndp6HBTNVtWCUI0WdobyheGf5+ad6xX8VIDO8u2xE4qc/fr08CKG/7dDseFtn6M6g/r3w==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [arm64]
    os: [darwin]

  '@img/sharp-darwin-x64@0.34.5':
    resolution: {integrity: sha512-YNEFAF/4KQ/PeW0N+r+aVVsoIY0/qxxikF2SWdp+NRkmMB7y9LBZAVqQ4yhGCm/H3H270OSykqmQMKLBhBJDEw==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [x64]
    os: [darwin]

  '@img/sharp-libvips-darwin-arm64@1.2.4':
    resolution: {integrity: sha512-zqjjo7RatFfFoP0MkQ51jfuFZBnVE2pRiaydKJ1G/rHZvnsrHAOcQALIi9sA5co5xenQdTugCvtb1cuf78Vf4g==}
    cpu: [arm64]
    os: [darwin]

  '@img/sharp-libvips-darwin-x64@1.2.4':
    resolution: {integrity: sha512-1IOd5xfVhlGwX+zXv2N93k0yMONvUlANylbJw1eTah8K/Jtpi15KC+WSiaX/nBmbm2HxRM1gZ0nSdjSsrZbGKg==}
    cpu: [x64]
    os: [darwin]

  '@img/sharp-libvips-linux-arm64@1.2.4':
    resolution: {integrity: sha512-excjX8DfsIcJ10x1Kzr4RcWe1edC9PquDRRPx3YVCvQv+U5p7Yin2s32ftzikXojb1PIFc/9Mt28/y+iRklkrw==}
    cpu: [arm64]
    os: [linux]

  '@img/sharp-li

... [Content truncated at 15000 characters] ...
```

### File: `postcss.config.mjs`

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config

```

### File: `project_mapper.py`

```py
import os
import sys

# --- Configuration ---
# Directories to ignore during the scan (e.g., environments, build folders, version control)
EXCLUDE_DIRS = [
    '.git', '__pycache__', 'venv', 'env', 'node_modules', 'dist', 'build', '.idea', '.vscode'
]
# File extensions to ignore (e.g., binary files, compressed files)
EXCLUDE_EXTENSIONS = [
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.pdf', '.zip', '.tar', '.gz',
    '.sqlite3', '.db', '.bin', '.dll', '.exe', '.lock', '.log', '.pyd', '.pyc'
]
# Maximum character limit for file content included in the output (to avoid exceeding LLM context limits)
MAX_CONTENT_CHARS = 15000 
# Maximum number of files to process to prevent extremely long outputs
MAX_FILES = 100 
# --- End Configuration ---


def get_file_content(filepath):
    """Safely reads file content, handling encoding errors and size limits."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read(MAX_CONTENT_CHARS)
        
        if len(content) == MAX_CONTENT_CHARS:
            content += f"\n\n... [Content truncated at {MAX_CONTENT_CHARS} characters] ..."
            
        return content
    except UnicodeDecodeError:
        # Ignore binary or non-UTF-8 files
        return "[Content skipped: Binary or non-UTF-8 encoded file]"
    except Exception as e:
        return f"[Content skipped: Error reading file: {e}]"

def map_project(root_dir, output_file_path):
    """
    Scans the project directory, builds the structure map, and extracts content.
    """
    print(f"Starting scan of directory: {os.path.abspath(root_dir)}")
    
    # 1. Structure the output
    structure_map = f"# Project Context Map for: {os.path.basename(os.path.abspath(root_dir))}\n\n"
    structure_map += "This file contains the directory structure and the contents of important project files.\n\n"
    structure_map += "---\n\n## 1. Directory Structure\n\n"
    
    content_map = "\n---\n\n## 2. File Contents\n"

    file_count = 0

    for root, dirs, files in os.walk(root_dir, topdown=True):
        # Filter out excluded directories in place for os.walk to respect
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith('.')]
        
        # Calculate indentation level
        depth = root[len(root_dir):].count(os.sep)
        indent = '│   ' * depth
        
        # Add the current directory to the structure map (relative path)
        relative_path = os.path.relpath(root, root_dir)
        if relative_path != '.':
            structure_map += f"{indent}├── **{os.path.basename(root)}/**\n"
            indent += '│   ' # Increase indent for contents

        # Process files in the current directory
        for i, file_name in enumerate(files):
            file_path = os.path.join(root, file_name)
            
            # Check for file extension exclusion
            if any(file_name.lower().endswith(ext) for ext in EXCLUDE_EXTENSIONS):
                continue
            
            # Check max file limit
            if file_count >= MAX_FILES:
                structure_map += f"{indent}└── ... (Maximum file limit reached: {MAX_FILES} files processed)\n"
                print(f"Maximum file limit ({MAX_FILES}) reached. Stopping scan.")
                break

            file_count += 1
            
            # Add file to the structure map
            structure_map += f"{indent}├── {file_name}\n"
            
            # 2. Extract and format file content
            relative_file_path = os.path.relpath(file_path, root_dir)
            content = get_file_content(file_path)
            
            # Determine code block language for syntax highlighting (optional, helps LLM)
            extension = os.path.splitext(file_name)[1].lstrip('.')
            
            content_map += f"\n\n### File: `{relative_file_path}`\n\n"
            content_map += f"```{extension if extension else 'text'}\n"
            content_map += content
            content_map += "\n```"

        if file_count >= MAX_FILES:
            break

    # Combine and write the final output
    final_output = structure_map + content_map
    
    try:
        with open(output_file_path, 'w', encoding='utf-8') as f:
            f.write(final_output)
        print(f"\n✅ Successfully generated project context map to: {os.path.abspath(output_file_path)}")
        print(f"Total files processed: {file_count}")
        print("You can now copy the contents of this file directly into a Gemini prompt.")

    except Exception as e:
        print(f"\n❌ ERROR: Could not write output file {output_file_path}. Reason: {e}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        # If no path is provided, use the current directory
        project_path = os.getcwd()
        print("No directory path provided. Defaulting to current directory.")
    else:
        project_path = sys.argv[1]
    
    if not os.path.isdir(project_path):
        print(f"Error: The path '{project_path}' is not a valid directory.")
        sys.exit(1)

    # Use a fixed output name for easy use in LLM prompts
    output_filename = "project_context.md"
    map_project(project_path, output_filename)

```

### File: `README.md`

```md
# Peak Commerce - Full-Stack E-Commerce Platform

A modern, fully-responsive e-commerce platform built with Next.js 16, Clerk Authentication, Stripe Payments, and a complete admin dashboard.

## Features

### Customer Experience
- **Responsive Design**: Fully mobile-first responsive across all devices
- **Product Catalog**: Browse products by category with search functionality
- **Product Details**: Detailed product information with ratings and reviews
- **Shopping Cart**: Add/remove items with real-time quantity management
- **Multi-Step Checkout**: Shipping, payment, and order review steps
- **Stripe Integration**: Secure payment processing

### Admin Features
- **Dashboard**: Real-time analytics with sales charts and trends
- **Order Management**: Track and manage all customer orders
- **Product Management**: Add, edit, and delete products with inventory tracking
- **Customer Management**: View customer information and purchase history
- **Inventory Management**: Real-time stock updates

### Authentication
- **Clerk Authentication**: Secure user authentication and management
- **Role-Based Access**: Admin-only dashboard protection
- **User Profiles**: Personalized user accounts and order history

## Tech Stack

**Frontend:**
- Next.js 16 with App Router
- React 19 with Server Components
- Tailwind CSS v4 with custom design tokens
- Recharts for analytics
- Lucide React for icons

**Backend:**
- Next.js API Routes
- Stripe API for payments
- Mock MongoDB structure (ready for real integration)

**Authentication & Services:**
- Clerk for user authentication
- Stripe for payments
- Vercel deployment ready

## Project Structure

\`\`\`
peak-commerce/
├── app/
│   ├── layout.tsx                 # Root layout with Clerk provider
│   ├── page.tsx                   # Home page
│   ├── api/
│   │   ├── products/             # Product endpoints
│   │   ├── orders/               # Order endpoints
│   │   ├── checkout/             # Stripe checkout
│   │   └── inventory/            # Inventory endpoints
│   ├── admin/
│   │   ├── layout.tsx            # Admin layout with sidebar
│   │   ├── page.tsx              # Dashboard
│   │   ├── products/             # Product management
│   │   ├── orders/               # Order management
│   │   └── customers/            # Customer management
│   ├── shop/                      # Product shop page
│   ├── products/[id]/             # Product detail page
│   ├── cart/                      # Shopping cart
│   ├── checkout/                  # Checkout flow
│   ├── sign-in/                   # Clerk sign-in
│   └── sign-up/                   # Clerk sign-up
├── components/
│   ├── navigation.tsx             # Main navigation
│   ├── hero-section.tsx           # Home hero
│   ├── featured-products.tsx      # Featured products grid
│   ├── testimonials.tsx           # Customer testimonials
│   ├── cta-section.tsx            # Call-to-action
│   ├── footer.tsx                 # Footer
│   └── admin-sidebar.tsx          # Admin navigation
├── lib/
│   ├── stripe.ts                  # Stripe configuration
│   └── api-client.ts              # API client utilities
├── globals.css                    # Global styles & design tokens
└── README.md
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Clerk account (free tier available)
- Stripe account (test mode)

### Installation

1. **Clone and install dependencies:**
   \`\`\`bash
   git clone <repository-url>
   cd peak-commerce
   npm install
   \`\`\`

2. **Setup environment variables:**
   Create a `.env.local` file in the root directory:
   \`\`\`
   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   
   # App
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   \`\`\`

3. **Run development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Responsive Design Features

- **Mobile First**: All components designed for mobile screens first
- **Breakpoints**:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- **Touch-Friendly**: Large tap targets and mobile-optimized navigation
- **Flexible Layouts**: Flexbox and Grid for responsive layouts
- **Responsive Images**: Optimized with Next.js Image component

## Authentication Flow

1. Users sign up/login via Clerk
2. Clerk handles email verification and security
3. User information stored in Clerk
4. Orders linked to user via userId
5. Admin dashboard restricted to admin-role users

## API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products?category=Audio` - Filter by category
- `GET /api/products/[id]` - Get product details

### Orders
- `POST /api/orders` - Create new order (authenticated)
- `GET /api/orders` - Get user's orders (authenticated)

### Checkout
- `POST /api/checkout` - Create Stripe session (authenticated)

### Inventory
- `GET /api/inventory` - Get inventory
- `GET /api/inventory?productId=1` - Get specific product stock
- `PUT /api/inventory` - Update stock (admin only)

## Customization

### Design System
Edit `app/globals.css` to modify:
- Color palette (primary, neutrals, semantic colors)
- Typography (fonts via layout.tsx)
- Border radius and spacing

### Products
Update mock data in API routes and component files:
- `app/api/products/route.ts`
- `components/featured-products.tsx`
- `app/shop/page.tsx`

### Admin Dashboard
Customize dashboard stats and charts in:
- `app/admin/page.tsx`
- `app/admin/products/page.tsx`

## Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel Settings
4. Deploy with `vercel deploy`

\`\`\`bash
vercel deploy
\`\`\`

## Next Steps for Production

1. **Database Integration**: Replace mock data with MongoDB/Supabase
2. **Order Management**: Implement order tracking and notifications
3. **Email Notifications**: Add email confirmations for orders
4. **Payment Webhooks**: Set up Stripe webhooks for order updates
5. **Analytics**: Integrate Google Analytics or Mixpanel
6. **Error Handling**: Add comprehensive error handling and logging
7. **Testing**: Add unit and integration tests
8. **SEO**: Optimize metadata and add sitemap
9. **Security**: Enable CORS, rate limiting, and input validation
10. **CI/CD**: Set up automated tests and deployments

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open a GitHub issue or contact support at support@peakcommerce.com.

```

### File: `SETUP_GUIDE.md`

```md
# Peak Commerce Setup Guide

## Step-by-Step Setup Instructions

### 1. Clerk Authentication Setup

1. Go to [clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Select "Next.js" as your framework
4. Copy your publishable and secret keys
5. Add to `.env.local`:
   \`\`\`
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_key
   \`\`\`

### 2. Stripe Setup

1. Go to [stripe.com](https://stripe.com) and sign up
2. Get your test API keys from Dashboard > Developers > API Keys
3. Copy Publishable Key and Secret Key
4. Add to `.env.local`:
   \`\`\`
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   \`\`\`

### 3. Customize Your Store

#### Change Brand Name
1. Edit `components/navigation.tsx` - Update "Peak Commerce" text
2. Edit `components/footer.tsx` - Update footer branding
3. Edit `app/admin/components/admin-sidebar.tsx` - Update admin title

#### Update Product Catalog
1. Replace products in `app/api/products/route.ts`
2. Update featured products in `components/featured-products.tsx`
3. Add your own product images to `public/` folder

#### Modify Colors
Edit `app/globals.css` under `@theme inline`:
\`\`\`css
--color-primary: #2563eb;        /* Change to your brand color */
--color-primary-dark: #1d4ed8;
--color-primary-light: #3b82f6;
\`\`\`

### 4. Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and select your repository
4. Add environment variables:
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   - CLERK_SECRET_KEY
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   - STRIPE_SECRET_KEY
   - NEXT_PUBLIC_BASE_URL (set to your Vercel domain)
5. Click Deploy

### 5. Setup Admin User

1. In Clerk Dashboard, go to Users
2. Open your user profile
3. Add public metadata:
   \`\`\`json
   {
     "role": "admin"
   }
   \`\`\`
4. Access admin dashboard at `/admin`

### 6. Test the Complete Flow

1. **Sign Up**: Create a new account via `/sign-up`
2. **Browse Products**: Check out `/shop`
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Checkout**: Go to cart and complete checkout
5. **Admin Dashboard**: Visit `/admin` to view analytics

### 7. Mobile Testing

Test on different screen sizes:
\`\`\`bash
# Use Chrome DevTools
- iPhone 12/13/14
- iPad
- Pixel phones
- Desktop (1920x1080)
\`\`\`

All components are responsive and tested across devices.

## Troubleshooting

### Clerk Not Loading
- Check NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in `.env.local`
- Restart dev server after adding env vars
- Verify Clerk app is created and active

### Stripe Errors
- Ensure STRIPE_SECRET_KEY (not public key) is in backend
- Check Stripe keys are in test mode
- Verify NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is correct

### Styling Issues
- Clear `.next` folder: `rm -rf .next`
- Restart dev server
- Check Tailwind CSS v4 syntax in globals.css

### Images Not Loading
- Ensure images are in `public/` folder
- Check image paths match exactly
- Use correct image format (.jpg, .png, .webp)

## Performance Tips

1. **Image Optimization**: Use Next.js Image component (already done)
2. **Code Splitting**: Use dynamic imports for heavy components
3. **Caching**: Leverage Next.js caching strategies
4. **Database**: Implement proper indexing on MongoDB

## Security Checklist

- [ ] Enable HTTPS on production
- [ ] Set strong Stripe API keys
- [ ] Enable Clerk email verification
- [ ] Add rate limiting to API routes
- [ ] Validate all user inputs
- [ ] Use CORS appropriately
- [ ] Keep dependencies updated
- [ ] Enable CSP headers

## Going Live Checklist

- [ ] Update product information
- [ ] Configure real payment processor
- [ ] Set up email notifications
- [ ] Enable customer support system
- [ ] Configure analytics
- [ ] Test on all browsers/devices
- [ ] Set up monitoring/logging
- [ ] Create privacy policy
- [ ] Create terms of service
- [ ] Test entire checkout flow with real card

```

### File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "target": "ES6",
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./*"
      ]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}

```

### File: `app\globals.css`

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  /* Updated colors to actual Peak Commerce brand palette */
  --background: oklch(0.99 0 0);
  --foreground: oklch(0.15 0.02 260);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.15 0.02 260);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.15 0.02 260);
  --primary: oklch(0.5 0.15 260);
  --primary-light: oklch(0.65 0.1 260);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.95 0.05 260);
  --secondary-foreground: oklch(0.15 0.02 260);
  --muted: oklch(0.92 0.01 0);
  --muted-foreground: oklch(0.5 0.02 260);
  --accent: oklch(0.65 0.1 260);
  --accent-foreground: oklch(1 0 0);
  --destructive: oklch(0.62 0.22 25);
  --destructive-foreground: oklch(0.99 0 0);
  --border: oklch(0.92 0.01 0);
  --input: oklch(0.97 0.01 0);
  --ring: oklch(0.5 0.15 260);
  --chart-1: oklch(0.5 0.15 260);
  --chart-2: oklch(0.65 0.1 260);
  --chart-3: oklch(0.75 0.08 260);
  --chart-4: oklch(0.45 0.12 260);
  --chart-5: oklch(0.55 0.14 260);
  --radius: 0.625rem;
  --sidebar: oklch(0.97 0.01 0);
  --sidebar-foreground: oklch(0.15 0.02 260);
  --sidebar-primary: oklch(0.5 0.15 260);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.92 0.01 0);
  --sidebar-accent-foreground: oklch(0.15 0.02 260);
  --sidebar-border: oklch(0.92 0.01 0);
  --sidebar-ring: oklch(0.5 0.15 260);
}

.dark {
  /* Dark mode with proper contrast */
  --background: oklch(0.15 0.02 260);
  --foreground: oklch(0.99 0 0);
  --card: oklch(0.2 0.02 260);
  --card-foreground: oklch(0.99 0 0);
  --popover: oklch(0.2 0.02 260);
  --popover-foreground: oklch(0.99 0 0);
  --primary: oklch(0.65 0.1 260);
  --primary-light: oklch(0.55 0.14 260);
  --primary-foreground: oklch(0.15 0.02 260);
  --secondary: oklch(0.28 0.02 260);
  --secondary-foreground: oklch(0.99 0 0);
  --muted: oklch(0.35 0.02 260);
  --muted-foreground: oklch(0.7 0.02 260);
  --accent: oklch(0.65 0.1 260);
  --accent-foreground: oklch(0.15 0.02 260);
  --destructive: oklch(0.55 0.2 25);
  --destructive-foreground: oklch(0.95 0.02 25);
  --border: oklch(0.28 0.02 260);
  --input: oklch(0.28 0.02 260);
  --ring: oklch(0.65 0.1 260);
  --chart-1: oklch(0.65 0.1 260);
  --chart-2: oklch(0.55 0.14 260);
  --chart-3: oklch(0.75 0.08 260);
  --chart-4: oklch(0.6 0.12 260);
  --chart-5: oklch(0.7 0.1 260);
  --sidebar: oklch(0.2 0.02 260);
  --sidebar-foreground: oklch(0.99 0 0);
  --sidebar-primary: oklch(0.65 0.1 260);
  --sidebar-primary-foreground: oklch(0.15 0.02 260);
  --sidebar-accent: oklch(0.35 0.02 260);
  --sidebar-accent-foreground: oklch(0.99 0 0);
  --sidebar-border: oklch(0.28 0.02 260);
  --sidebar-ring: oklch(0.65 0.1 260);
}

@theme inline {
  --font-sans: "Inter", system-ui, sans-serif;
  --font-serif: "Playfair Display", serif;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

/* Added custom utility classes for Peak Commerce */
.container-responsive {
  @apply w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.grid-responsive {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8;
}

.text-balance {
  text-wrap: balance;
}

.text-pretty {
  text-wrap: pretty;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

### File: `app\layout.tsx`

```tsx
import type React from "react"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Peak Commerce - Premium Electronics",
  description: "Elevate your tech experience with premium electronics and smart devices.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}

```

### File: `app\page.tsx`

```tsx
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-products"
import Testimonials from "@/components/testimonials"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturedProducts />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}

```

### File: `app\admin\layout.tsx`

```tsx
import type React from "react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin-sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // TODO: In production, verify admin role from Clerk custom claims/metadata
  // For now, all authenticated users can access. Add role check:
  // const user = await clerkClient.users.getUser(userId)
  // if (user.publicMetadata?.role !== 'admin') redirect('/')

  return (
    <div className="flex h-screen bg-gray-900">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}

```

### File: `app\admin\page.tsx`

```tsx
"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, ShoppingCart, Users, DollarSign } from "lucide-react"

const chartData = [
  { month: "Jan", sales: 4000, orders: 240 },
  { month: "Feb", sales: 3000, orders: 221 },
  { month: "Mar", sales: 2000, orders: 229 },
  { month: "Apr", sales: 2780, orders: 200 },
  { month: "May", sales: 1890, orders: 229 },
  { month: "Jun", sales: 2390, orders: 200 },
]

const stats = [
  { label: "Total Orders", value: "1,250", change: "+12.5%", icon: ShoppingCart, color: "text-blue-500" },
  { label: "Total Revenue", value: "$85,000", change: "+8.2%", icon: DollarSign, color: "text-green-500" },
  { label: "New Customers", value: "120", change: "-2.5%", icon: Users, color: "text-purple-500" },
  { label: "Growth", value: "23%", change: "+5.1%", icon: TrendingUp, color: "text-orange-500" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome to Peak Commerce Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-semibold">{stat.label}</h3>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</p>
              <p className={`text-sm ${stat.change.includes("-") ? "text-red-400" : "text-green-400"}`}>
                {stat.change} from last month
              </p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-white font-semibold mb-6">Sales & Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#2563eb" radius={[8, 8, 0, 0]} />
              <Bar dataKey="orders" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-white font-semibold mb-6">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }}
                labelStyle={{ color: "#fff" }}
              />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-white font-semibold mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400">Order ID</th>
                <th className="text-left py-3 px-4 text-gray-400">Customer</th>
                <th className="text-left py-3 px-4 text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "ORD001", customer: "Alice Johnson", amount: "$249.99", status: "Delivered", date: "2023-10-26" },
                { id: "ORD002", customer: "Bob Williams", amount: "$129.50", status: "Shipped", date: "2023-10-25" },
                { id: "ORD003", customer: "Charlie Brown", amount: "$59.00", status: "Pending", date: "2023-10-25" },
                { id: "ORD004", customer: "Diana Miller", amount: "$450.00", status: "Delivered", date: "2023-10-24" },
                { id: "ORD005", customer: "Eve Davis", amount: "$89.99", status: "Cancelled", date: "2023-10-23" },
              ].map((order) => (
                <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="py-3 px-4 text-white">{order.id}</td>
                  <td className="py-3 px-4 text-gray-300">{order.customer}</td>
                  <td className="py-3 px-4 text-white font-semibold">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-500/20 text-green-300"
                          : order.status === "Shipped"
                            ? "bg-blue-500/20 text-blue-300"
                            : order.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

```

### File: `app\admin\customers\loading.tsx`

```tsx
export default function Loading() {
  return null
}

```

### File: `app\admin\customers\page.tsx`

```tsx
"use client"

import { useState } from "react"
import { Search, Mail, Phone } from "lucide-react"

const customers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    orders: 5,
    spent: "$1,249.95",
  },
  { id: 2, name: "Bob Williams", email: "bob@example.com", phone: "+1 (555) 234-5678", orders: 3, spent: "$599.97" },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "+1 (555) 345-6789",
    orders: 8,
    spent: "$2,199.92",
  },
]

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white mb-2">Customers</h1>
        <p className="text-gray-400">View and manage customer information</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((customer) => (
          <div key={customer.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="font-semibold text-white mb-4">{customer.name}</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <a href={`mailto:${customer.email}`}>{customer.email}</a>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                {customer.phone}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-gray-700 pt-4">
              <div>
                <p className="text-gray-400 text-sm">Orders</p>
                <p className="text-xl font-bold text-white">{customer.orders}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Spent</p>
                <p className="text-xl font-bold text-primary">{customer.spent}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

```

### File: `app\admin\orders\loading.tsx`

```tsx
export default function Loading() {
  return null
}

```

### File: `app\admin\orders\page.tsx`

```tsx
"use client"

import { useState } from "react"
import { Eye, Search } from "lucide-react"

const orders = [
  { id: "ORD001", customer: "Alice Johnson", amount: "$249.99", status: "Delivered", date: "2023-10-26" },
  { id: "ORD002", customer: "Bob Williams", amount: "$129.50", status: "Shipped", date: "2023-10-25" },
  { id: "ORD003", customer: "Charlie Brown", amount: "$59.00", status: "Pending", date: "2023-10-25" },
  { id: "ORD004", customer: "Diana Miller", amount: "$450.00", status: "Delivered", date: "2023-10-24" },
  { id: "ORD005", customer: "Eve Davis", amount: "$89.99", status: "Cancelled", date: "2023-10-23" },
]

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white mb-2">Orders</h1>
        <p className="text-gray-400">Track and manage customer orders</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by order ID or customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-900">
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Order ID</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Customer</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Amount</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Status</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Date</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="py-4 px-4 text-white font-medium">{order.id}</td>
                  <td className="py-4 px-4 text-gray-300">{order.customer}</td>
                  <td className="py-4 px-4 text-white font-semibold">{order.amount}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-500/20 text-green-300"
                          : order.status === "Shipped"
                            ? "bg-blue-500/20 text-blue-300"
                            : order.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-400">{order.date}</td>
                  <td className="py-4 px-4">
                    <button className="p-2 hover:bg-gray-600 rounded transition-colors text-primary">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

```

### File: `app\admin\products\loading.tsx`

```tsx
export default function Loading() {
  return null
}

```

### File: `app\admin\products\page.tsx`

```tsx
"use client"

import { useState } from "react"
import { Edit2, Trash2, Plus, Search } from "lucide-react"

const initialProducts = [
  { id: 1, name: "Wireless Bluetooth Headphones", price: "$79.99", stock: 150, category: "Audio" },
  { id: 2, name: "Smartwatch with Heart Monitor", price: "$199.99", stock: 80, category: "Wearables" },
  { id: 3, name: "Portable Bluetooth Speaker", price: "$89.99", stock: 230, category: "Audio" },
]

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-gray-400">Manage your product inventory</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors w-full md:w-auto justify-center md:justify-start">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Products Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-900">
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Product Name</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Category</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Price</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Stock</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="py-4 px-4 text-white font-medium">{product.name}</td>
                  <td className="py-4 px-4 text-gray-300">{product.category}</td>
                  <td className="py-4 px-4 text-white font-semibold">{product.price}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.stock > 100
                          ? "bg-green-500/20 text-green-300"
                          : product.stock > 50
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-600 rounded transition-colors text-primary">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-600 rounded transition-colors text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

```

### File: `app\api\checkout\route.ts`

```ts
import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { items, total } = body

    if (!items || !total) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      metadata: {
        userId,
      },
    })

    return NextResponse.json({
      success: true,
      sessionId: session.id,
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ success: false, error: "Failed to create checkout session" }, { status: 500 })
  }
}

```

### File: `app\api\inventory\route.ts`

```ts
import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// Mock inventory data
const inventory = [
  { productId: 1, stock: 150, lastUpdated: new Date() },
  { productId: 2, stock: 80, lastUpdated: new Date() },
  { productId: 3, stock: 230, lastUpdated: new Date() },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    if (productId) {
      const item = inventory.find((i) => i.productId === Number.parseInt(productId))
      if (!item) {
        return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
      }
      return NextResponse.json({ success: true, data: item })
    }

    return NextResponse.json({ success: true, data: inventory })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch inventory" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { productId, quantity } = body

    const item = inventory.find((i) => i.productId === productId)
    if (!item) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    item.stock = quantity
    item.lastUpdated = new Date()

    return NextResponse.json({
      success: true,
      data: item,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update inventory" }, { status: 500 })
  }
}

```

### File: `app\api\orders\route.ts`

```ts
import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// Mock database - replace with actual MongoDB
const orders: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.items || !body.shippingInfo || !body.total) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create new order
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      items: body.items,
      shippingInfo: body.shippingInfo,
      total: body.total,
      status: "pending",
      createdAt: new Date(),
    }

    orders.push(order)

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const userOrders = orders.filter((order) => order.userId === userId)

    return NextResponse.json({
      success: true,
      data: userOrders,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}

```

### File: `app\api\products\route.ts`

```ts
import { type NextRequest, NextResponse } from "next/server"

// Mock database - replace with actual MongoDB connection
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    category: "Audio",
    description: "Premium wireless headphones with active noise cancellation",
    image: "/wireless-bluetooth-headphones.jpg",
    stock: 150,
  },
  {
    id: 2,
    name: "Smartwatch with Heart Monitor",
    price: 199.99,
    category: "Wearables",
    description: "Advanced smartwatch with health monitoring",
    image: "/smartwatch-heart-monitor.jpg",
    stock: 80,
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    category: "Audio",
    description: "Compact yet powerful Bluetooth speaker",
    image: "/portable-bluetooth-speaker.jpg",
    stock: 230,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let filtered = products

    if (category) {
      filtered = products.filter((p) => p.category === category)
    }

    return NextResponse.json({
      success: true,
      data: filtered,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

```

### File: `app\api\products\[id]\route.ts`

```ts
import { type NextRequest, NextResponse } from "next/server"

// Mock database
const products: Record<string, any> = {
  "1": {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    category: "Audio",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    image: "/wireless-bluetooth-headphones.jpg",
    stock: 150,
    features: ["Active Noise Cancellation (ANC)", "30-hour battery life", "Bluetooth 5.0", "Foldable design"],
  },
  "2": {
    id: 2,
    name: "Smartwatch with Heart Monitor",
    price: 199.99,
    category: "Wearables",
    description: "Advanced smartwatch with health monitoring features and fitness tracking.",
    image: "/smartwatch-heart-monitor.jpg",
    stock: 80,
    features: ["Heart rate monitor", "GPS tracking", "Water resistant (50m)", "AMOLED display"],
  },
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = products[params.id]

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 })
  }
}

```

### File: `app\cart\page.tsx`

```tsx
"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ArrowLeft } from "lucide-react"
import { useState } from "react"

// Mock cart items
const mockCartItems = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    quantity: 1,
    image: "/wireless-bluetooth-headphones.jpg",
  },
  {
    id: 2,
    name: "Smartwatch with Heart Monitor",
    price: 199.99,
    quantity: 2,
    image: "/smartwatch-heart-monitor.jpg",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-12 md:pb-16">
        <div className="container-responsive">
          <Link href="/shop" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-8">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Your Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Link
                href="/shop"
                className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex gap-6">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                        <p className="text-primary font-semibold mb-4">${item.price.toFixed(2)}</p>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 border-l border-r border-gray-300">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600"
                            >
                              +
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-800 p-2">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg p-6 sticky top-24">
                  <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between mb-8">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg text-primary">${total.toFixed(2)}</span>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full block text-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

```

### File: `app\checkout\page.tsx`

```tsx
"use client"

import type React from "react"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { useState } from "react"
import { ChevronRight, Lock } from "lucide-react"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<"shipping" | "payment" | "review">("shipping")
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    postalCode: "",
    phone: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("card")

  const orderTotal = 852.24
  const subtotal = 784.48
  const shipping = 5.0
  const tax = 62.76

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep("review")
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-12 md:pb-16">
        <div className="container-responsive">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className={`flex items-center gap-2 ${currentStep === "shipping" ? "text-primary" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  currentStep === "shipping" ? "bg-primary text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="hidden sm:inline">Shipping</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
            <div className={`flex items-center gap-2 ${currentStep === "payment" ? "text-primary" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  currentStep === "payment" ? "bg-primary text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="hidden sm:inline">Payment</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
            <div className={`flex items-center gap-2 ${currentStep === "review" ? "text-primary" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  currentStep === "review" ? "bg-primary text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className="hidden sm:inline">Review</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {/* Shipping Step */}
              {currentStep === "shipping" && (
                <div className="bg-white rounded-lg p-6 md:p-8">
                  <h2 className="font-serif text-2xl font-bold mb-6">Shipping Information</h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">First Name *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Last Name *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Company Name</label>
                      <input
                        type="text"
                        value={shippingInfo.company}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, company: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Peak Solutions Inc."
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Street Address *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="123 Main Street"
                      />
                    </div>

                    {/* Apartment */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Apartment, suite, unit, etc. (optional)
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.apartment}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, apartment: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Suite 100"
                      />
                    </div>

                    {/* City & Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">City / Town *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Country / Region *</label>
                        <select
                          value={shippingInfo.country}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>
                    </div>

                    {/* Postal Code & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Postal Code / ZIP *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.postalCode}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="10001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Ship to Different Address */}
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="w-4 h-4 rounded" />
                      Ship to a different address?
                    </label>

                    {/* Order Notes */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Order Notes (optional)</label>
                      <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        rows={4}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === "payment" && (
                <div className="bg-white rounded-lg p-6 md:p-8">
                  <h2 className="font-serif text-2xl font-bold mb-6">Payment Method</h2>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    {/* Payment Method Selection */}
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 p-4 border-2 border-primary rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="font-semibold">Credit / Debit Card</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                        <input
                          type="radio"
                          name="payment"
                          value="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="font-semibold">PayPal</span>
                      </label>
                    </div>

                    {/* Card Details */}
                    {paymentMethod === "card" && (
                      <div className="space-y-4 border-t border-gray-200 pt-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold mb-2">Expiration Date</label>
                            <input
                              type="text"
                              placeholder="MM / YY"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Security Code</label>
                            <input
                              type="text"
                              placeholder="CVC"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                        </div>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="w-4 h-4 rounded" defaultChecked />
                 

... [Content truncated at 15000 characters] ...
```

### File: `app\products\[id]\page.tsx`

```tsx
"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import { Star, ShoppingCart, Truck, Shield } from "lucide-react"

// Mock product data - replace with API call in production
const products: Record<string, any> = {
  "1": {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    rating: 4.8,
    reviews: 234,
    image: "/wireless-bluetooth-headphones.jpg",
    category: "Audio",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    features: [
      "Active Noise Cancellation (ANC)",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Foldable design",
      "Built-in microphone",
      "Touch controls",
    ],
    inStock: true,
  },
  "2": {
    id: 2,
    name: "Smartwatch with Heart Monitor",
    price: 199.99,
    rating: 4.9,
    reviews: 456,
    image: "/smartwatch-heart-monitor.jpg",
    category: "Wearables",
    description: "Advanced smartwatch with health monitoring features and fitness tracking.",
    features: [
      "Heart rate monitor",
      "GPS tracking",
      "Water resistant (50m)",
      "AMOLED display",
      "Sleep tracking",
      "7-day battery life",
    ],
    inStock: true,
  },
  "3": {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    rating: 4.7,
    reviews: 189,
    image: "/portable-bluetooth-speaker.jpg",
    category: "Audio",
    description: "Compact yet powerful Bluetooth speaker perfect for outdoor adventures.",
    features: [
      "360-degree sound",
      "IPX7 water resistance",
      "12-hour battery",
      "Portable design",
      "Stereo pairing",
      "Built-in microphone",
    ],
    inStock: true,
  },
}

export default function ProductPage() {
  const params = useParams()
  const product = products[params.id as string]
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-32 pb-12 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-12 md:pb-16">
        <div className="container-responsive">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <a href="/shop" className="hover:text-primary">
              Shop
            </a>
            <span>/</span>
            <a href="/shop" className="hover:text-primary">
              {product.category}
            </a>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Image */}
            <div>
              <div className="bg-white rounded-lg overflow-hidden sticky top-24">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stock Status */}
                <div className="mb-8">
                  {product.inStock ? (
                    <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 border-l border-r border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setIsAdded(true)
                      setTimeout(() => setIsAdded(false), 2000)
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isAdded ? "Added to Cart!" : "Add to Cart"}
                  </button>
                </div>

                {/* Info Section */}
                <div className="space-y-4 border-t border-gray-200 pt-8">
                  <div className="flex items-start gap-4">
                    <Truck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Free Shipping</h4>
                      <p className="text-sm text-gray-600">On all orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Secure Checkout</h4>
                      <p className="text-sm text-gray-600">Your payment is protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="border-t border-gray-200 pt-12">
            <h2 className="font-serif text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Related products would go here */}
              <p className="text-gray-500">More products coming soon</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

```

### File: `app\shop\page.tsx`

```tsx
"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Filter } from "lucide-react"
import { useState } from "react"

const allProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: "$79.99",
    category: "Audio",
    image: "/wireless-bluetooth-headphones.jpg",
  },
  {
    id: 2,
    name: "Smartwatch with Heart Monitor",
    price: "$199.99",
    category: "Wearables",
    image: "/smartwatch-heart-monitor.jpg",
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: "$89.99",
    category: "Audio",
    image: "/portable-bluetooth-speaker.jpg",
  },
  {
    id: 4,
    name: "Ergonomic Mechanical Keyboard",
    price: "$149.99",
    category: "Peripherals",
    image: "/mechanical-keyboard.png",
  },
  {
    id: 5,
    name: "4K Webcam",
    price: "$99.99",
    category: "Video",
    image: "/4k-webcam.png",
  },
  {
    id: 6,
    name: "Power Bank 20000mAh",
    price: "$35.99",
    category: "Accessories",
    image: "/portable-power-bank.png",
  },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["Audio", "Wearables", "Peripherals", "Video", "Accessories"]
  const filtered = selectedCategory ? allProducts.filter((p) => p.category === selectedCategory) : allProducts

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-12 md:pb-16">
        <div className="container-responsive">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Shop All Products</h1>
          <p className="text-gray-600 mb-8">Browse our collection of premium electronics</p>

          {/* Filter */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-48">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5" />
                <h3 className="font-semibold">Categories</h3>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === null ? "bg-primary text-white" : "hover:bg-gray-200"
                  }`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat ? "bg-primary text-white" : "hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative bg-white rounded-lg overflow-hidden mb-4 aspect-square">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">{product.price}</span>
                        <button
                          className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

```

### File: `app\sign-in\page.tsx`

```tsx
import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-20 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Peak Commerce account</p>
        </div>
        <SignIn
          routing="path"
          path="/sign-in"
          redirectUrl="/shop"
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:opacity-90 text-primary-foreground",
              card: "bg-card border border-border",
              headerTitle: "text-foreground font-serif",
              headerSubtitle: "text-muted-foreground",
              formFieldLabel: "text-foreground",
              formFieldInput: "bg-input border-border text-foreground",
            },
          }}
        />
      </div>
    </div>
  )
}

```

### File: `app\sign-up\page.tsx`

```tsx
import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-20 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join Peak Commerce and discover premium electronics</p>
        </div>
        <SignUp
          routing="path"
          path="/sign-up"
          redirectUrl="/shop"
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:opacity-90 text-primary-foreground",
              card: "bg-card border border-border",
              headerTitle: "text-foreground font-serif",
              headerSubtitle: "text-muted-foreground",
              formFieldLabel: "text-foreground",
              formFieldInput: "bg-input border-border text-foreground",
            },
          }}
        />
      </div>
    </div>
  )
}

```

### File: `components\admin-sidebar.tsx`

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, ShoppingCart, Package, Users, Settings, LogOut } from "lucide-react"
import { SignOutButton } from "@clerk/nextjs"
import { useState } from "react"

const menuItems = [
  { icon: BarChart3, label: "Dashboard", href: "/admin" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">◀</span>
          </div>
          {!isCollapsed && <span className="font-serif font-bold">Peak Admin</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-700"
              }`}
              title={isCollapsed ? item.label : ""}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <span className="text-lg">←→</span>
          {!isCollapsed && <span className="text-sm">Collapse</span>}
        </button>
        <SignOutButton>
          <button className="w-full mt-2 flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </SignOutButton>
      </div>
    </aside>
  )
}

```

### File: `components\cta-section.tsx`

```tsx
"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="container-responsive text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Ready for More?</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Dive into our extensive catalog and find exactly what you need.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
        >
          Explore All Products
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}

```

### File: `components\featured-products.tsx`

```tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: "$79.99",
    image: "/wireless-bluetooth-headphones.jpg",
    category: "Audio",
  },
  {
    id: 2,
    name: "Smartwatch with Heart Monitor",
    price: "$199.99",
    image: "/smartwatch-heart-monitor.jpg",
    category: "Wearables",
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: "$89.99",
    image: "/portable-bluetooth-speaker.jpg",
    category: "Audio",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-responsive">
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">Featured Today</h2>
          <p className="text-gray-600">Handpicked products for the modern lifestyle</p>
        </div>

        <div className="grid-responsive">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="group cursor-pointer">
                <div className="relative bg-white rounded-lg overflow-hidden mb-4 aspect-square">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{product.price}</span>
                  <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

```

### File: `components\footer.tsx`

```tsx
"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 border-t border-gray-800">
      <div className="container-responsive py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Peak Commerce</h3>
            <p className="text-gray-400 text-sm">Premium e-commerce for a modern shopping experience.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Help & Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 text-sm">© 2025 Peak Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

```

### File: `components\hero-section.tsx`

```tsx
"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-primary via-[oklch(0.55_0.14_260)] to-[oklch(0.65_0.1_260)] text-white">
      <div className="container-responsive text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
          Elevate Your Tech Experience
        </h1>
        <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto text-pretty">
          Discover premium electronics designed for seamless living and unparalleled performance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Explore Our Products
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}

```

### File: `components\navigation.tsx`

```tsx
"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { UserButton, useAuth } from "@clerk/nextjs"
import { ShoppingCart, Search, Menu, X } from "lucide-react"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { isSignedIn } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-border z-50">
      <div className="container-responsive">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-primary font-serif text-xl font-semibold">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">◀</span>
            </div>
            Peak Commerce
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-gray-700 hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
              onClick={() => router.push("/search")}
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>

            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-xs flex items-center justify-center rounded-full font-bold">
                0
              </span>
            </button>

            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link
                href="/sign-in"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity hidden sm:block font-medium"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <Link href="/shop" className="block py-2 text-gray-700 hover:text-primary">
              Shop
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-primary">
              Contact
            </Link>
            {!isSignedIn && (
              <Link
                href="/sign-in"
                className="block mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-center font-medium"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

```

### File: `components\testimonials.tsx`

```tsx
"use client"

import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah L.",
    role: "Tech Enthusiast",
    rating: 5,
    quote:
      "Peak Commerce transformed my tech experience. The quality is exceptional and customer service is outstanding.",
    image: "/diverse-woman-avatar.png",
  },
  {
    id: 2,
    name: "John M.",
    role: "Professional",
    rating: 5,
    quote: "The smartwatch is exactly what I needed. Excellent craftsmanship and fast shipping!",
    image: "/man-avatar.png",
  },
  {
    id: 3,
    name: "Emma K.",
    role: "Student",
    rating: 5,
    quote: "Affordable premium quality. Love the products and the seamless checkout experience.",
    image: "/professional-woman-avatar.png",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-responsive">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">What Our Customers Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

```

### File: `components\theme-provider.tsx`

```tsx
'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

```

### File: `lib\api-client.ts`

```ts
export async function fetchProducts(category?: string) {
  const url = new URL("/api/products", window.location.origin)
  if (category) {
    url.searchParams.append("category", category)
  }

  const response = await fetch(url)
  if (!response.ok) throw new Error("Failed to fetch products")
  return response.json()
}

export async function fetchProduct(id: string) {
  const response = await fetch(`/api/products/${id}`)
  if (!response.ok) throw new Error("Failed to fetch product")
  return response.json()
}

export async function createOrder(data: any) {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to create order")
  return response.json()
}

export async function fetchInventory(productId?: number) {
  const url = new URL("/api/inventory", window.location.origin)
  if (productId) {
    url.searchParams.append("productId", productId.toString())
  }

  const response = await fetch(url)
  if (!response.ok) throw new Error("Failed to fetch inventory")
  return response.json()
}

export async function createCheckoutSession(items: any[], total: number) {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, total }),
  })
  if (!response.ok) throw new Error("Failed to create checkout session")
  return response.json()
}

```

### File: `lib\stripe.ts`

```ts
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export default stripe

```

### File: `lib\utils.ts`

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

### File: `styles\globals.css`

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --font-sans: 'Geist', 'Geist Fallback';
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```