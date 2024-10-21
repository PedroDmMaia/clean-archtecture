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
    const { answer } = await sut.execute({
      inspectorId: '1',
      questionId: '1',
      content: 'New Answer',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
  })
})
