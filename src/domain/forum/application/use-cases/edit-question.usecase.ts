import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question.reposotory'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionUseCaseRequestResponse {
  question: Question
}

export class EditQuestionUseCaseUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseRequestResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return { question }
  }
}
