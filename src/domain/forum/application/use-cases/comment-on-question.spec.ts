import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions.repository'
import { MakeQuestion } from 'test/factories/make-question.factory'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment.repository'
import { CommentOnQuestionUseCaseUseCase } from './comment-on-question.usecase'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCaseUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new CommentOnQuestionUseCaseUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = MakeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'New comment',
    })

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      'New comment',
    )
  })
})
