import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteQuestionUseCaseUseCase } from './delete-question.usecase'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions.repository'
import { MakeQuestion } from 'test/factories/make-question.factory'
import { EditQuestionUseCaseUseCase } from './edit-question.usecase'
import { NotAllowedError } from './error/not-allowed.error'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCaseUseCase

describe('DeleteQuestionion', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCaseUseCase(inMemoryQuestionRepository)
  })

  it('should be able to edit a question', async () => {
    const createdQuestion = MakeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    inMemoryQuestionRepository.create(createdQuestion)

    await sut.execute({
      questionId: createdQuestion.id.toString(),
      authorId: 'author-1',
      title: 'test question',
      content: 'test content',
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'test question',
      content: 'test content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const createdQuestion = MakeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    inMemoryQuestionRepository.create(createdQuestion)

    const result = await sut.execute({
      questionId: createdQuestion.id.toString(),
      authorId: 'author-2',
      title: 'test question',
      content: 'test content',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
