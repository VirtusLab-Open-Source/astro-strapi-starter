<div align="center" style="max-width: 10rem; margin: 0 auto">
  <img style="width: 150px; height: auto;" src="https://www.sensinum.com/img/open-source/strapi-astro-blocks/logo.png" alt="Logo - Strapi Astro Loader" />
</div>
<div align="center" style="margin-bottom: 2rem">
  <h1>Astro x Strapi Starter</h1>
  <a href="https://stackblitz.com/~/github.com/VirtusLab-Open-Source/astro-strapi-starter"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" /></a>
</div>

All-in-one starter combining Astro, Strapi CMS, and TailwindCSS with support for **[Strapi Astro Loader](https://github.com/VirtusLab-Open-Source/astro-strapi-loader)** and **[Strapi Astro Blocks Field](https://github.com/VirtusLab-Open-Source/astro-strapi-blocks)**.

---

## ✨ Features

- ⚡ **Astro 5** - Latest version with ultra-fast static sites
- 📝 **Strapi CMS** - Headless CMS for content management
- 🧱 **Strapi Astro Blocks Field** - Modular &amp; flexible content block system
- 🔄 **Strapi Astro Loader** - Automatic content loading from Strapi
- 🎨 **TailwindCSS 4** - Modern utility-first CSS styling
- 📱 **Responsive Design** - Optimized for all devices
- 🌐 **TypeScript** - Full type support

## 🚀 Quick Start

### 1. Use a starter template

```bash
# NPM
npm create astro@latest -- --template VirtusLab-Open-Source/astro-strapi-starter

# Yarn
yarn create astro --template VirtusLab-Open-Source/astro-strapi-starter
```

### 2. Environment Variables Setup

Create a `.env` file in the root directory:

```env
# Strapi Configuration
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your_strapi_api_token_here
```

### 3. Run the Project

```bash
# Development mode
npm run dev
# or
yarn dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## 🗂️ Project Structure

```
/
├── src/
│   ├── components/
│   │   └── blocks/          # Strapi block components
│   │       ├── BlockRenderer.astro
│   │       ├── TextBlock.astro
│   │       ├── QuoteBlock.astro
│   │       ├── MediaBlock.astro
│   │       ├── CTABlock.astro
│   │       └── HeroBlock.astro
│   ├── pages/
│   │   └── index.astro      # Homepage
│   ├── types/
│   │   └── strapi.ts        # TypeScript types for Strapi
│   ├── content.config.ts    # Strapi Loader configuration
│   └── styles/
│   |   └── global.css
│   ├── utils/
│   │   └── media.ts         # Strapi Media utils
├── package.json
└── astro.config.mjs
```

## 📦 Strapi Astro Packages

This project uses:

- `@sensinum/astro-strapi-loader` - Automatic content loading
- `@sensinum/astro-strapi-blocks` - Modular &amp; flexible block system

## 🔨 Available Commands

| Command                | Action                                     |
| :--------------------- | :----------------------------------------- |
| `npm install`          | Installs dependencies                      |
| `npm run dev`          | Starts dev server at `localhost:4321`     |
| `npm run build`        | Build your production site to `./dist/`   |
| `npm run preview`      | Preview your build locally                 |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |

## 🌍 Deploy

### Vercel
1. Connect your repository to Vercel
2. Add environment variables in project settings
3. Deploy!

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

## 📚 Useful Links

- [Astro Documentation](https://docs.astro.build)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Strapi Documentation](https://docs.strapi.io)
- [Sensinum Astro Strapi Loader](https://github.com/VirtusLab-Open-Source/astro-strapi-loader)
- [Sensinum Astro Strapi Blocks Field](https://github.com/VirtusLab-Open-Source/astro-strapi-blocks)

## 🔧 Development

1. Clone the repository
2. Install dependencies:
```bash
yarn
```
3. Run development mode:
```bash
yarn dev
```
4. Check types:
```bash
yarn check
```

## 🤝 Contributing

We welcome contributions to this project! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to:
* Follow the existing code style
* Write tests for new features
* Update documentation as needed
* Keep your PR focused and concise

## 📄 License

Copyright © [Sensinum](https://sensinum.com) &amp; [VirtusLab](https://virtuslab.com)

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details. 