const { applicationDefault, initializeApp } = require("firebase-admin/app");
const { getDataConnect } = require("firebase-admin/data-connect");
const { connectorConfig } = require("@dataconnect/admin-generated");

const SERVING_TEAM_NAMES = [
    "General",
    "Pastor",
    "Youth Pastor",
    "Worshiper",
    "Usher",
    "Band",
    "Sound Team"
];

async function main() {
    const [orgId] = process.argv.slice(2);
    if (!orgId || process.argv.length !== 3) {
        throw new Error("Usage: npm run seed:serving-teams -- <organization-id>");
    }

    const app = initializeApp({
        credential: applicationDefault(),
        projectId: process.env.GCLOUD_PROJECT || "aog-data-base"
    });

    try {
        const dataConnect = getDataConnect(connectorConfig, app);
        const result = await dataConnect.executeGraphqlRead(
            `query GetOrganizationServingTeams($orgId: UUID!) {
                organization(id: $orgId) { id name }
                servingTeams(where: { orgId: { eq: $orgId } }) { name }
            }`,
            { variables: { orgId } }
        );

        const organization = result.data.organization;
        if (!organization) {
            throw new Error(`Organization ${orgId} was not found.`);
        }

        const existingNames = new Set(
            result.data.servingTeams.map((team) => team.name.trim().toLowerCase())
        );
        const missingNames = SERVING_TEAM_NAMES.filter(
            (name) => !existingNames.has(name.toLowerCase())
        );

        if (missingNames.length === 0) {
            console.log(`All serving teams already exist for "${organization.name}".`);
            return;
        }

        await dataConnect.insertMany(
            "servingTeam",
            missingNames.map((name) => ({ orgId, name }))
        );
        console.log(
            `Added ${missingNames.length} serving team(s) to "${organization.name}": ${missingNames.join(", ")}.`
        );
    } finally {
        await app.delete();
    }
}

main().catch((error) => {
    console.error("Serving-team setup failed:", error.message);
    process.exitCode = 1;
});
