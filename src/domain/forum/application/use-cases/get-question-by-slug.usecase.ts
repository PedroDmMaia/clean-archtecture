import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question.reposotory'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

interface GetQuestionBySlugUseCaseRequestResponse {
  question: Question
}

export class GetQuestionBySlugUseCaseUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseRequestResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }
    return { question }
  }
}
