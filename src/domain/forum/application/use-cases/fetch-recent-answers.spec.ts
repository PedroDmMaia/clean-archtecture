import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers.repository'
import { FetchRecentQuestionsUseCaseUseCase } from './fetch-recent-questions.usecase'
import { MakeQuestion } from 'test/factories/make-question.factory'
import { FetchRecentAnswersUseCaseUseCase } from './fetch-recent-answers.use.case'
import { MakeAnswer } from 'test/factories/make-answers.factory'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswerRepository
let sut: FetchRecentAnswersUseCaseUseCase

describe('Fetch recent answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    sut = new FetchRecentAnswersUseCaseUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question amswer', async () => {
    await inMemoryAnswersRepository.create(
      MakeAnswer({ questionId: new UniqueEntityId('question-01') }),
    )

    await inMemoryAnswersRepository.create(
      MakeAnswer({ questionId: new UniqueEntityId('question-01') }),
    )

    await inMemoryAnswersRepository.create(
      MakeAnswer({ questionId: new UniqueEntityId('question-01') }),
    )

    const { answers } = await sut.execute({
      quetionId: 'question-01',
      page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        MakeAnswer({
          questionId: new UniqueEntityId('question-01'),
        }),
      )
    }

    const { answers } = await sut.execute({
      quetionId: 'question-01',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
