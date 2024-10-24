import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../repositories/answer-comment.repository'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface FetchAnswerCommentsUseCaseResponse {
  answersComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}
  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answersComments =
      await this.answerCommentRepository.findManyByAnswerId(answerId, {
        page,
      })

    return { answersComments }
  }
}
