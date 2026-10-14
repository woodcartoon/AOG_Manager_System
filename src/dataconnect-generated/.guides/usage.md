# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createMember, updateMember, deleteMember, getMyOrganizations, listServingTeams, listMembers, getMember } from '@dataconnect/generated';


// Operation CreateMember:  For variables, look at type CreateMemberVars in ../index.d.ts
const { data } = await CreateMember(dataConnect, createMemberVars);

// Operation UpdateMember:  For variables, look at type UpdateMemberVars in ../index.d.ts
const { data } = await UpdateMember(dataConnect, updateMemberVars);

// Operation DeleteMember:  For variables, look at type DeleteMemberVars in ../index.d.ts
const { data } = await DeleteMember(dataConnect, deleteMemberVars);

// Operation GetMyOrganizations: 
const { data } = await GetMyOrganizations(dataConnect);

// Operation ListServingTeams:  For variables, look at type ListServingTeamsVars in ../index.d.ts
const { data } = await ListServingTeams(dataConnect, listServingTeamsVars);

// Operation ListMembers:  For variables, look at type ListMembersVars in ../index.d.ts
const { data } = await ListMembers(dataConnect, listMembersVars);

// Operation GetMember:  For variables, look at type GetMemberVars in ../index.d.ts
const { data } = await GetMember(dataConnect, getMemberVars);


```