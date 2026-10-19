# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `aog-manager`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMyOrganizations*](#getmyorganizations)
  - [*ListServingTeams*](#listservingteams)
  - [*ListMembers*](#listmembers)
  - [*GetMember*](#getmember)
  - [*ListServiceAttendances*](#listserviceattendances)
- [**Mutations**](#mutations)
  - [*BootstrapOrganization*](#bootstraporganization)
  - [*CreateMember*](#createmember)
  - [*UpdateMember*](#updatemember)
  - [*DeleteMember*](#deletemember)
  - [*CreateService*](#createservice)
  - [*RecordServiceAttendance*](#recordserviceattendance)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `aog-manager`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `aog-manager` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMyOrganizations
You can execute the `GetMyOrganizations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyOrganizations(options?: ExecuteQueryOptions): QueryPromise<GetMyOrganizationsData, undefined>;

interface GetMyOrganizationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyOrganizationsData, undefined>;
}
export const getMyOrganizationsRef: GetMyOrganizationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyOrganizations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyOrganizationsData, undefined>;

interface GetMyOrganizationsRef {
  ...
  (dc: DataConnect): QueryRef<GetMyOrganizationsData, undefined>;
}
export const getMyOrganizationsRef: GetMyOrganizationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyOrganizationsRef:
```typescript
const name = getMyOrganizationsRef.operationName;
console.log(name);
```

### Variables
The `GetMyOrganizations` query has no variables.
### Return Type
Recall that executing the `GetMyOrganizations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyOrganizationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyOrganizationsData {
  userOrganizations: ({
    role: string;
    org: {
      id: UUIDString;
      name: string;
    } & Organization_Key;
  })[];
}
```
### Using `GetMyOrganizations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyOrganizations } from '@dataconnect/generated';


// Call the `getMyOrganizations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyOrganizations();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyOrganizations(dataConnect);

console.log(data.userOrganizations);

// Or, you can use the `Promise` API.
getMyOrganizations().then((response) => {
  const data = response.data;
  console.log(data.userOrganizations);
});
```

### Using `GetMyOrganizations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyOrganizationsRef } from '@dataconnect/generated';


// Call the `getMyOrganizationsRef()` function to get a reference to the query.
const ref = getMyOrganizationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyOrganizationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userOrganizations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userOrganizations);
});
```

## ListServingTeams
You can execute the `ListServingTeams` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listServingTeams(vars: ListServingTeamsVariables, options?: ExecuteQueryOptions): QueryPromise<ListServingTeamsData, ListServingTeamsVariables>;

interface ListServingTeamsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListServingTeamsVariables): QueryRef<ListServingTeamsData, ListServingTeamsVariables>;
}
export const listServingTeamsRef: ListServingTeamsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listServingTeams(dc: DataConnect, vars: ListServingTeamsVariables, options?: ExecuteQueryOptions): QueryPromise<ListServingTeamsData, ListServingTeamsVariables>;

interface ListServingTeamsRef {
  ...
  (dc: DataConnect, vars: ListServingTeamsVariables): QueryRef<ListServingTeamsData, ListServingTeamsVariables>;
}
export const listServingTeamsRef: ListServingTeamsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listServingTeamsRef:
```typescript
const name = listServingTeamsRef.operationName;
console.log(name);
```

### Variables
The `ListServingTeams` query requires an argument of type `ListServingTeamsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListServingTeamsVariables {
  orgId: UUIDString;
}
```
### Return Type
Recall that executing the `ListServingTeams` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListServingTeamsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListServingTeamsData {
  servingTeams: ({
    id: UUIDString;
    name: string;
  } & ServingTeam_Key)[];
}
```
### Using `ListServingTeams`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listServingTeams, ListServingTeamsVariables } from '@dataconnect/generated';

// The `ListServingTeams` query requires an argument of type `ListServingTeamsVariables`:
const listServingTeamsVars: ListServingTeamsVariables = {
  orgId: ..., 
};

// Call the `listServingTeams()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listServingTeams(listServingTeamsVars);
// Variables can be defined inline as well.
const { data } = await listServingTeams({ orgId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listServingTeams(dataConnect, listServingTeamsVars);

console.log(data.servingTeams);

// Or, you can use the `Promise` API.
listServingTeams(listServingTeamsVars).then((response) => {
  const data = response.data;
  console.log(data.servingTeams);
});
```

### Using `ListServingTeams`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listServingTeamsRef, ListServingTeamsVariables } from '@dataconnect/generated';

// The `ListServingTeams` query requires an argument of type `ListServingTeamsVariables`:
const listServingTeamsVars: ListServingTeamsVariables = {
  orgId: ..., 
};

// Call the `listServingTeamsRef()` function to get a reference to the query.
const ref = listServingTeamsRef(listServingTeamsVars);
// Variables can be defined inline as well.
const ref = listServingTeamsRef({ orgId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listServingTeamsRef(dataConnect, listServingTeamsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.servingTeams);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.servingTeams);
});
```

## ListMembers
You can execute the `ListMembers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMembers(vars: ListMembersVariables, options?: ExecuteQueryOptions): QueryPromise<ListMembersData, ListMembersVariables>;

interface ListMembersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMembersVariables): QueryRef<ListMembersData, ListMembersVariables>;
}
export const listMembersRef: ListMembersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMembers(dc: DataConnect, vars: ListMembersVariables, options?: ExecuteQueryOptions): QueryPromise<ListMembersData, ListMembersVariables>;

interface ListMembersRef {
  ...
  (dc: DataConnect, vars: ListMembersVariables): QueryRef<ListMembersData, ListMembersVariables>;
}
export const listMembersRef: ListMembersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMembersRef:
```typescript
const name = listMembersRef.operationName;
console.log(name);
```

### Variables
The `ListMembers` query requires an argument of type `ListMembersVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMembersVariables {
  orgId: UUIDString;
}
```
### Return Type
Recall that executing the `ListMembers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMembersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMembersData {
  members: ({
    id: UUIDString;
    firstName: string;
    lastName: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    joinDate?: DateString | null;
    active: boolean;
    servingTeam?: {
      id: UUIDString;
      name: string;
    } & ServingTeam_Key;
    servicesAttendedCount: Int64String;
    lastAttendedDate?: TimestampString | null;
  } & Member_Key)[];
}
```
### Using `ListMembers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMembers, ListMembersVariables } from '@dataconnect/generated';

// The `ListMembers` query requires an argument of type `ListMembersVariables`:
const listMembersVars: ListMembersVariables = {
  orgId: ..., 
};

// Call the `listMembers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMembers(listMembersVars);
// Variables can be defined inline as well.
const { data } = await listMembers({ orgId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMembers(dataConnect, listMembersVars);

console.log(data.members);

// Or, you can use the `Promise` API.
listMembers(listMembersVars).then((response) => {
  const data = response.data;
  console.log(data.members);
});
```

### Using `ListMembers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMembersRef, ListMembersVariables } from '@dataconnect/generated';

// The `ListMembers` query requires an argument of type `ListMembersVariables`:
const listMembersVars: ListMembersVariables = {
  orgId: ..., 
};

// Call the `listMembersRef()` function to get a reference to the query.
const ref = listMembersRef(listMembersVars);
// Variables can be defined inline as well.
const ref = listMembersRef({ orgId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMembersRef(dataConnect, listMembersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.members);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.members);
});
```

## GetMember
You can execute the `GetMember` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMember(vars: GetMemberVariables, options?: ExecuteQueryOptions): QueryPromise<GetMemberData, GetMemberVariables>;

interface GetMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMemberVariables): QueryRef<GetMemberData, GetMemberVariables>;
}
export const getMemberRef: GetMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMember(dc: DataConnect, vars: GetMemberVariables, options?: ExecuteQueryOptions): QueryPromise<GetMemberData, GetMemberVariables>;

interface GetMemberRef {
  ...
  (dc: DataConnect, vars: GetMemberVariables): QueryRef<GetMemberData, GetMemberVariables>;
}
export const getMemberRef: GetMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMemberRef:
```typescript
const name = getMemberRef.operationName;
console.log(name);
```

### Variables
The `GetMember` query requires an argument of type `GetMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMemberVariables {
  id: UUIDString;
  orgId: UUIDString;
}
```
### Return Type
Recall that executing the `GetMember` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMemberData {
  member?: {
    id: UUIDString;
    firstName: string;
    lastName: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    joinDate?: DateString | null;
    active: boolean;
    servingTeam?: {
      id: UUIDString;
      name: string;
    } & ServingTeam_Key;
    servicesAttendedCount: Int64String;
    lastAttendedDate?: TimestampString | null;
  } & Member_Key;
}
```
### Using `GetMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMember, GetMemberVariables } from '@dataconnect/generated';

// The `GetMember` query requires an argument of type `GetMemberVariables`:
const getMemberVars: GetMemberVariables = {
  id: ..., 
  orgId: ..., 
};

// Call the `getMember()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMember(getMemberVars);
// Variables can be defined inline as well.
const { data } = await getMember({ id: ..., orgId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMember(dataConnect, getMemberVars);

console.log(data.member);

// Or, you can use the `Promise` API.
getMember(getMemberVars).then((response) => {
  const data = response.data;
  console.log(data.member);
});
```

### Using `GetMember`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMemberRef, GetMemberVariables } from '@dataconnect/generated';

// The `GetMember` query requires an argument of type `GetMemberVariables`:
const getMemberVars: GetMemberVariables = {
  id: ..., 
  orgId: ..., 
};

// Call the `getMemberRef()` function to get a reference to the query.
const ref = getMemberRef(getMemberVars);
// Variables can be defined inline as well.
const ref = getMemberRef({ id: ..., orgId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMemberRef(dataConnect, getMemberVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.member);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.member);
});
```

## ListServiceAttendances
You can execute the `ListServiceAttendances` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listServiceAttendances(vars: ListServiceAttendancesVariables, options?: ExecuteQueryOptions): QueryPromise<ListServiceAttendancesData, ListServiceAttendancesVariables>;

interface ListServiceAttendancesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListServiceAttendancesVariables): QueryRef<ListServiceAttendancesData, ListServiceAttendancesVariables>;
}
export const listServiceAttendancesRef: ListServiceAttendancesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listServiceAttendances(dc: DataConnect, vars: ListServiceAttendancesVariables, options?: ExecuteQueryOptions): QueryPromise<ListServiceAttendancesData, ListServiceAttendancesVariables>;

interface ListServiceAttendancesRef {
  ...
  (dc: DataConnect, vars: ListServiceAttendancesVariables): QueryRef<ListServiceAttendancesData, ListServiceAttendancesVariables>;
}
export const listServiceAttendancesRef: ListServiceAttendancesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listServiceAttendancesRef:
```typescript
const name = listServiceAttendancesRef.operationName;
console.log(name);
```

### Variables
The `ListServiceAttendances` query requires an argument of type `ListServiceAttendancesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListServiceAttendancesVariables {
  orgId: UUIDString;
  serviceId: UUIDString;
}
```
### Return Type
Recall that executing the `ListServiceAttendances` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListServiceAttendancesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListServiceAttendancesData {
  attendances: ({
    memberId: UUIDString;
  })[];
}
```
### Using `ListServiceAttendances`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listServiceAttendances, ListServiceAttendancesVariables } from '@dataconnect/generated';

// The `ListServiceAttendances` query requires an argument of type `ListServiceAttendancesVariables`:
const listServiceAttendancesVars: ListServiceAttendancesVariables = {
  orgId: ..., 
  serviceId: ..., 
};

// Call the `listServiceAttendances()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listServiceAttendances(listServiceAttendancesVars);
// Variables can be defined inline as well.
const { data } = await listServiceAttendances({ orgId: ..., serviceId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listServiceAttendances(dataConnect, listServiceAttendancesVars);

console.log(data.attendances);

// Or, you can use the `Promise` API.
listServiceAttendances(listServiceAttendancesVars).then((response) => {
  const data = response.data;
  console.log(data.attendances);
});
```

### Using `ListServiceAttendances`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listServiceAttendancesRef, ListServiceAttendancesVariables } from '@dataconnect/generated';

// The `ListServiceAttendances` query requires an argument of type `ListServiceAttendancesVariables`:
const listServiceAttendancesVars: ListServiceAttendancesVariables = {
  orgId: ..., 
  serviceId: ..., 
};

// Call the `listServiceAttendancesRef()` function to get a reference to the query.
const ref = listServiceAttendancesRef(listServiceAttendancesVars);
// Variables can be defined inline as well.
const ref = listServiceAttendancesRef({ orgId: ..., serviceId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listServiceAttendancesRef(dataConnect, listServiceAttendancesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.attendances);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.attendances);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `aog-manager` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## BootstrapOrganization
You can execute the `BootstrapOrganization` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
bootstrapOrganization(vars: BootstrapOrganizationVariables): MutationPromise<BootstrapOrganizationData, BootstrapOrganizationVariables>;

interface BootstrapOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: BootstrapOrganizationVariables): MutationRef<BootstrapOrganizationData, BootstrapOrganizationVariables>;
}
export const bootstrapOrganizationRef: BootstrapOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
bootstrapOrganization(dc: DataConnect, vars: BootstrapOrganizationVariables): MutationPromise<BootstrapOrganizationData, BootstrapOrganizationVariables>;

interface BootstrapOrganizationRef {
  ...
  (dc: DataConnect, vars: BootstrapOrganizationVariables): MutationRef<BootstrapOrganizationData, BootstrapOrganizationVariables>;
}
export const bootstrapOrganizationRef: BootstrapOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the bootstrapOrganizationRef:
```typescript
const name = bootstrapOrganizationRef.operationName;
console.log(name);
```

### Variables
The `BootstrapOrganization` mutation requires an argument of type `BootstrapOrganizationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface BootstrapOrganizationVariables {
  uid: string;
  orgName: string;
}
```
### Return Type
Recall that executing the `BootstrapOrganization` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `BootstrapOrganizationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface BootstrapOrganizationData {
  organization_insert: Organization_Key;
  userOrganization_insert: UserOrganization_Key;
  servingTeam_insert: ServingTeam_Key;
}
```
### Using `BootstrapOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, bootstrapOrganization, BootstrapOrganizationVariables } from '@dataconnect/generated';

// The `BootstrapOrganization` mutation requires an argument of type `BootstrapOrganizationVariables`:
const bootstrapOrganizationVars: BootstrapOrganizationVariables = {
  uid: ..., 
  orgName: ..., 
};

// Call the `bootstrapOrganization()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await bootstrapOrganization(bootstrapOrganizationVars);
// Variables can be defined inline as well.
const { data } = await bootstrapOrganization({ uid: ..., orgName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await bootstrapOrganization(dataConnect, bootstrapOrganizationVars);

console.log(data.organization_insert);
console.log(data.userOrganization_insert);
console.log(data.servingTeam_insert);

// Or, you can use the `Promise` API.
bootstrapOrganization(bootstrapOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.organization_insert);
  console.log(data.userOrganization_insert);
  console.log(data.servingTeam_insert);
});
```

### Using `BootstrapOrganization`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, bootstrapOrganizationRef, BootstrapOrganizationVariables } from '@dataconnect/generated';

// The `BootstrapOrganization` mutation requires an argument of type `BootstrapOrganizationVariables`:
const bootstrapOrganizationVars: BootstrapOrganizationVariables = {
  uid: ..., 
  orgName: ..., 
};

// Call the `bootstrapOrganizationRef()` function to get a reference to the mutation.
const ref = bootstrapOrganizationRef(bootstrapOrganizationVars);
// Variables can be defined inline as well.
const ref = bootstrapOrganizationRef({ uid: ..., orgName: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = bootstrapOrganizationRef(dataConnect, bootstrapOrganizationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organization_insert);
console.log(data.userOrganization_insert);
console.log(data.servingTeam_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organization_insert);
  console.log(data.userOrganization_insert);
  console.log(data.servingTeam_insert);
});
```

## CreateMember
You can execute the `CreateMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMember(vars: CreateMemberVariables): MutationPromise<CreateMemberData, CreateMemberVariables>;

interface CreateMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMemberVariables): MutationRef<CreateMemberData, CreateMemberVariables>;
}
export const createMemberRef: CreateMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMember(dc: DataConnect, vars: CreateMemberVariables): MutationPromise<CreateMemberData, CreateMemberVariables>;

interface CreateMemberRef {
  ...
  (dc: DataConnect, vars: CreateMemberVariables): MutationRef<CreateMemberData, CreateMemberVariables>;
}
export const createMemberRef: CreateMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMemberRef:
```typescript
const name = createMemberRef.operationName;
console.log(name);
```

### Variables
The `CreateMember` mutation requires an argument of type `CreateMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMemberVariables {
  orgId: UUIDString;
  servingTeamId: UUIDString;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  joinDate?: DateString | null;
  active: boolean;
}
```
### Return Type
Recall that executing the `CreateMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMemberData {
  member_insert: Member_Key;
}
```
### Using `CreateMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMember, CreateMemberVariables } from '@dataconnect/generated';

// The `CreateMember` mutation requires an argument of type `CreateMemberVariables`:
const createMemberVars: CreateMemberVariables = {
  orgId: ..., 
  servingTeamId: ..., 
  firstName: ..., 
  lastName: ..., 
  email: ..., // optional
  phone: ..., // optional
  address: ..., // optional
  joinDate: ..., // optional
  active: ..., 
};

// Call the `createMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMember(createMemberVars);
// Variables can be defined inline as well.
const { data } = await createMember({ orgId: ..., servingTeamId: ..., firstName: ..., lastName: ..., email: ..., phone: ..., address: ..., joinDate: ..., active: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMember(dataConnect, createMemberVars);

console.log(data.member_insert);

// Or, you can use the `Promise` API.
createMember(createMemberVars).then((response) => {
  const data = response.data;
  console.log(data.member_insert);
});
```

### Using `CreateMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMemberRef, CreateMemberVariables } from '@dataconnect/generated';

// The `CreateMember` mutation requires an argument of type `CreateMemberVariables`:
const createMemberVars: CreateMemberVariables = {
  orgId: ..., 
  servingTeamId: ..., 
  firstName: ..., 
  lastName: ..., 
  email: ..., // optional
  phone: ..., // optional
  address: ..., // optional
  joinDate: ..., // optional
  active: ..., 
};

// Call the `createMemberRef()` function to get a reference to the mutation.
const ref = createMemberRef(createMemberVars);
// Variables can be defined inline as well.
const ref = createMemberRef({ orgId: ..., servingTeamId: ..., firstName: ..., lastName: ..., email: ..., phone: ..., address: ..., joinDate: ..., active: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMemberRef(dataConnect, createMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.member_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.member_insert);
});
```

## UpdateMember
You can execute the `UpdateMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMember(vars: UpdateMemberVariables): MutationPromise<UpdateMemberData, UpdateMemberVariables>;

interface UpdateMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMemberVariables): MutationRef<UpdateMemberData, UpdateMemberVariables>;
}
export const updateMemberRef: UpdateMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMember(dc: DataConnect, vars: UpdateMemberVariables): MutationPromise<UpdateMemberData, UpdateMemberVariables>;

interface UpdateMemberRef {
  ...
  (dc: DataConnect, vars: UpdateMemberVariables): MutationRef<UpdateMemberData, UpdateMemberVariables>;
}
export const updateMemberRef: UpdateMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMemberRef:
```typescript
const name = updateMemberRef.operationName;
console.log(name);
```

### Variables
The `UpdateMember` mutation requires an argument of type `UpdateMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMemberVariables {
  id: UUIDString;
  orgId: UUIDString;
  servingTeamId: UUIDString;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  joinDate?: DateString | null;
  active: boolean;
}
```
### Return Type
Recall that executing the `UpdateMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMemberData {
  member_update?: Member_Key | null;
}
```
### Using `UpdateMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMember, UpdateMemberVariables } from '@dataconnect/generated';

// The `UpdateMember` mutation requires an argument of type `UpdateMemberVariables`:
const updateMemberVars: UpdateMemberVariables = {
  id: ..., 
  orgId: ..., 
  servingTeamId: ..., 
  firstName: ..., 
  lastName: ..., 
  email: ..., // optional
  phone: ..., // optional
  address: ..., // optional
  joinDate: ..., // optional
  active: ..., 
};

// Call the `updateMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMember(updateMemberVars);
// Variables can be defined inline as well.
const { data } = await updateMember({ id: ..., orgId: ..., servingTeamId: ..., firstName: ..., lastName: ..., email: ..., phone: ..., address: ..., joinDate: ..., active: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMember(dataConnect, updateMemberVars);

console.log(data.member_update);

// Or, you can use the `Promise` API.
updateMember(updateMemberVars).then((response) => {
  const data = response.data;
  console.log(data.member_update);
});
```

### Using `UpdateMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMemberRef, UpdateMemberVariables } from '@dataconnect/generated';

// The `UpdateMember` mutation requires an argument of type `UpdateMemberVariables`:
const updateMemberVars: UpdateMemberVariables = {
  id: ..., 
  orgId: ..., 
  servingTeamId: ..., 
  firstName: ..., 
  lastName: ..., 
  email: ..., // optional
  phone: ..., // optional
  address: ..., // optional
  joinDate: ..., // optional
  active: ..., 
};

// Call the `updateMemberRef()` function to get a reference to the mutation.
const ref = updateMemberRef(updateMemberVars);
// Variables can be defined inline as well.
const ref = updateMemberRef({ id: ..., orgId: ..., servingTeamId: ..., firstName: ..., lastName: ..., email: ..., phone: ..., address: ..., joinDate: ..., active: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMemberRef(dataConnect, updateMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.member_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.member_update);
});
```

## DeleteMember
You can execute the `DeleteMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMember(vars: DeleteMemberVariables): MutationPromise<DeleteMemberData, DeleteMemberVariables>;

interface DeleteMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMemberVariables): MutationRef<DeleteMemberData, DeleteMemberVariables>;
}
export const deleteMemberRef: DeleteMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMember(dc: DataConnect, vars: DeleteMemberVariables): MutationPromise<DeleteMemberData, DeleteMemberVariables>;

interface DeleteMemberRef {
  ...
  (dc: DataConnect, vars: DeleteMemberVariables): MutationRef<DeleteMemberData, DeleteMemberVariables>;
}
export const deleteMemberRef: DeleteMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMemberRef:
```typescript
const name = deleteMemberRef.operationName;
console.log(name);
```

### Variables
The `DeleteMember` mutation requires an argument of type `DeleteMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMemberVariables {
  id: UUIDString;
  orgId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMemberData {
  member_delete?: Member_Key | null;
}
```
### Using `DeleteMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMember, DeleteMemberVariables } from '@dataconnect/generated';

// The `DeleteMember` mutation requires an argument of type `DeleteMemberVariables`:
const deleteMemberVars: DeleteMemberVariables = {
  id: ..., 
  orgId: ..., 
};

// Call the `deleteMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMember(deleteMemberVars);
// Variables can be defined inline as well.
const { data } = await deleteMember({ id: ..., orgId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMember(dataConnect, deleteMemberVars);

console.log(data.member_delete);

// Or, you can use the `Promise` API.
deleteMember(deleteMemberVars).then((response) => {
  const data = response.data;
  console.log(data.member_delete);
});
```

### Using `DeleteMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMemberRef, DeleteMemberVariables } from '@dataconnect/generated';

// The `DeleteMember` mutation requires an argument of type `DeleteMemberVariables`:
const deleteMemberVars: DeleteMemberVariables = {
  id: ..., 
  orgId: ..., 
};

// Call the `deleteMemberRef()` function to get a reference to the mutation.
const ref = deleteMemberRef(deleteMemberVars);
// Variables can be defined inline as well.
const ref = deleteMemberRef({ id: ..., orgId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMemberRef(dataConnect, deleteMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.member_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.member_delete);
});
```

## CreateService
You can execute the `CreateService` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createService(vars: CreateServiceVariables): MutationPromise<CreateServiceData, CreateServiceVariables>;

interface CreateServiceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateServiceVariables): MutationRef<CreateServiceData, CreateServiceVariables>;
}
export const createServiceRef: CreateServiceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createService(dc: DataConnect, vars: CreateServiceVariables): MutationPromise<CreateServiceData, CreateServiceVariables>;

interface CreateServiceRef {
  ...
  (dc: DataConnect, vars: CreateServiceVariables): MutationRef<CreateServiceData, CreateServiceVariables>;
}
export const createServiceRef: CreateServiceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createServiceRef:
```typescript
const name = createServiceRef.operationName;
console.log(name);
```

### Variables
The `CreateService` mutation requires an argument of type `CreateServiceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateServiceVariables {
  serviceId: UUIDString;
  orgId: UUIDString;
  date: TimestampString;
  type: string;
}
```
### Return Type
Recall that executing the `CreateService` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateServiceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateServiceData {
  service_upsert: Service_Key;
}
```
### Using `CreateService`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createService, CreateServiceVariables } from '@dataconnect/generated';

// The `CreateService` mutation requires an argument of type `CreateServiceVariables`:
const createServiceVars: CreateServiceVariables = {
  serviceId: ..., 
  orgId: ..., 
  date: ..., 
  type: ..., 
};

// Call the `createService()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createService(createServiceVars);
// Variables can be defined inline as well.
const { data } = await createService({ serviceId: ..., orgId: ..., date: ..., type: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createService(dataConnect, createServiceVars);

console.log(data.service_upsert);

// Or, you can use the `Promise` API.
createService(createServiceVars).then((response) => {
  const data = response.data;
  console.log(data.service_upsert);
});
```

### Using `CreateService`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createServiceRef, CreateServiceVariables } from '@dataconnect/generated';

// The `CreateService` mutation requires an argument of type `CreateServiceVariables`:
const createServiceVars: CreateServiceVariables = {
  serviceId: ..., 
  orgId: ..., 
  date: ..., 
  type: ..., 
};

// Call the `createServiceRef()` function to get a reference to the mutation.
const ref = createServiceRef(createServiceVars);
// Variables can be defined inline as well.
const ref = createServiceRef({ serviceId: ..., orgId: ..., date: ..., type: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createServiceRef(dataConnect, createServiceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.service_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.service_upsert);
});
```

## RecordServiceAttendance
You can execute the `RecordServiceAttendance` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
recordServiceAttendance(vars: RecordServiceAttendanceVariables): MutationPromise<RecordServiceAttendanceData, RecordServiceAttendanceVariables>;

interface RecordServiceAttendanceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordServiceAttendanceVariables): MutationRef<RecordServiceAttendanceData, RecordServiceAttendanceVariables>;
}
export const recordServiceAttendanceRef: RecordServiceAttendanceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordServiceAttendance(dc: DataConnect, vars: RecordServiceAttendanceVariables): MutationPromise<RecordServiceAttendanceData, RecordServiceAttendanceVariables>;

interface RecordServiceAttendanceRef {
  ...
  (dc: DataConnect, vars: RecordServiceAttendanceVariables): MutationRef<RecordServiceAttendanceData, RecordServiceAttendanceVariables>;
}
export const recordServiceAttendanceRef: RecordServiceAttendanceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordServiceAttendanceRef:
```typescript
const name = recordServiceAttendanceRef.operationName;
console.log(name);
```

### Variables
The `RecordServiceAttendance` mutation requires an argument of type `RecordServiceAttendanceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordServiceAttendanceVariables {
  orgId: UUIDString;
  memberId: UUIDString;
  serviceId: UUIDString;
  timestamp: TimestampString;
}
```
### Return Type
Recall that executing the `RecordServiceAttendance` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordServiceAttendanceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordServiceAttendanceData {
  attendance_insert: Attendance_Key;
  member_update?: Member_Key | null;
}
```
### Using `RecordServiceAttendance`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordServiceAttendance, RecordServiceAttendanceVariables } from '@dataconnect/generated';

// The `RecordServiceAttendance` mutation requires an argument of type `RecordServiceAttendanceVariables`:
const recordServiceAttendanceVars: RecordServiceAttendanceVariables = {
  orgId: ..., 
  memberId: ..., 
  serviceId: ..., 
  timestamp: ..., 
};

// Call the `recordServiceAttendance()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordServiceAttendance(recordServiceAttendanceVars);
// Variables can be defined inline as well.
const { data } = await recordServiceAttendance({ orgId: ..., memberId: ..., serviceId: ..., timestamp: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordServiceAttendance(dataConnect, recordServiceAttendanceVars);

console.log(data.attendance_insert);
console.log(data.member_update);

// Or, you can use the `Promise` API.
recordServiceAttendance(recordServiceAttendanceVars).then((response) => {
  const data = response.data;
  console.log(data.attendance_insert);
  console.log(data.member_update);
});
```

### Using `RecordServiceAttendance`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordServiceAttendanceRef, RecordServiceAttendanceVariables } from '@dataconnect/generated';

// The `RecordServiceAttendance` mutation requires an argument of type `RecordServiceAttendanceVariables`:
const recordServiceAttendanceVars: RecordServiceAttendanceVariables = {
  orgId: ..., 
  memberId: ..., 
  serviceId: ..., 
  timestamp: ..., 
};

// Call the `recordServiceAttendanceRef()` function to get a reference to the mutation.
const ref = recordServiceAttendanceRef(recordServiceAttendanceVars);
// Variables can be defined inline as well.
const ref = recordServiceAttendanceRef({ orgId: ..., memberId: ..., serviceId: ..., timestamp: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordServiceAttendanceRef(dataConnect, recordServiceAttendanceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.attendance_insert);
console.log(data.member_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.attendance_insert);
  console.log(data.member_update);
});
```

