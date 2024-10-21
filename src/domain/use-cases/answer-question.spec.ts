import { AnswerQuestionUseCase } from './answer-question.usecase'
import { AnswerRepository } from '../repositories/answer.repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswerRepository = {
  create: async (answer: Answer) => {
    console.log(answer)
  },
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
