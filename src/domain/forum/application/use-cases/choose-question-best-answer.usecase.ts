import { AnswerRepository } from '../repositories/answer.repository'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question.reposotory'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) throw new Error('Answer not found.')

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )
    if (!question) throw new Error('Question not found.')

    if (authorId !== question.authorId.toString())
      throw new Error('Not allowed.')

    question.bestQuestionId = answer.id

    await this.questionRepository.save(question)

    return { question }
  }
}
