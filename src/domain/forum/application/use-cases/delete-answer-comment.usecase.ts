import { Either, left, right } from '@/core/either'
import { AnswerCommentRepository } from '../repositories/answer-comment.repository'
import { ResourceNotFounError } from './error/resource-not-founs.error'
import { NotAllowedError } from './error/not-allowed.error'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseRequestResponse = Either<
  ResourceNotFounError | NotAllowedError,
  {}
>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseRequestResponse> {
    const questionComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!questionComment) {
      return left(new ResourceNotFounError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentRepository.delete(questionComment)

    return right({})
  }
}
