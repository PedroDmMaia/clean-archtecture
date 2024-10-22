import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers.repository'
import { DeleteAnswerUseCaseUseCase } from './delete-answer.usecase'
import { MakeAnswer } from 'test/factories/make-answers.factory'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCaseUseCase

describe('Delete question', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCaseUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete a answer', async () => {
    const createdAnswer = MakeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    inMemoryAnswerRepository.create(createdAnswer)

    await sut.execute({
      authorId: 'author-1',
      answerId: 'question-1',
    })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const createdAnswer = MakeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    inMemoryAnswerRepository.create(createdAnswer)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: 'question-1',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
