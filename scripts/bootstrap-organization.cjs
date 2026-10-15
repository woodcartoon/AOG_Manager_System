const { applicationDefault, initializeApp } = require("firebase-admin/app");
const { getDataConnect } = require("firebase-admin/data-connect");
const {
    bootstrapOrganization,
    connectorConfig
} = require("@dataconnect/admin-generated");

async function main() {
    const [uid, ...nameParts] = process.argv.slice(2);
    const orgName = nameParts.join(" ").trim();
    if (!uid || !orgName) {
        throw new Error("Usage: npm run bootstrap:organization -- <firebase-auth-uid> <organization-name>");
    }

    const app = initializeApp({
        credential: applicationDefault(),
        projectId: process.env.GCLOUD_PROJECT || "aog-data-base"
    });
    const dataConnect = getDataConnect(connectorConfig, app);
    const result = await bootstrapOrganization(dataConnect, { uid, orgName });
    const organizationId = result.data.organization_insert.id;
    console.log(`Created organization "${orgName}" (${organizationId}) and assigned administrator ${uid}.`);
    console.log('Created the default "General" serving team. No members were added.');
}

main().catch((error) => {
    console.error("Organization bootstrap failed:", error.message);
    process.exitCode = 1;
});
