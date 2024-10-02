'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

async function usuariosExonerados() {
    const session = await getServerSession(authOptions);
    const exonerados = await fetch(`${baseURL}exonerados/compare`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) Logout();
        return response.json();
    })
    return exonerados;    
}

export { usuariosExonerados }