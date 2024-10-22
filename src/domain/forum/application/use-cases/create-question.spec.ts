import { QuestionRepository } from '../repositories/question.reposotory'
import { Question } from '../../enterprise/entities/question'
import { CreateQuestionUseCaseUseCase } from './create-question.usecase'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions.repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCaseUseCase

describe('Create a question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCaseUseCase(inMemoryQuestionRepository)
  })

  it('should be able to create an answer', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'New Question',
      content: 'New Content',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id)
  })
})
