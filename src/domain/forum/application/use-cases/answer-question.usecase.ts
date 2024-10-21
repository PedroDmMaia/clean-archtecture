import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer.repository'

interface AnswerUseCaseRequest {
  inspectorId: string
  questionId: string
  content: string
}

interface AnswerUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    inspectorId,
    questionId,
    content,
  }: AnswerUseCaseRequest): Promise<AnswerUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(inspectorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.answerRepository.create(answer)

    return { answer }
  }
}
