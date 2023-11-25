# [Fish Hatchery Inventory System (live)](https://fish-inventory.vercel.app/)

# 💻 Stack

[next](https://nextjs.org/): Next.js was an easy decision due to its comprehensive capabilities. Built on top of React, it guarantees a responsive front-end interface. The API routes facilitate the creation of public APIs through serverless functions that connect directly to Firebase. Moreover, hosting is simplified with integration from Vercel. Although cold starts can be a concern in certain situations, our system's emphasis on real-time updates effectively mitigates this problem.

[firebase](https://firebase.google.com/): Firebase offers Backend as a Service (BaaS), expediting the development process by utilizing serverless functions combined with efficient caching, eliminating the need for a distinct back-end setup.

[next-auth](https://next-auth.js.org/): This library seamlessly integrates Firebase authentication within the app. By leveraging Next.js's server-side rendering (SSR), users receive instant feedback based on their authentication state. Next auth provides simple/easy session access for both client and server side operations.

[swr](https://swr.vercel.app/): SWR operates on a strategy of initially returning cached data, then proceeding to fetch fresh data, and finally updating with the most recent data. This approach makes it a prime candidate for supporting real-time updates. Additionally, with its integrated caching mechanism, SWR eliminates the need for separate state management libraries.

<br>

# 📝 Architecture

## Data Structure:

### FishRecord

This represents the main data entity in the application. A FishRecord contains information such as the fish's name, type, location, lure used, dimensions, tracking code, images, and the date it was caught.

### Session

Represents the user's session following their successful authentication, which can be accessed using useSession in client components and getServerSession in server-side components. In addition to standard authentication details from the provider, this session encapsulates custom attributes. I add the custom attribute role, which is added and managed through the redirect, jwt, and session callbacks of NextAuth.

## Firebase CRUD Operations:

GET: Retrieves fish records from the 'fish' reference in the database.
POST: After admin role verification using JWT tokens, new fish records are created with unique IDs using Firebase's push() and set() functions.
PUT: After admin role verification. The specific fish record is targeted using its ID and updated with the given data.
DELETE: After admin role verification, the target fish record is removed based on its unique ID.

### NextAuth Session

When authentication is successful, the redirect callback modifies the redirection URL depending on the login button pressed by the user. This approach was adopted due to the limitations of client side data being accesible within NextAuth's callbacks. In a production setting, roles would ideally be managed through the database or by setting authorizations in the jwt callback against a list of emails designated for admin privileges. The role, while temporary, is stored for the session's duration. The JWT callback integrates this role into the user's JWT, ensuring the role is associated with the user's session. Subsequently, the session callback ensures this role is accessible within the session on the client side.

## Authorization & Validation:

Before performing DB write operations, the application validates the user's token using getToken from next-auth/jwt. I created the helper function isAdmin that is used. I also created isValidRecord that ensures the incoming data for a fish record is of the correct format.

## Pages:

### Home

Presents the dashboard title and description sourced from site metadata.
Dynamically renders a list of navigational links using the CustomLink component. Each link is derived from the headerNavLinks data set and prominently displays the title in a large, easily readable font.

### Fish

This page displays a timeline of recorded fish data.
The data for the fish is fetched using useSWR which fetches from the APP directory API endpoint for fish.
The data is displayed using the Timeline component.
For admin users, there's a modal functionality to modify fish records using FishRecordForm, along with viewing historical data on fish index pages.

### Authentication Portal

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
