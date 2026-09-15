# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

### Run locally with Bun

```sh
bun install
bun run dev
```

Open `http://localhost:8080/`.

### Deploy to GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`. It builds the static client with `bun run build:pages`, creates the SPA fallback required for direct links, and deploys the `dist` folder.

GitHub Pages must be enabled for the repository before the deployment job can create a deployment. On GitHub Free, Pages for a private repository is unavailable; make the repository public or use a GitHub plan that supports private Pages.

1. Create a GitHub repository and push this project to its `main` branch:

	```sh
	git remote add origin https://github.com/<your-user>/<your-repository>.git
	git push -u origin main
	```

2. In GitHub, open **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Open the **Actions** tab and wait for **Deploy to GitHub Pages** to finish.
4. Visit `https://<your-user>.github.io/<your-repository>/`.

The Pages build automatically uses the repository name as its base path. For a custom domain, build with `VITE_BASE_PATH=/` instead.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
