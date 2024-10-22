import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers.repository'
import { DeleteAnswerUseCaseUseCase } from './delete-answer.usecase'
import { MakeAnswer } from 'test/factories/make-answers.factory'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions.repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer.usecase'
import { MakeQuestion } from 'test/factories/make-question.factory'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose question best answer', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryQuestionRepository,
    )
  })

  it('should be able to choose the question best answer', async () => {
    const question = MakeQuestion()
    const answer = MakeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString(),
    })

    expect(inMemoryQuestionRepository.items[0].bestQuestionId).toEqual(
      answer.id,
    )
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = MakeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })
    const answer = MakeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: answer.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})