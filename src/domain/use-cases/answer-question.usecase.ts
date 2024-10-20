import { Answer } from "../entities/answer"
import { AnswerRepository } from "../repositories/answer.repository"

interface AnswerUseCaseRequest {
  inspectorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({ inspectorId, questionId, content }: AnswerUseCaseRequest) {
    const answer = new Answer({ content, authorId: inspectorId, questionId })

    await this.answerRepository.create(answer)

    return answer
  }
}
