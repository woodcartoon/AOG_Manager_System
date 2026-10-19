import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut
} from "firebase/auth";
import {
    createMember,
    createService,
    deleteMember,
    getMyOrganizations,
    listMembers,
    listServiceAttendances,
    listServingTeams,
    recordServiceAttendance,
    updateMember
} from "@dataconnect/generated";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyB6N7L3kF5Tcxc8Mkop8NRtrLB5A_yJcrI",
    authDomain: "aog-data-base.firebaseapp.com",
    projectId: "aog-data-base",
    storageBucket: "aog-data-base.firebasestorage.app",
    messagingSenderId: "668946371508",
    appId: "1:668946371508:web:ea82b56ff2094a611258e1",
    measurementId: "G-TD2EEZRC6Z"
});
const auth = getAuth(firebaseApp);

let authReady;
function waitForAuthState() {
    if (!authReady) {
        authReady = new Promise((resolve, reject) => {
            let unsubscribe = () => {};
            unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(user);
            }, (error) => {
                unsubscribe();
                authReady = null;
                reject(error);
            });
        });
    }
    return authReady;
}

export async function signIn(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    authReady = Promise.resolve(credential.user);
    return credential.user;
}

export function getCurrentUser() {
    return waitForAuthState();
}

export async function signOut() {
    await firebaseSignOut(auth);
    authReady = null;
}

export async function getOrganizations() {
    const result = await getMyOrganizations();
    return result.data.userOrganizations;
}

export async function getServingTeams(orgId, fetchLatest = false) {
    const options = fetchLatest ? { fetchPolicy: "SERVER_ONLY" } : undefined;
    const result = await listServingTeams({ orgId }, options);
    return result.data.servingTeams;
}

export async function getMembers(orgId, fetchLatest = false) {
    const options = fetchLatest ? { fetchPolicy: "SERVER_ONLY" } : undefined;
    const result = await listMembers({ orgId }, options);
    return result.data.members;
}

export async function addMember(values) {
    return createMember(values);
}

export async function saveMember(values) {
    return updateMember(values);
}

export async function removeMember(values) {
    return deleteMember(values);
}

export async function createServiceRecord(values) {
    return createService(values);
}

export async function recordAttendance(values) {
    return recordServiceAttendance(values);
}

export async function getServiceAttendance(orgId, serviceId) {
    const result = await listServiceAttendances(
        { orgId, serviceId },
        { fetchPolicy: "SERVER_ONLY" }
    );
    return result.data.attendances;
}
