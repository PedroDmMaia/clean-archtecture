import { Either, left, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer.repository'
import { ResourceNotFounError } from './error/resource-not-founs.error'
import { NotAllowedError } from './error/not-allowed.error'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseRequestResponse = Either<
  ResourceNotFounError | NotAllowedError,
  { answer: Answer }
>

export class EditAnswerUseCaseUseCase {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseRequestResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFounError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return right({ answer })
  }
}
