# Firebase setup

Member records are stored in Firebase SQL Connect (Cloud SQL), not in
`localStorage` or Firebase Storage. The application does not add sample
members; an empty cloud database will show an empty member list.

## One-time cloud setup

1. In the Firebase Console for `aog-data-base`, enable **Email/Password**
   under **Authentication → Sign-in method**, then create the first user under
   **Authentication → Users**. Copy that user's UID.
2. From the repository root, deploy the SQL Connect schema and operations:

   ```powershell
   npx firebase-tools login
   npx firebase-tools deploy --only dataconnect --project aog-data-base
   ```

   Review the deployment prompt carefully; this creates/updates the cloud
   database schema and publishes the connector operations.
3. Authenticate the Google Cloud CLI with an identity that has permission to
   administer Firebase Data Connect in this project:

   ```powershell
   gcloud auth application-default login
   ```

4. Create the initial organization, administrator membership, and default
   **General** serving team. Replace the UID and organization name:

   ```powershell
   npm run bootstrap:organization -- <firebase-auth-uid> "Organization name"
   ```

   The bootstrap operation is Admin-SDK-only and rejects a UID already
   assigned to an organization. It creates no member records. Do not commit
   service-account keys or credentials to the repository.
5. Add the standard serving teams to an organization. This command is safe to
   run again; it adds any missing teams and leaves existing teams unchanged:

   ```powershell
   npm run seed:serving-teams -- <organization-id>
   ```

   The default teams are **General**, **Pastor**, **Youth Pastor**,
   **Worshiper**, **Usher**, **Band**, and **Sound Team**.

## Run the desktop app

```powershell
npm install
npm start
```

Sign in with the email address and password created in Firebase Authentication.
The app loads organizations, teams, and members from SQL Connect. Add, edit,
and delete member operations are authorized by the user's organization role
(`ADMIN` or `TEAM_LEAD` can write). Accounts can belong to more than one
organization; the selector appears when an account has multiple memberships.

To record attendance, select **Submit today's service**, enter the service name
and date, select the members who attended, and submit. Each member's attendance
record and attendance total are updated together. If a network interruption
prevents some records from saving, keep the form open and retry the unsaved
attendance.

After changing the schema or connector operations, validate and redeploy:

```powershell
npx firebase-tools dataconnect:compile
npx firebase-tools deploy --only dataconnect --project aog-data-base
```
