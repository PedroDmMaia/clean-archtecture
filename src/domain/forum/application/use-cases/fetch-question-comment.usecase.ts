import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comments.repository'
import { QuestionRepository } from '../repositories/question.reposotory'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  { questionsComments: QuestionComment[] }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}
  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionsComments =
      await this.questionCommentRepository.findManyByQuestioId(questionId, {
        page,
      })

    return right({ questionsComments })
  }
}
