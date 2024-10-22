import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer.repository'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseRequestResponse {
  answer: Answer
}

export class EditAnswerUseCaseUseCase {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseRequestResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return { answer }
  }
}
