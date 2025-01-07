enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING_APPROVAL = 'pendingApproval'
}

export const ALL_ACTIVE_STATUS = [
	{ label: 'Ativo', value: UserStatus.ACTIVE },
	{ label: 'Inativo', value: UserStatus.INACTIVE },
	{ label: 'Aguardando aprovação', value: UserStatus.PENDING_APPROVAL }
]

export function translateStatus (status: string): string {
	switch (status) {
	case UserStatus.ACTIVE:
		return 'Ativo'
	case UserStatus.INACTIVE:
		return 'Inativo'
	case UserStatus.PENDING_APPROVAL:
		return 'Aguardando aprovação'
	default:
		return 'Desconhecido'
	}
}

export function translateStatusToColor (status: string): string {
	switch (status) {
	case UserStatus.ACTIVE:
	case 'Ativo':
		return 'positive'
  case 'pending':
		return 'positive'
  case 'client':
		return 'positive'
	case UserStatus.INACTIVE:
	case 'Inativo':
		return 'red'
    case 'lead':
		return 'red'
  case 'onHold':
		return 'red'
  case 'Inadimplente':
		return 'red'
	case UserStatus.PENDING_APPROVAL:
	case 'Aguardando aprovação':
		return 'warning'
	default:
		return 'grey'
	}
}

