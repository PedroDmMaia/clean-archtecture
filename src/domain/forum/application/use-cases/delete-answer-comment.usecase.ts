import { AnswerCommentRepository } from '../repositories/answer-comment.repository'
import { QuestionCommentRepository } from '../repositories/question-comments.repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseRequestResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseRequestResponse> {
    const questionComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!questionComment) {
      throw new Error('Question comment not found.')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.answerCommentRepository.delete(questionComment)

    return {}
  }
}
