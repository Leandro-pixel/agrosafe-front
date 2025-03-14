import { PaginatedResponse } from 'src/lib/api';
import { UserCardRepository } from 'src/repositories/userCardRepository';

class FetchUserCardsUseCase {
  private userCardRepository: UserCardRepository;
  constructor(userCardRepository: UserCardRepository) {
    this.userCardRepository = userCardRepository;
  }

  async execute(
    userId?: number,
    cardId?: number
  ): Promise<PaginatedResponse> {
    return this.userCardRepository.fetchCards(
      userId,
      cardId
    );
  }
}

export default FetchUserCardsUseCase;
