'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

async function Logout() {
    await signOut({ redirect: false });
    window.location.href = '/login';
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

async function usuariosDesativados() {
    const session = await getServerSession(authOptions);
    const usuarios = await fetch(`${baseURL}ldap/desativados`, {
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

async function buscaUsuariosInativos(dias?: number) {
    if (!dias) dias = 30;
    const session = await getServerSession(authOptions);
    const usuarios = await fetch(`${baseURL}ldap/inativos?dias=${dias}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        const result = response.json();
        if (response.status === 401) Logout();
        return result;
    })
    return usuarios;
}

export { usuariosDesativados, buscaUsuariosInativos }