enum UserType {
	SYS_ADMIN = 'sysAdmin',
	ADMIN = 'admin',
	HUB = 'hub',
	STORE = 'store',
	SELLER = 'seller',
	GUEST = 'guest',
}

export const ALL_USER_TYPES = [
	{ label: 'Administrador do Sistema', value: UserType.SYS_ADMIN },
	{ label: 'Administrador', value: UserType.ADMIN },
	{ label: 'Polo', value: UserType.HUB },
	{ label: 'Loja', value: UserType.STORE },
	{ label: 'Vendedor', value: UserType.SELLER },
	{ label: 'Convidado', value: UserType.GUEST }
]

export function translateUserType (type: string): string {
	switch (type) {
	case UserType.SYS_ADMIN:
		return 'Administrador do Sistema'
	case UserType.ADMIN:
		return 'Administrador'
	case UserType.HUB:
		return 'Polo'
	case UserType.STORE:
		return 'Loja'
	case UserType.SELLER:
		return 'Vendedor'
	case UserType.GUEST:
		return 'Convidado'
	default:
		return 'Desconhecido'
	}
}
