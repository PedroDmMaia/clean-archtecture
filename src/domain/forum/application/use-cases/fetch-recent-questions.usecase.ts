import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question.reposotory'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

interface FetchRecentQuestionsUseCaseRequestResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCaseUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseRequestResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return { questions }
  }
}
