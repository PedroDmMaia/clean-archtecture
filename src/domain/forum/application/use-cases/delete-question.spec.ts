import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions.repository'
import { MakeQuestion } from 'test/factories/make-question.factory'
import { DeleteQuestionUseCaseUseCase } from './delete-question.usecase'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './error/not-allowed.error'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCaseUseCase

describe('Delete question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionUseCaseUseCase(inMemoryQuestionRepository)
  })

  it('should be able to delete a question', async () => {
    const createdQuestion = MakeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    inMemoryQuestionRepository.create(createdQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
    })

    expect(inMemoryQuestionRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const createdQuestion = MakeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    inMemoryQuestionRepository.create(createdQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: 'question-1',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
