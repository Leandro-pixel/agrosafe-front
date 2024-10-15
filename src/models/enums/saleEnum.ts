export enum SaleStatus {
  PROCESSING = 'processing',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  PENDING = 'pending',
  MANUALLY_CANCELLED = 'manuallyCancelled',
  PARTIALLY_APPROVED = 'partiallyApproved',
  DENIED = 'denied',
  MANUALLY_APPROVED = 'manuallyApproved'
}

export const ALL_SALE_STATUS = [
	{ label: 'Processando', value: SaleStatus.PROCESSING },
	{ label: 'Aprovado', value: SaleStatus.APPROVED },
	{ label: 'Rejeitado', value: SaleStatus.REJECTED },
	{ label: 'Cancelado', value: SaleStatus.CANCELLED },
	{ label: 'Reembolsado', value: SaleStatus.REFUNDED },
	{ label: 'Pendente', value: SaleStatus.PENDING },
	{ label: 'Cancelado Manualmente', value: SaleStatus.MANUALLY_CANCELLED },
	{ label: 'Parcialmente Aprovado', value: SaleStatus.PARTIALLY_APPROVED },
	{ label: 'Negado', value: SaleStatus.DENIED },
	{ label: 'Aprovado Manualmente', value: SaleStatus.MANUALLY_APPROVED }
]

export function translateSaleStatus (status: string): string {
	switch (status) {
	case SaleStatus.PROCESSING:
		return 'Processando'
	case SaleStatus.APPROVED:
		return 'Aprovado'
	case SaleStatus.REJECTED:
		return 'Rejeitado'
	case SaleStatus.CANCELLED:
		return 'Cancelado'
	case SaleStatus.REFUNDED:
		return 'Reembolsado'
	case SaleStatus.PENDING:
		return 'Pendente'
	case SaleStatus.MANUALLY_CANCELLED:
		return 'Cancelado Manualmente'
	case SaleStatus.PARTIALLY_APPROVED:
		return 'Parcialmente Aprovado'
	case SaleStatus.DENIED:
		return 'Negado'
	case SaleStatus.MANUALLY_APPROVED:
		return 'Aprovado Manualmente'
	default:
		return 'Desconhecido'
	}
}

export function translateSaleStatusToColor (status: string): string {
	status = convertSaleStatus(status)
	switch (status) {
	case SaleStatus.PROCESSING:
		return 'info'
	case SaleStatus.APPROVED:
		return 'positive'
	case SaleStatus.REJECTED:
		return 'red'
	case SaleStatus.CANCELLED:
		return 'red'
	case SaleStatus.REFUNDED:
		return 'warning'
	case SaleStatus.PENDING:
		return 'info'
	case SaleStatus.MANUALLY_CANCELLED:
		return 'red'
	case SaleStatus.PARTIALLY_APPROVED:
		return 'positive'
	case SaleStatus.DENIED:
		return 'purple-5'
	case SaleStatus.MANUALLY_APPROVED:
		return 'positive'
	default:
		return 'grey'
	}
}

export function convertSaleStatus (status: string): string {
	switch (status) {
	case 'Processando':
		return SaleStatus.PROCESSING
	case 'Aprovado':
		return SaleStatus.APPROVED
	case 'Rejeitado':
		return SaleStatus.REJECTED
	case 'Cancelado':
		return SaleStatus.CANCELLED
	case 'Reembolsado':
		return SaleStatus.REFUNDED
	case 'Pendente':
		return SaleStatus.PENDING
	case 'Cancelado Manualmente':
		return SaleStatus.MANUALLY_CANCELLED
	case 'Parcialmente Aprovado':
		return SaleStatus.PARTIALLY_APPROVED
	case 'Negado':
		return SaleStatus.DENIED
	case 'Aprovado Manualmente':
		return SaleStatus.MANUALLY_APPROVED
	default:
		return 'Desconhecido'
	}
}
