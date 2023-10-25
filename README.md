<p align="center">
<img src="https://img.shields.io/github/contributors/lokisk1155/Fish-Hatchery-Inventory-system" alt="GitHub contributors" />
<img src="https://img.shields.io/github/discussions/lokisk1155/Fish-Hatchery-Inventory-system" alt="GitHub discussions" />
<img src="https://img.shields.io/github/issues/lokisk1155/Fish-Hatchery-Inventory-system" alt="GitHub issues" />
<img src="https://img.shields.io/github/issues-pr/lokisk1155/Fish-Hatchery-Inventory-system" alt="GitHub pull request" />
</p>

<p></p>
<p></p>

## 🔍 Table of Contents

- [💻 Stack](#stack)

- [📝 Architecture](#architecture)

- [⚙️ Setting Up](#setting-up)

- [🚀 Run Locally](#run-locally)

- [🙌 Contributors](#contributors)

- [📄 License](#license)

<br>

# 💻 Stack

- [next](https://nextjs.org/): Next.js utilizes server-side rendering (SSR) and static generation, optimizing application load times. Its versatile nature makes it well-suited for the varied needs of this project.

- [firebase](https://firebase.google.com/): Firebase offers Backend as a Service (BaaS), expediting the development process by utilizing serverless functions combined with efficient caching, eliminating the need for a distinct back-end setup.

- [next-auth](https://next-auth.js.org/): Designed specifically for Next.js, this library seamlessly integrates Firebase authentication within the app. By leveraging Next.js's server-side rendering (SSR), users receive instant feedback based on their authentication state. This not only simplifies client-side logic but also enhances user privacy.

- [swr](https://swr.vercel.app/): Helps facilitate efficient real time data fetching, which is crucial for the fish data timeline.

- [tailwindcss](https://tailwindcss.com/): While the recommendation was to use Material-UI, Tailwind CSS offers a utility-first approach, that I am accustomed to developing with.

- [starter](https://vercel.com/templates/next.js/tailwind-css-starter-blog) This starter kit provided a head start in setting up the basic frontend architecture of the application, allowing for more focus on the unique functionalities required.

<br>

# 📝 Architecture

## Data Structure:

<br>

### FishRecord

- This represents the main data entity in the application. A FishRecord contains information such as the fish's name, type, location, lure used, dimensions, tracking code, images, and the date it was caught.

### NextAuth Session

- Represents the user's session following their successful authentication, which can be accessed using useSession in client components and getServerSession in server-side components. In addition to standard authentication details from the provider, this session encapsulates custom attributes. I add the custom attribute role, which is added and managed through the redirect, jwt, and session callbacks of NextAuth.

## Firebase CRUD Operations:

- GET: Retrieves fish records from the 'fish' reference in the database.
- POST: After role-based access verification using JWT tokens, new fish records are created with unique IDs using Firebase's push() and set() functions.
- PUT: Updates are restricted to admin users. The specific fish record is targeted using its ID and updated with the given data.
- DELETE: After admin role verification, the target fish record is removed based on its unique ID.

### NextAuth Session

- When authentication is successful, the redirect callback modifies the redirection URL depending on the login button pressed by the user. This approach was adopted for testing due to the limitations of not being able to pass a cookie in headers or access sessionStorage and localStorage within NextAuth's callbacks. In a production setting, roles would ideally be managed through the database or by setting authorizations in the jwt callback against a list of emails designated for admin privileges. The role, while temporary, is stored for the session's duration. The JWT callback integrates this role into the user's JWT, ensuring the role is associated with the user's session. Subsequently, the session callback ensures this role is accessible within the session on the client side.

## Authorization & Validation:

- Before performing certain operations, the application validates the user's token using getToken from next-auth/jwt.
- Functions like isAdmin verify if the logged-in user is an administrator.
  Data Validation: isValidRecord is a utility that ensures the incoming data for a fish record is of the correct format.

## Pages:

<br>
 
### Home
- Presents the dashboard title and description sourced from site metadata.
Dynamically renders a list of navigational links using the CustomLink component. Each link is derived from the headerNavLinks data set and prominently displays the title in a large, easily readable font.

### Fish

- This page displays a timeline of recorded fish data.
  The data for the fish is fetched using useSWR which fetches from the APP directory API endpoint for fish.
  The data is displayed using the Timeline component.
  For admin users, there's a modal functionality to modify fish records using FishRecordForm, along with viewing historical data on fish index pages.

### Authentication Portal

- Assesses the user's login state through the server session.
  If authenticated, the page displays the user's name, their role and provides a sign-out button. Otherwise the page presents options to log in as either an admin or a regular user.
  Contingent on the user's authentication state, the portal switches between rendering the UserLoggedIn or UserLoggedOut component.

<br>

## ⚙️ Setting Up

#### Your Environment Variable

Create firebase project with google auth to get keys

```
GOOGLE_CLIENT_ID= (found in firebase auth)
GOOGLE_CLIENT_SECRET= (found in firebase auth)
NEXTAUTH_URL= (base url of your envir)
NEXTAUTH_SECRET= (your own secret)
ADMIN_EMAIL= (found in firebase project settings)
FIREBASE_API_KEY=  (found in firebase project settings)
FIREBASE_AUTH_DOMAIN=  (found in firebase project settings)
FIREBASE_DATABASE_URL=  (found in firebase project settings)
FIREBASE_STORAGE_BUCKET=  (found in firebase project settings)
FIREBASE_MESSENGER_SEND=  (found in firebase project settings)
FIREBASE_APP_ID=  (found in firebase project settings)
NEXT_PUBLIC_URL= (base url of your envir)
PROJECT_ID= (found in firebase project settings)
```

<br>

## 🚀 Run Locally

1.Clone the Fish-Hatchery-Inventory-system repository:

```sh
git clone https://github.com/lokisk1155/Fish-Hatchery-Inventory-system
```

2.Install the dependencies with one of the package managers listed below:

```bash
pnpm install
bun install
npm install
yarn install
```

3.Start the development mode:

```bash
pnpm dev
bun dev
npm run dev
yarn dev
```

## 🙌 Contributor

<table style="border:1px solid #404040;text-align:center;width:100%">
<tr><td style="width:14.29%;border:1px solid #404040;">
        <a href="https://github.com/lokisk1155" spellcheck="false">
          <img src="https://avatars.githubusercontent.com/u/95663040?v=4?s=100" width="100px;" alt="lokisk1155"/>
          <br />
          <b>lokisk1155</b>
        </a>
        <br />
        <a href="https://github.com/lokisk1155/Fish-Hatchery-Inventory-system/commits?author=lokisk1155" title="Contributions" spellcheck="false">
          23 contributions
        </a>
      </td></table>

## 📄 License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/lokisk1155/Fish-Hatchery-Inventory-system/blob/main/LICENSE) file for details.
