import { PaginatedResponse } from 'src/lib/api'
import { NotificationRepository } from 'src/repositories/notificationRepository'

class FetchNotificationUseCase {
	private notificationRepository: NotificationRepository
	constructor (notificationRepository: NotificationRepository) {
		this.notificationRepository = notificationRepository
	}

	async execute (limit:number, offset:number, filter:string): Promise<PaginatedResponse> {
    console.log('veio aqui notificação')
		return this.notificationRepository.fetchNotifications(limit, offset, filter)
	}
}

export default FetchNotificationUseCase
