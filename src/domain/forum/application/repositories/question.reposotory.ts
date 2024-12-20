import { PaginationParams } from '@/core/repositories/pagination-parms.repository'
import { Question } from '../../enterprise/entities/question'

export interface QuestionRepository {
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  save(question: Question): Promise<void>
  create(question: Question): Promise<Question>
  delete(question: Question): Promise<void>
}
