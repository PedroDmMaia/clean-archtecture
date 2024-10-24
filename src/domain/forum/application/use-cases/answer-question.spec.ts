import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question.usecase'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers.repository'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create an answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an question', async () => {
    const result = await sut.execute({
      inspectorId: '1',
      questionId: '1',
      content: 'New Answer',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer)
  })
})
