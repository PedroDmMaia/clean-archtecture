import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../repositories/answer-comment.repository'
import { ResourceNotFounError } from '@/core/errors/error/resource-not-founs.error'
import { NotAllowedError } from '@/core/errors/error/not-allowed.error'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  { answersComments: AnswerComment[] }
>

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

    return right({ answersComments })
  }
}
