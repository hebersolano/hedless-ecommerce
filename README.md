<div align="center">
  <!-- Brief -->
  <h2>Headless E-commerce</h2>
  <p>Full-stack e-commerce app project with React Next.js, Tailwind, and Wix Headless.</p>

  <img src="public/logo.png" alt="logo" width="32px" height="auto">

  <br>
  
  <!-- Screenshot -->
  <a align="center" href="">
    <img src="" alt="preview"  width="60%" style="">
  </a>

  <h3>
    <a href="">
      <strong>Demo Website</strong>
    </a>
  </h3>

  <div>
    <a href="">View Demo</a>
    &emsp;•&emsp;
    <a href="">Report Bug</a>
   &emsp;•&emsp;
    <a href="">Request Feature</a>
  </div>

  <br>
  
  <img src="https://img.shields.io/badge/Status-In_progress-yellow?style=flat" alt="Status" />

  <hr>

</div>

## Table of contents

- [Build process and details: ](BUILD-PROCESS.md)
- [Installation](#installation)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

### Installation

This project use `pnpm` package manager, if you want to use `npm` follow this instructions:

1. Delete `node_modules` folder if already exists.
2. Delete `pnpm_lock.yaml` file (this will be replaced by `package-lock.json`).
3. Replace all pnpm calls to npm in `package.json`
4. Run `npm install`

- Clone this repo:

```sh
git clone https://github.com/hebersolano/case-cobra-hs.git
```

- Install dependencies:

```sh
pnpm install
```

- Create a dev.local file with this variables:

```env
NEXT_PUBLIC_WIX_CLIENT_ID=
NEXT_PUBLIC_WIX_DOMAIN=

NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/login/callback
NEXT_PUBLIC_LOGIN_URI=http://localhost:3000/login
NEXT_PUBLIC_PRODUCTS_PER_PAGE=4

FEATURED_PRODUCTS_CATEGORY_ID=
ALL_PRODUCTS_CATEGORY_ID=00000000-000000-000000-000000000001
```

- Live server:

```sh
npm run dev
```

- Build command:

```sh
npm run build
```

### Author

<b>👤 Heber Solano</b>

<!-- Badges -->
<div>
<ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem">
  <li>
    <a href='https://github.com/hebersolano/' target="_blank"><img alt='Github' src='https://img.shields.io/badge/@hebersolano-100000?style=for-the-badge&logo=Github&logoColor=000&labelColor=fff&color=000'/></a>
  </li>
  <li>
    <a href='https://www.linkedin.com/in/heber-solano/' target="_blank"><img alt='LinkedIn' src='https://img.shields.io/badge/@hebersolano-100000?style=for-the-badge&logo=LinkedIn&logoColor=00a0dc&labelColor=2F2F2F&color=0077b5'/></a>
  </li>
</div>

Feel free to contact me with any questions or feedback!

### Acknowledgments

This app was developed as part of the [Next.js E-Commerce App Full Tutorial with the Best Headless Solution](https://youtu.be/I0BOUiFe9WY). Special thanks to Lama Dev for his teaching. [Original Repo](https://github.com/safak/next-ecommerce.git)
