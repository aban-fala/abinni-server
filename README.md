# ⚡️Abinni⚡️ (Aban - Finni) server.

### Step 1 - To test the server

This command will start and restart your server as code changes are made,
do not use on production

    npm run dev

Let's run `npm install` to install the dependencies and `npm run dev`
to start your server locally on port 3000.

#### Other commands for the production environment

#### To build your server:

    npm run build

#### To start your server

    npm run start

### Step 2 - Use Postman to test it

1. In the Firebase Console > Go to Project Overview and Click on the **Web** platform to Add a new Platform

2. Add a Nickname like "Postman" and click on Register App

3. Copy the **apiKey** field

4. Import the **[postman_collection.json](postman_collection.json)** file to your Postman

5. Test creating an account first, after that, go to the Login request
   example and pass the `apiKey` as query parameter

6. Copy the `idToken` and pass it as header for the other requests, the header name is `Authorization`.

