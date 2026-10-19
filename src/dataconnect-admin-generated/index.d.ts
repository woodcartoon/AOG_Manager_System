import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

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

export interface CreateServiceData {
  service_upsert: Service_Key;
}

export interface CreateServiceVariables {
  serviceId: UUIDString;
  orgId: UUIDString;
  date: TimestampString;
  type: string;
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

export interface ListServiceAttendancesData {
  attendances: ({
    memberId: UUIDString;
  })[];
}

export interface ListServiceAttendancesVariables {
  orgId: UUIDString;
  serviceId: UUIDString;
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

export interface RecordServiceAttendanceData {
  attendance_insert: Attendance_Key;
  member_update?: Member_Key | null;
}

export interface RecordServiceAttendanceVariables {
  orgId: UUIDString;
  memberId: UUIDString;
  serviceId: UUIDString;
  timestamp: TimestampString;
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

/** Generated Node Admin SDK operation action function for the 'BootstrapOrganization' Mutation. Allow users to execute without passing in DataConnect. */
export function bootstrapOrganization(dc: DataConnect, vars: BootstrapOrganizationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<BootstrapOrganizationData>>;
/** Generated Node Admin SDK operation action function for the 'BootstrapOrganization' Mutation. Allow users to pass in custom DataConnect instances. */
export function bootstrapOrganization(vars: BootstrapOrganizationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<BootstrapOrganizationData>>;

/** Generated Node Admin SDK operation action function for the 'CreateMember' Mutation. Allow users to execute without passing in DataConnect. */
export function createMember(dc: DataConnect, vars: CreateMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateMemberData>>;
/** Generated Node Admin SDK operation action function for the 'CreateMember' Mutation. Allow users to pass in custom DataConnect instances. */
export function createMember(vars: CreateMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateMemberData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateMember' Mutation. Allow users to execute without passing in DataConnect. */
export function updateMember(dc: DataConnect, vars: UpdateMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateMemberData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateMember' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateMember(vars: UpdateMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateMemberData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteMember' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteMember(dc: DataConnect, vars: DeleteMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteMemberData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteMember' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteMember(vars: DeleteMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteMemberData>>;

/** Generated Node Admin SDK operation action function for the 'CreateService' Mutation. Allow users to execute without passing in DataConnect. */
export function createService(dc: DataConnect, vars: CreateServiceVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateServiceData>>;
/** Generated Node Admin SDK operation action function for the 'CreateService' Mutation. Allow users to pass in custom DataConnect instances. */
export function createService(vars: CreateServiceVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateServiceData>>;

/** Generated Node Admin SDK operation action function for the 'RecordServiceAttendance' Mutation. Allow users to execute without passing in DataConnect. */
export function recordServiceAttendance(dc: DataConnect, vars: RecordServiceAttendanceVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordServiceAttendanceData>>;
/** Generated Node Admin SDK operation action function for the 'RecordServiceAttendance' Mutation. Allow users to pass in custom DataConnect instances. */
export function recordServiceAttendance(vars: RecordServiceAttendanceVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordServiceAttendanceData>>;

/** Generated Node Admin SDK operation action function for the 'GetMyOrganizations' Query. Allow users to execute without passing in DataConnect. */
export function getMyOrganizations(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetMyOrganizationsData>>;
/** Generated Node Admin SDK operation action function for the 'GetMyOrganizations' Query. Allow users to pass in custom DataConnect instances. */
export function getMyOrganizations(options?: OperationOptions): Promise<ExecuteOperationResponse<GetMyOrganizationsData>>;

/** Generated Node Admin SDK operation action function for the 'ListServingTeams' Query. Allow users to execute without passing in DataConnect. */
export function listServingTeams(dc: DataConnect, vars: ListServingTeamsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListServingTeamsData>>;
/** Generated Node Admin SDK operation action function for the 'ListServingTeams' Query. Allow users to pass in custom DataConnect instances. */
export function listServingTeams(vars: ListServingTeamsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListServingTeamsData>>;

/** Generated Node Admin SDK operation action function for the 'ListMembers' Query. Allow users to execute without passing in DataConnect. */
export function listMembers(dc: DataConnect, vars: ListMembersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListMembersData>>;
/** Generated Node Admin SDK operation action function for the 'ListMembers' Query. Allow users to pass in custom DataConnect instances. */
export function listMembers(vars: ListMembersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListMembersData>>;

/** Generated Node Admin SDK operation action function for the 'GetMember' Query. Allow users to execute without passing in DataConnect. */
export function getMember(dc: DataConnect, vars: GetMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetMemberData>>;
/** Generated Node Admin SDK operation action function for the 'GetMember' Query. Allow users to pass in custom DataConnect instances. */
export function getMember(vars: GetMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetMemberData>>;

/** Generated Node Admin SDK operation action function for the 'ListServiceAttendances' Query. Allow users to execute without passing in DataConnect. */
export function listServiceAttendances(dc: DataConnect, vars: ListServiceAttendancesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListServiceAttendancesData>>;
/** Generated Node Admin SDK operation action function for the 'ListServiceAttendances' Query. Allow users to pass in custom DataConnect instances. */
export function listServiceAttendances(vars: ListServiceAttendancesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListServiceAttendancesData>>;

