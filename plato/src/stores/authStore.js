//This code was developed by Mark Marsala
import { writable } from 'svelte/store';
import { auth } from '../lib/firebase/firebase.client.js'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword, sendEmailVerification, verifyBeforeUpdateEmail } from 'firebase/auth';

export const authStore = writable({
    isLoading: true,
    currentUser: null,
    loggedIn: false       
})

export const authHandlers = {
    login: async(email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
    },
    signup: async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
    },
    logout: async () => {
        await signOut(auth)
    },
    verifyEmail: async() => {
        await sendEmailVerification(auth.currentUser)
    },
    verifyNewEmail: async(newEmail) => {
        verifyBeforeUpdateEmail(auth.currentUser, newEmail)
    },
    resetPassword: async (email) => {
        await sendPasswordResetEmail(auth, email)
    },
    updateEmail: async (email) => {
        await updateEmail(auth.currentUser, email)
    },
    updatePassword: async (password) => {
        await updatePassword(auth.currentUser, password)
    },
    forgotPasswordReset: async (email) => {
        await sendPasswordResetEmail(auth, email)
    }
}