import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question.reposotory'
import { ResourceNotFounError } from './error/resource-not-founs.error'
import { NotAllowedError } from './error/not-allowed.error'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseRequestResponse = Either<
  ResourceNotFounError | NotAllowedError,
  { question: Question }
>

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
      return left(new ResourceNotFounError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return right({ question })
  }
}
