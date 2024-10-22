import { AnswerRepository } from '../repositories/answer.repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswerUseCaseRequestResponse {}

export class DeleteAnswerUseCaseUseCase {
  constructor(private questionRepository: AnswerRepository) {}
  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseRequestResponse> {
    const answer = await this.questionRepository.findById(answerId)

    if (!answer) {
      throw new Error('Question not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.questionRepository.delete(answer)

    return {}
  }
}
