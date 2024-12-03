# Complex Metronome
A web application which helps us practicing complex-timed music such as 5/8.

## How to Use
visit https://motooka.github.io/complex-metronome/

## Technical Notes
- This is a [Next.js](https://nextjs.org) app, which was initialized with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
- see [.node-version](.node-version)
- how to set up local development environment : `git clone`, `npm install`

### Daily Commands
- `npm run dev` → [http://localhost:3000/complex-metronome/](http://localhost:3000/complex-metronome/)
- `npm run build` →static export (static site generation) to the directory named `out`
- `npm run serve` → serve the contents of the `out` directory on [http://localhost:3000/complex-metronome/](http://localhost:3000/complex-metronome/)
- `npm run lint` → lint
- if we push something on `main` branch, a GitHub Actions job will deploy it into GitHub Pages.

## License
[MIT LICENSE](./LICENSE)
