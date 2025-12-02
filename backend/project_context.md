# Project Context Map for: mini-ecommerce-backend

This file contains the directory structure and the contents of important project files.

---

## 1. Directory Structure

├── .env
├── package-lock.json
├── package.json
├── project_mapper.py
├── tsconfig.json
│   ├── **prisma/**
│   │   ├── schema.prisma
│   │   ├── **migrations/**
│   │   │   ├── migration_lock.toml
│   │   │   ├── **20251128144503_init/**
│   │   │   │   ├── migration.sql
│   ├── **src/**
│   │   ├── prisma.ts
│   │   ├── redis.ts
│   │   ├── server.ts
│   │   ├── **auth/**
│   │   │   ├── routes.ts
│   │   ├── **controllers/**
│   │   │   ├── cart.ts
│   │   │   ├── checkout.ts
│   │   │   ├── orders.ts
│   │   │   ├── product.ts
│   │   ├── **middleware/**
│   │   │   ├── auth.ts
│   │   ├── **routes/**
│   │   │   ├── productRoutes.ts
│   │   ├── **services/**
│   │   │   ├── email.ts
│   │   │   ├── payment.ts
│   │   ├── **utils/**
│   │   │   ├── jwt.ts
│   │   ├── **validation/**
│   │   │   ├── schemas.ts

---

## 2. File Contents


### File: `.env`

```text
DATABASE_URL="postgresql://postgres:Takudzwa%2388@localhost:5432/ecom"

JWT_SECRET="super-secret-change-this"

# (Temporary dummy Redis — safe)
REDIS_URL=""

MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=e1041a0ce16027
MAIL_PASS=****bdf5

NODE_ENV=development

```

### File: `package-lock.json`

```json
{
  "name": "ecom-backend-starter",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "ecom-backend-starter",
      "version": "1.0.0",
      "dependencies": {
        "@prisma/client": "^5.0.0",
        "bcrypt": "^5.1.0",
        "cors": "^2.8.5",
        "dotenv": "^16.0.0",
        "express": "^4.18.2",
        "helmet": "^6.0.0",
        "ioredis": "^5.2.0",
        "jsonwebtoken": "^9.0.0",
        "morgan": "^1.10.0",
        "nodemailer": "^6.9.1",
        "zod": "^3.24.2"
      },
      "devDependencies": {
        "@types/cors": "^2.8.19",
        "@types/express": "^5.0.5",
        "prisma": "^5.0.0",
        "ts-node-dev": "^2.0.0",
        "typescript": "^5.0.0"
      }
    },
    "node_modules/@cspotcode/source-map-support": {
      "version": "0.8.1",
      "resolved": "https://registry.npmjs.org/@cspotcode/source-map-support/-/source-map-support-0.8.1.tgz",
      "integrity": "sha512-IchNf6dN4tHoMFIn/7OE8LWZ19Y6q/67Bmf6vnGREv8RSbBVb9LPJxEcnwrcwX6ixSvaiGoomAUvu4YSxXrVgw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/trace-mapping": "0.3.9"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@ioredis/commands": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/@ioredis/commands/-/commands-1.4.0.tgz",
      "integrity": "sha512-aFT2yemJJo+TZCmieA7qnYGQooOS7QfNmYrzGtsYd3g9j5iDP8AimYYAesf79ohjbLG12XxC4nG5DyEnC88AsQ==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.9",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.9.tgz",
      "integrity": "sha512-3Belt6tdc8bPgAtbcmdtNJlirVoTmEb5e2gC94PnkwEW9jI6CAHUeoG85tjWP5WquqfavoMtMwiG4P926ZKKuQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.0.3",
        "@jridgewell/sourcemap-codec": "^1.4.10"
      }
    },
    "node_modules/@mapbox/node-pre-gyp": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@mapbox/node-pre-gyp/-/node-pre-gyp-1.0.11.tgz",
      "integrity": "sha512-Yhlar6v9WQgUp/He7BdgzOz8lqMQ8sU+jkCq7Wx8Myc5YFJLbEe7lgui/V7G1qB1DJykHSGwreceSaD60Y0PUQ==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "detect-libc": "^2.0.0",
        "https-proxy-agent": "^5.0.0",
        "make-dir": "^3.1.0",
        "node-fetch": "^2.6.7",
        "nopt": "^5.0.0",
        "npmlog": "^5.0.1",
        "rimraf": "^3.0.2",
        "semver": "^7.3.5",
        "tar": "^6.1.11"
      },
      "bin": {
        "node-pre-gyp": "bin/node-pre-gyp"
      }
    },
    "node_modules/@prisma/client": {
      "version": "5.22.0",
      "resolved": "https://registry.npmjs.org/@prisma/client/-/client-5.22.0.tgz",
      "integrity": "sha512-M0SVXfyHnQREBKxCgyo7sffrKttwE6R8PMq330MIUF0pTwjUhLbW84pFDlf06B27XyCR++VtjugEnIHdr07SVA==",
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=16.13"
      },
      "peerDependencies": {
        "prisma": "*"
      },
      "peerDependenciesMeta": {
        "prisma": {
          "optional": true
        }
      }
    },
    "node_modules/@prisma/debug": {
      "version": "5.22.0",
      "resolved": "https://registry.npmjs.org/@prisma/debug/-/debug-5.22.0.tgz",
      "integrity": "sha512-AUt44v3YJeggO2ZU5BkXI7M4hu9BF2zzH2iF2V5pyXT/lRTyWiElZ7It+bRH1EshoMRxHgpYg4VB6rCM+mG5jQ==",
      "devOptional": true,
      "license": "Apache-2.0"
    },
    "node_modules/@prisma/engines": {
      "version": "5.22.0",
      "resolved": "https://registry.npmjs.org/@prisma/engines/-/engines-5.22.0.tgz",
      "integrity": "sha512-UNjfslWhAt06kVL3CjkuYpHAWSO6L4kDCVPegV6itt7nD1kSJavd3vhgAEhjglLJJKEdJ7oIqDJ+yHk6qO8gPA==",
      "devOptional": true,
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@prisma/debug": "5.22.0",
        "@prisma/engines-version": "5.22.0-44.605197351a3c8bdd595af2d2a9bc3025bca48ea2",
        "@prisma/fetch-engine": "5.22.0",
        "@prisma/get-platform": "5.22.0"
      }
    },
    "node_modules/@prisma/engines-version": {
      "version": "5.22.0-44.605197351a3c8bdd595af2d2a9bc3025bca48ea2",
      "resolved": "https://registry.npmjs.org/@prisma/engines-version/-/engines-version-5.22.0-44.605197351a3c8bdd595af2d2a9bc3025bca48ea2.tgz",
      "integrity": "sha512-2PTmxFR2yHW/eB3uqWtcgRcgAbG1rwG9ZriSvQw+nnb7c4uCr3RAcGMb6/zfE88SKlC1Nj2ziUvc96Z379mHgQ==",
      "devOptional": true,
      "license": "Apache-2.0"
    },
    "node_modules/@prisma/fetch-engine": {
      "version": "5.22.0",
      "resolved": "https://registry.npmjs.org/@prisma/fetch-engine/-/fetch-engine-5.22.0.tgz",
      "integrity": "sha512-bkrD/Mc2fSvkQBV5EpoFcZ87AvOgDxbG99488a5cexp5Ccny+UM6MAe/UFkUC0wLYD9+9befNOqGiIJhhq+HbA==",
      "devOptional": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@prisma/debug": "5.22.0",
        "@prisma/engines-version": "5.22.0-44.605197351a3c8bdd595af2d2a9bc3025bca48ea2",
        "@prisma/get-platform": "5.22.0"
      }
    },
    "node_modules/@prisma/get-platform": {
      "version": "5.22.0",
      "resolved": "https://registry.npmjs.org/@prisma/get-platform/-/get-platform-5.22.0.tgz",
      "integrity": "sha512-pHhpQdr1UPFpt+zFfnPazhulaZYCUqeIcPpJViYoq9R+D/yw4fjE+CtnsnKzPYm0ddUbeXUzjGVGIRVgPDCk4Q==",
      "devOptional": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@prisma/debug": "5.22.0"
      }
    },
    "node_modules/@tsconfig/node10": {
      "version": "1.0.12",
      "resolved": "https://registry.npmjs.org/@tsconfig/node10/-/node10-1.0.12.tgz",
      "integrity": "sha512-UCYBaeFvM11aU2y3YPZ//O5Rhj+xKyzy7mvcIoAjASbigy8mHMryP5cK7dgjlz2hWxh1g5pLw084E0a/wlUSFQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@tsconfig/node12": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@tsconfig/node12/-/node12-1.0.11.tgz",
      "integrity": "sha512-cqefuRsh12pWyGsIoBKJA9luFu3mRxCA+ORZvA4ktLSzIuCUtWVxGIuXigEwO5/ywWFMZ2QEGKWvkZG1zDMTag==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@tsconfig/node14": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@tsconfig/node14/-/node14-1.0.3.tgz",
      "integrity": "sha512-ysT8mhdixWK6Hw3i1V2AeRqZ5WfXg1G43mqoYlM2nc6388Fq5jcXyr5mRsqViLx/GJYdoL0bfXD8nmF+Zn/Iow==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@tsconfig/node16": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/@tsconfig/node16/-/node16-1.0.4.tgz",
      "integrity": "sha512-vxhUy4J8lyeyinH7Azl1pdd43GJhZH/tP2weN8TntQblOY+A0XbT8DJk1/oCPuOOyg/Ja757rG0CgHcWC8OfMA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/body-parser": {
      "version": "1.19.6",
      "resolved": "https://registry.npmjs.org/@types/body-parser/-/body-parser-1.19.6.tgz",
      "integrity": "sha512-HLFeCYgz89uk22N5Qg3dvGvsv46B8GLvKKo1zKG4NybA8U2DiEO3w9lqGg29t/tfLRJpJ6iQxnVw4OnB7MoM9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/connect": "*",
        "@types/node": "*"
      }
    },
    "node_modules/@types/connect": {
      "version": "3.4.38",
      "resolved": "https://registry.npmjs.org/@types/connect/-/connect-3.4.38.tgz",
      "integrity": "sha512-K6uROf1LD88uDQqJCktA4yzL1YYAK6NgfsI0v/mTgyPKWsX1CnJ0XPSDhViejru1GcRkLWb8RlzFYJRqGUbaug==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/cors": {
      "version": "2.8.19",
      "resolved": "https://registry.npmjs.org/@types/cors/-/cors-2.8.19.tgz",
      "integrity": "sha512-mFNylyeyqN93lfe/9CSxOGREz8cpzAhH+E93xJ4xWQf62V8sQ/24reV2nyzUWM6H6Xji+GGHpkbLe7pVoUEskg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/express": {
      "version": "5.0.5",
      "resolved": "https://registry.npmjs.org/@types/express/-/express-5.0.5.tgz",
      "integrity": "sha512-LuIQOcb6UmnF7C1PCFmEU1u2hmiHL43fgFQX67sN3H4Z+0Yk0Neo++mFsBjhOAuLzvlQeqAAkeDOZrJs9rzumQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/body-parser": "*",
        "@types/express-serve-static-core": "^5.0.0",
        "@types/serve-static": "^1"
      }
    },
    "node_modules/@types/express-serve-static-core": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-5.1.0.tgz",
      "integrity": "sha512-jnHMsrd0Mwa9Cf4IdOzbz543y4XJepXrbia2T4b6+spXC2We3t1y6K44D3mR8XMFSXMCf3/l7rCgddfx7UNVBA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*",
        "@types/qs": "*",
        "@types/range-parser": "*",
        "@types/send": "*"
      }
    },
    "node_modules/@types/http-errors": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@types/http-errors/-/http-errors-2.0.5.tgz",
      "integrity": "sha512-r8Tayk8HJnX0FztbZN7oVqGccWgw98T/0neJphO91KkmOzug1KkofZURD4UaD5uH8AqcFLfdPErnBod0u71/qg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/mime": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/@types/mime/-/mime-1.3.5.tgz",
      "integrity": "sha512-/pyBZWSLD2n0dcHE3hq8s8ZvcETHtEuF+3E7XVt0Ig2nvsVQXdghHVcEkIWjy9A0wKfTn97a/PSDYohKIlnP/w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "24.10.1",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-24.10.1.tgz",
      "integrity": "sha512-GNWcUTRBgIRJD5zj+Tq0fKOJ5XZajIiBroOF0yvj2bSU1WvNdYS/dn9UxwsujGW4JX06dnHyjV2y9rRaybH0iQ==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "undici-types": "~7.16.0"
      }
    },
    "node_modules/@types/qs": {
      "version": "6.14.0",
      "resolved": "https://registry.npmjs.org/@types/qs/-/qs-6.14.0.tgz",
      "integrity": "sha512-eOunJqu0K1923aExK6y8p6fsihYEn/BYuQ4g0CxAAgFc4b/ZLN4CrsRZ55srTdqoiLzU2B2evC+apEIxprEzkQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/range-parser": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/@types/range-parser/-/range-parser-1.2.7.tgz",
      "integrity": "sha512-hKormJbkJqzQGhziax5PItDUTMAM9uE2XXQmM37dyd4hVM+5aVl7oVxMVUiVQn2oCQFN/LKCZdvSM0pFRqbSmQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/send": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@types/send/-/send-1.2.1.tgz",
      "integrity": "sha512-arsCikDvlU99zl1g69TcAB3mzZPpxgw0UQnaHeC1Nwb015xp8bknZv5rIfri9xTOcMuaVgvabfIRA7PSZVuZIQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/serve-static": {
      "version": "1.15.10",
      "resolved": "https://registry.npmjs.org/@types/serve-static/-/serve-static-1.15.10.tgz",
      "integrity": "sha512-tRs1dB+g8Itk72rlSI2ZrW6vZg0YrLI81iQSTkMmOqnqCaNr/8Ek4VwWcN5vZgCYWbg/JJSGBlUaYGAOP73qBw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/http-errors": "*",
        "@types/node": "*",
        "@types/send": "<1"
      }
    },
    "node_modules/@types/serve-static/node_modules/@types/send": {
      "version": "0.17.6",
      "resolved": "https://registry.npmjs.org/@types/send/-/send-0.17.6.tgz",
      "integrity": "sha512-Uqt8rPBE8SY0RK8JB1EzVOIZ32uqy8HwdxCnoCOsYrvnswqmFZ/k+9Ikidlk/ImhsdvBsloHbAlewb2IEBV/Og==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/mime": "^1",
        "@types/node": "*"
      }
    },
    "node_modules/@types/strip-bom": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/@types/strip-bom/-/strip-bom-3.0.0.tgz",
      "integrity": "sha512-xevGOReSYGM7g/kUBZzPqCrR/KYAo+F0yiPc85WFTJa0MSLtyFTVTU6cJu/aV4mid7IffDIWqo69THF2o4JiEQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/strip-json-comments": {
      "version": "0.0.30",
      "resolved": "https://registry.npmjs.org/@types/strip-json-comments/-/strip-json-comments-0.0.30.tgz",
      "integrity": "sha512-7NQmHra/JILCd1QqpSzl8+mJRc8ZHz3uDm8YV1Ks9IhK0epEiTw8aIErbvH9PI+6XbqhyIQy3462nEsn7UVzjQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/abbrev": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/abbrev/-/abbrev-1.1.1.tgz",
      "integrity": "sha512-nne9/IiQ/hzIhY6pdDnbBtz7DjPTKrY00P/zvPSm5pOFkl6xuGrGnXn/VtTNNfNtAfZ9/1RtehkszU9qcTii0Q==",
      "license": "ISC"
    },
    "node_modules/accepts": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "~2.1.34",
        "negotiator": "0.6.3"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/acorn": {
      "version": "8.15.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.15.0.tgz",
      "integrity": "sha512-NZyJarBfL7nWwIq+FDL6Zp/yHEhePMNnnJ0y3qfieCrmNvYct8uvtiV41UvlSe6apAfk0fY1FbWx+NwfmpvtTg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-walk": {
      "version": "8.3.4",
      "resolved": "https://registry.npmjs.org/acorn-walk/-/acorn-walk-8.3.4.tgz",
      "integrity": "sha512-ueEepnujpqee2o5aIYnvHU6C0A42MNdsIDeqy5BydrkuC5R1ZuUFnm27EeFJGoEHJQgn3uleRvmTXaJgfXbt4g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "acorn": "^8.11.0"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/agent-base": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-6.0.2.tgz",
      "integrity": "sha512-RZNwN

... [Content truncated at 15000 characters] ...
```

### File: `package.json`

```json
{
  "name": "ecom-backend-starter",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev"
  },
  "dependencies": {
    "@prisma/client": "^5.0.0",
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.2",
    "helmet": "^6.0.0",
    "ioredis": "^5.2.0",
    "jsonwebtoken": "^9.0.0",
    "morgan": "^1.10.0",
    "nodemailer": "^6.9.1",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.5",
    "prisma": "^5.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.0"
  }
}

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

### File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}

```

### File: `prisma\schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  mobile    String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  carts     Cart[]
  orders    Order[]
}

model Product {
  id          String      @id @default(cuid())
  name        String
  description String?
  price       Float
  sku         String?     @unique
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  cartItems   CartItem[]
  inventory   Inventory?
  orderItems  OrderItem[]
}

model Inventory {
  id        String   @id @default(cuid())
  productId String   @unique
  quantity  Int
  updatedAt DateTime @updatedAt
  product   Product  @relation(fields: [productId], references: [id])
}

model Cart {
  id        String     @id @default(cuid())
  userId    String
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  user      User       @relation(fields: [userId], references: [id])
  items     CartItem[]
}

model CartItem {
  id        String   @id @default(cuid())
  cartId    String
  productId String
  quantity  Int
  unitPrice Float
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  cart      Cart     @relation(fields: [cartId], references: [id])
  product   Product  @relation(fields: [productId], references: [id])

  @@index([cartId])
  @@index([productId])
}

model Order {
  id              String      @id @default(cuid())
  userId          String
  total           Float
  status          OrderStatus @default(PENDING)
  paymentId       String?
  shippingName    String
  shippingEmail   String
  shippingAddress String
  shippingMobile  String
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  user            User        @relation(fields: [userId], references: [id])
  items           OrderItem[]
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  unitPrice Float
  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}

enum Role {
  USER
  ADMIN
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  FAILED
}

```

### File: `prisma\migrations\migration_lock.toml`

```toml
# Please do not edit this file manually
# It should be added in your version-control system (i.e. Git)
provider = "postgresql"
```

### File: `prisma\migrations\20251128144503_init\migration.sql`

```sql
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "mobile" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "sku" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paymentId" TEXT,
    "shippingName" TEXT NOT NULL,
    "shippingEmail" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "shippingMobile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productId_key" ON "Inventory"("productId");

-- CreateIndex
CREATE INDEX "CartItem_cartId_idx" ON "CartItem"("cartId");

-- CreateIndex
CREATE INDEX "CartItem_productId_idx" ON "CartItem"("productId");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

```

### File: `src\prisma.ts`

```ts
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
```

### File: `src\redis.ts`

```ts
// src/redis.ts
export const redis = {
  get: async () => null,
  set: async () => {},
  del: async () => {},
};

```

### File: `src\server.ts`

```ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import productRoutes from "./routes/productRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Root test
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Product routes
app.use("/products", productRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

```

### File: `src\auth\routes.ts`

```ts
import express from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import { signToken } from "../utils/jwt";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password, name, mobile } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hash, name, mobile }});
  const token = signToken({ id: user.id, email: user.email });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email }});
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = signToken({ id: user.id, email: user.email });
  res.json({ token });
});

export default router;
```

### File: `src\controllers\cart.ts`

```ts
import { Request, Response } from "express";
import { prisma } from "../prisma";
import { addCartItemSchema } from "../validation/schemas";

const getOrCreateCart = async (userId: string) => {
  let cart = await prisma.cart.findFirst({ where: { userId }, include: { items: true }});
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId }, include: { items: true }});
  } else {
    cart = await prisma.cart.findUnique({ where: { id: cart.id }, include: { items: { include: { product: true }}}});
  }
  return cart;
};

export const addItem = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { productId, quantity } = addCartItemSchema.parse(req.body);

  const product = await prisma.product.findUnique({ where: { id: productId }, include: { inventory: true }});
  if (!product) return res.status(404).json({ error: "Product not found" });
  if (product.inventory && product.inventory.quantity < quantity) return res.status(400).json({ error: "Insufficient inventory" });

  const cart = await getOrCreateCart(userId);

  const existing = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId }});
  if (existing) {
    const updated = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity, unitPrice: product.price }
    });
    return res.json(updated);
  } else {
    const item = await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity, unitPrice: product.price }
    });
    return res.status(201).json(item);
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  if (typeof quantity !== "number" || quantity < 0) return res.status(400).json({ error: "Invalid quantity" });

  const item = await prisma.cartItem.findUnique({ where: { id: itemId }, include: { product: { include: { inventory: true }}}});
  if (!item) return res.status(404).json({ error: "Cart item not found" });
  if (item.product.inventory && item.product.inventory.quantity < quantity) return res.status(400).json({ error: "Insufficient inventory" });

  if (quantity === 0) {
    await prisma.cartItem.delete({ where: { id: itemId }});
    return res.status(204).send();
  } else {
    const updated = await prisma.cartItem.update({ where: { id: itemId }, data: { quantity }});
    return res.json(updated);
  }
};

export const removeItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;
  await prisma.cartItem.delete({ where: { id: itemId }});
  res.status(204).send();
};

export const getCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const cart = await getOrCreateCart(userId);
  const cartWithItems = await prisma.cart.findUnique({ where: { id: cart.id }, include: { items: { include: { product: { include: { inventory: true }}}}}});
  res.json(cartWithItems);
};
```

### File: `src\controllers\checkout.ts`

```ts
import { Request, Response } from "express";
import { prisma } from "../prisma";
import { checkoutSchema } from "../validation/schemas";
import { processMockPayment } from "../services/payment";
import { sendOrderConfirmation } from "../services/email";
import { Prisma } from '@prisma/client';

export const checkout = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const body = checkoutSchema.parse(req.body);

  const cart = await prisma.cart.findFirst({ where: { userId }, include: { items: { include: { product: true } } }});
  if (!cart || cart.items.length === 0) return res.status(400).json({ error: "Cart is empty" });

  const total = cart.items.reduce((s, it) => s + it.unitPrice * it.quantity, 0);

  try {
    const result = await prisma.$transaction(async (prismaTx) => {
      const productIds = cart.items.map(it => it.productId);
      await prismaTx.$queryRaw`SELECT id, productId, quantity FROM "Inventory" WHERE "productId" IN (${Prisma.join(productIds)}) FOR UPDATE`;

      const inventories = await prismaTx.inventory.findMany({ where: { productId: { in: productIds }}});
      const invMap = new Map(inventories.map(i => [i.productId, i]));

      for (const item of cart.items) {
        const inv = invMap.get(item.productId);
        const stock = inv ? inv.quantity : 0;
        if (stock < item.quantity) throw new Error(`Insufficient stock for product ${item.productId}`);
      }

      for (const item of cart.items) {
        await prismaTx.inventory.update({ where: { productId: item.productId }, data: { quantity: { decrement: item.quantity }}});
      }

      const order = await prismaTx.order.create({
        data: {
          userId,
          total,
          status: "PENDING",
          shippingName: body.shippingName,
          shippingEmail: body.shippingEmail,
          shippingAddress: body.shippingAddress,
          shippingMobile: body.shippingMobile
        }
      });

      for (const item of cart.items) {
        await prismaTx.orderItem.create({ data: { orderId: order.id, productId: item.productId, quantity: item.quantity, unitPrice: item.unitPrice }});
      }

      await prismaTx.cartItem.deleteMany({ where: { cartId: cart.id }});

      return order;
    });

    const payment = await processMockPayment(userId, total);

    const finalOrder = await prisma.order.update({
      where: { id: result.id },
      data: { paymentId: payment.transactionId, status: payment.success ? "PROCESSING" : "FAILED" },
      include: { items: true }
    });

    sendOrderConfirmation(body.shippingEmail, finalOrder.id).catch(err => console.error("mail err", err));

    res.json({ order: finalOrder });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({ error: err.message || "Checkout failed" });
  }
};
```

### File: `src\controllers\orders.ts`

```ts
import { Request, Response } from "express";
import { prisma } from "../prisma";

export const listUserOrders = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const orders = await prisma.order.findMany({ where: { userId }, include: { items: true }});
  res.json(orders);
};

export const listAllOrders = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({ include: { items: true, user: true }});
  res.json(orders);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await prisma.order.update({ where: { id }, data: { status }});
  res.json(updated);
};
```

### File: `src\controllers\product.ts`

```ts
import { Request, Response } from "express";
import { prisma } from "../prisma";
import { redis } from "../redis";
import { productCreateSchema } from "../validation/schemas";

// Safe Redis helpers
async function safeGet(key: string) {
  try {
    return await redis.get(key);
  } catch {
    return null;
  }
}

async function safeSet(key: string, value: any, ttl: number) {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  } catch {}
}

async function safeDeletePattern(pattern: string) {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) await redis.del(keys);
  } catch {}
}

// GET /products
export const listProducts = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const cacheKey = `products:page:${page}:limit:${limit}`;

    const cached = await safeGet(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const products = await prisma.product.findMany({
      take: limit,
      skip: (page - 1) * limit,
      include: { inventory: true },
      orderBy: { createdAt: "desc" },
    });

    await safeSet(cacheKey, products, 30);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

// GET /products/:id
export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const cacheKey = `product:${id}`;

    const cached = await safeGet(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const product = await prisma.product.findUnique({
      where: { id },
      include: { inventory: true },
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    await safeSet(cacheKey, product, 60);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

// POST /products
export const createProduct = async (req: Request, res: Response) => {
  try {
    const parsed = productCreateSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ error: "Invalid data", details: parsed.error });

    const data = parsed.data;

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        price: data.price,
        sku: data.sku ?? null,
      },
    });

    if (data.inventory) {
      await prisma.inventory.create({
        data: { productId: product.id, quantity: data.inventory.quantity },
      });
    }

    await safeDeletePattern("products:*");
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

// PUT /products/:id
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const updated = await prisma.product.update({
      where: { id },
      data: req.body,
    });

    await safeDeletePattern("products:*");
    await safeDeletePattern(`product:${id}`);

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err });
  }
};

// DELETE /products/:id
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    await prisma.product.delete({
      where: { id },
    });

    await safeDeletePattern("products:*");
    await safeDeletePattern(`product:${id}`);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Delete failed", details: err });
  }
};

```

### File: `src\middleware\auth.ts`

```ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { prisma } from "../prisma";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "No token" });
  const token = auth.split(" ")[1];
  try {
    const payload = verifyToken(token);
    const user = await prisma.user.findUnique({ where: { id: (payload as any).id } });
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(403).json({ error: "Not authenticated" });
  if (req.user.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
  next();
};
```

### File: `src\routes\productRoutes.ts`

```ts
import { Router } from "express";
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;

```

### File: `src\services\email.ts`

```ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const sendOrderConfirmation = async (to: string, orderId: string) => {
  const fakeKey = `FAKE-KEY-${Math.random().toString(36).slice(2,10).toUpperCase()}`;
  const info = await transporter.sendMail({
    from: "no-reply@ecom.local",
    to,
    subject: `Order ${orderId} Confirmation`,
    text: `Thank you for your order. Confirmation code: ${fakeKey}`
  });
  return { messageId: info.messageId, fakeKey };
};
```

### File: `src\services\payment.ts`

```ts
export const processMockPayment = async (userId: string, amount: number) => {
  await new Promise((r) => setTimeout(r, 300));
  return { success: true, transactionId: `MOCK_TX_${Date.now()}` };
};
```

### File: `src\utils\jwt.ts`

```ts
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET || "change-me";

export const signToken = (payload: object, expiresIn = "7d") =>
  jwt.sign(payload, SECRET, { expiresIn });

export const verifyToken = (token: string) =>
  jwt.verify(token, SECRET) as any;
```

### File: `src\validation\schemas.ts`

```ts
import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  sku: z.string().optional(),
  inventory: z.object({
    quantity: z.number().int().nonnegative()
  }).optional()
});

export const addCartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive()
});

export const checkoutSchema = z.object({
  shippingName: z.string().min(1),
  shippingEmail: z.string().email(),
  shippingAddress: z.string().min(5),
  shippingMobile: z.string().min(5),
  paymentMethod: z.enum(["mock"]).default("mock")
});
```