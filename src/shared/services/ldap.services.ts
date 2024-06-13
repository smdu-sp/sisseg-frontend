'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

async function getUsers() {
    const session = await getServerSession(authOptions);
    const usuarios = await fetch(`${baseURL}ldap/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        const result = response.json();
        console.log(result);
        if (response.status === 401) Logout();
        return result;
    })
    return usuarios;
}

export { getUsers }