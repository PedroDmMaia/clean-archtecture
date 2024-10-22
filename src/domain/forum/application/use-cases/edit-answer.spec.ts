import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCaseUseCase } from './delete-answer.usecase'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers.repository'
import { MakeAnswer } from 'test/factories/make-answers.factory'
import { EditAnswerUseCaseUseCase } from './edit-answer.usecase'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCaseUseCase

describe('DeleteAnswerion', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCaseUseCase(inMemoryAnswerRepository)
  })

  it('should be able to edit a answer', async () => {
    const createdAnswer = MakeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    inMemoryAnswerRepository.create(createdAnswer)

    await sut.execute({
      answerId: createdAnswer.id.toString(),
      authorId: 'author-1',
      content: 'test content',
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'test content',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const createdAnswer = MakeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    inMemoryAnswerRepository.create(createdAnswer)

    await expect(() => {
      return sut.execute({
        answerId: createdAnswer.id.toString(),
        authorId: 'author-2',
        content: 'test content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
