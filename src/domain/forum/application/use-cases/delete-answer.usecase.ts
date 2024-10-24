import { Either, left, right } from '@/core/either'
import { AnswerRepository } from '../repositories/answer.repository'
import { ResourceNotFounError } from './error/resource-not-founs.error'
import { NotAllowedError } from './error/not-allowed.error'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseRequestResponse = Either<
  ResourceNotFounError | NotAllowedError,
  {}
>

export class DeleteAnswerUseCaseUseCase {
  constructor(private questionRepository: AnswerRepository) {}
  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseRequestResponse> {
    const answer = await this.questionRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFounError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionRepository.delete(answer)

    return right({})
  }
}
