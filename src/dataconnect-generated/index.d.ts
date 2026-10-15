import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Attendance_Key {
  memberId: UUIDString;
  serviceId: UUIDString;
  __typename?: 'Attendance_Key';
}

export interface BootstrapOrganizationData {
  organization_insert: Organization_Key;
  userOrganization_insert: UserOrganization_Key;
  servingTeam_insert: ServingTeam_Key;
}

export interface BootstrapOrganizationVariables {
  uid: string;
  orgName: string;
}

export interface CreateMemberData {
  member_insert: Member_Key;
}

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

export interface DeleteMemberData {
  member_delete?: Member_Key | null;
}

export interface DeleteMemberVariables {
  id: UUIDString;
  orgId: UUIDString;
}

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

export interface GetMemberVariables {
  id: UUIDString;
  orgId: UUIDString;
}

export interface GetMyOrganizationsData {
  userOrganizations: ({
    role: string;
    org: {
      id: UUIDString;
      name: string;
    } & Organization_Key;
  })[];
}

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

export interface ListMembersVariables {
  orgId: UUIDString;
}

export interface ListServingTeamsData {
  servingTeams: ({
    id: UUIDString;
    name: string;
  } & ServingTeam_Key)[];
}

export interface ListServingTeamsVariables {
  orgId: UUIDString;
}

export interface Member_Key {
  id: UUIDString;
  __typename?: 'Member_Key';
}

export interface Organization_Key {
  id: UUIDString;
  __typename?: 'Organization_Key';
}

export interface Service_Key {
  id: UUIDString;
  __typename?: 'Service_Key';
}

export interface ServingTeam_Key {
  id: UUIDString;
  __typename?: 'ServingTeam_Key';
}

export interface UpdateMemberData {
  member_update?: Member_Key | null;
}

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

export interface UserOrganization_Key {
  uid: string;
  orgId: UUIDString;
  __typename?: 'UserOrganization_Key';
}

interface BootstrapOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: BootstrapOrganizationVariables): MutationRef<BootstrapOrganizationData, BootstrapOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: BootstrapOrganizationVariables): MutationRef<BootstrapOrganizationData, BootstrapOrganizationVariables>;
  operationName: string;
}
export const bootstrapOrganizationRef: BootstrapOrganizationRef;

export function bootstrapOrganization(vars: BootstrapOrganizationVariables): MutationPromise<BootstrapOrganizationData, BootstrapOrganizationVariables>;
export function bootstrapOrganization(dc: DataConnect, vars: BootstrapOrganizationVariables): MutationPromise<BootstrapOrganizationData, BootstrapOrganizationVariables>;

interface CreateMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMemberVariables): MutationRef<CreateMemberData, CreateMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMemberVariables): MutationRef<CreateMemberData, CreateMemberVariables>;
  operationName: string;
}
export const createMemberRef: CreateMemberRef;

export function createMember(vars: CreateMemberVariables): MutationPromise<CreateMemberData, CreateMemberVariables>;
export function createMember(dc: DataConnect, vars: CreateMemberVariables): MutationPromise<CreateMemberData, CreateMemberVariables>;

interface UpdateMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMemberVariables): MutationRef<UpdateMemberData, UpdateMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMemberVariables): MutationRef<UpdateMemberData, UpdateMemberVariables>;
  operationName: string;
}
export const updateMemberRef: UpdateMemberRef;

export function updateMember(vars: UpdateMemberVariables): MutationPromise<UpdateMemberData, UpdateMemberVariables>;
export function updateMember(dc: DataConnect, vars: UpdateMemberVariables): MutationPromise<UpdateMemberData, UpdateMemberVariables>;

interface DeleteMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMemberVariables): MutationRef<DeleteMemberData, DeleteMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMemberVariables): MutationRef<DeleteMemberData, DeleteMemberVariables>;
  operationName: string;
}
export const deleteMemberRef: DeleteMemberRef;

export function deleteMember(vars: DeleteMemberVariables): MutationPromise<DeleteMemberData, DeleteMemberVariables>;
export function deleteMember(dc: DataConnect, vars: DeleteMemberVariables): MutationPromise<DeleteMemberData, DeleteMemberVariables>;

interface GetMyOrganizationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyOrganizationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyOrganizationsData, undefined>;
  operationName: string;
}
export const getMyOrganizationsRef: GetMyOrganizationsRef;

export function getMyOrganizations(options?: ExecuteQueryOptions): QueryPromise<GetMyOrganizationsData, undefined>;
export function getMyOrganizations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyOrganizationsData, undefined>;

interface ListServingTeamsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListServingTeamsVariables): QueryRef<ListServingTeamsData, ListServingTeamsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListServingTeamsVariables): QueryRef<ListServingTeamsData, ListServingTeamsVariables>;
  operationName: string;
}
export const listServingTeamsRef: ListServingTeamsRef;

export function listServingTeams(vars: ListServingTeamsVariables, options?: ExecuteQueryOptions): QueryPromise<ListServingTeamsData, ListServingTeamsVariables>;
export function listServingTeams(dc: DataConnect, vars: ListServingTeamsVariables, options?: ExecuteQueryOptions): QueryPromise<ListServingTeamsData, ListServingTeamsVariables>;

interface ListMembersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMembersVariables): QueryRef<ListMembersData, ListMembersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListMembersVariables): QueryRef<ListMembersData, ListMembersVariables>;
  operationName: string;
}
export const listMembersRef: ListMembersRef;

export function listMembers(vars: ListMembersVariables, options?: ExecuteQueryOptions): QueryPromise<ListMembersData, ListMembersVariables>;
export function listMembers(dc: DataConnect, vars: ListMembersVariables, options?: ExecuteQueryOptions): QueryPromise<ListMembersData, ListMembersVariables>;

interface GetMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMemberVariables): QueryRef<GetMemberData, GetMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMemberVariables): QueryRef<GetMemberData, GetMemberVariables>;
  operationName: string;
}
export const getMemberRef: GetMemberRef;

export function getMember(vars: GetMemberVariables, options?: ExecuteQueryOptions): QueryPromise<GetMemberData, GetMemberVariables>;
export function getMember(dc: DataConnect, vars: GetMemberVariables, options?: ExecuteQueryOptions): QueryPromise<GetMemberData, GetMemberVariables>;

