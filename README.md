# AI Multiplatform Project Skeleton

This monorepo is a practical starting point for an AI product that supports Web, Mobile, and Desktop clients, with backend APIs for:

- Chat
- Image generation
- Video generation
- Poster generation
- Product image generation
- Detail image generation

## Tech Stack

- Backend: NestJS (TypeScript)
- Web: Next.js placeholder app package
- Mobile: Flutter placeholder
- Desktop: Tauri/Electron placeholder
- CI: GitHub Actions (api/web/mobile/desktop/monorepo)

## Repository Structure

- `apps/api` - NestJS backend API + task endpoints
- `apps/web` - web app package placeholder
- `apps/mobile` - Flutter placeholder
- `apps/desktop` - desktop placeholder
- `.github/workflows` - CI workflows

## Backend API (current)

- `POST /ai/tasks` create generation task
- `GET /ai/tasks/:id` query single task
- `GET /ai/tasks?userId=...` list tasks (optional user filter)

Supported task types:

- `chat`
- `image`
- `video`
- `poster`
- `product_image`
- `detail_image`

## CI Workflows

- `ci-api.yml`: lint + test + build for API
- `ci-web.yml`: lint + test + build for Web package
- `ci-mobile.yml`: Flutter checks (auto-skip if Flutter app not initialized)
- `ci-desktop.yml`: Desktop checks (auto-skip if app not initialized)
- `ci-monorepo.yml`: top-level lint/test/build

## Push to GitHub

If this local branch has no remote configured, run:

```bash
git remote add origin <your_repo_url>
git push -u origin work
```
