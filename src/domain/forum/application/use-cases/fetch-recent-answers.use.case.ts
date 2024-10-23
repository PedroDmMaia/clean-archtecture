import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer.repository'

interface FetchquestionsAnswersUseCaseRequest {
  quetionId: string
  page: number
}

interface FetchquestionsAnswersUseCaseRequestResponse {
  answers: Answer[]
}

export class FetchRecentAnswersUseCaseUseCase {
  constructor(private answersRepository: AnswerRepository) {}
  async execute({
    quetionId,
    page,
  }: FetchquestionsAnswersUseCaseRequest): Promise<FetchquestionsAnswersUseCaseRequestResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      quetionId,
      { page },
    )

    return { answers }
  }
}
