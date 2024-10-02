import { Business, Handyman, Home, Person } from '@mui/icons-material';

export interface IMenuOption {
    title:  string;
    href:   string;
    name:   string;
    icon:   any; 
};

export interface IMenu {
    userOptions:    IMenuOption[];
    adminOptions:   IMenuOption[];
}


export const menu: IMenu = {
    userOptions: [
        {
            title: 'Página Inicial',
            href: '/',
            name: '/',
            icon: Home,
        },
    ],
    adminOptions: [
        {
            title: 'Usuários',
            href: '/usuarios',
            name: 'usuarios',
            icon: Person,
        },
        {
            title: 'Usuários de rede desativados',
            href: '/desativados',
            name: 'desativados',
            icon: Person,
        },
        {
            title: 'Usuários de rede inativos',
            href: '/inativos',
            name: 'inativos',
            icon: Person,
        },
        {
            title: 'Exonerados',
            href: '/exonerados',
            name: 'exonerados',
            icon: Person,
        },

    ]
}