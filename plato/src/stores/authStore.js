import { writable } from 'svelte/store';
import { auth } from '../lib/firebase/firebase.client.js'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword } from 'firebase/auth';

export const authStore = writable({
    isLoading: true,
    currentUser: null
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
    resetPassword: async (email) => {
        await sendPasswordResetEmail(auth, email)
    },
    updateEmail: async (email) => {
        await updateEmail(auth, email)
    },
    updatePassword: async (password) => {
        await updatePassword(auth, password)
    }
}