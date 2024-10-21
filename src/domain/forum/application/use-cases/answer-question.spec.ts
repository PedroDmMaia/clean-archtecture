import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question.usecase'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

const fakeAnswersRepository: AnswerRepository = {
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    inspectorId: '1',
    questionId: '1',
    content: 'New Answer',
  })

  expect(answer.content).toEqual('New Answer')
})
