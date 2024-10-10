import assert from 'node:assert'
import { HttpStatusCode } from '../constants/http'
import AppError from './appError'

/*
 * Asserts a condition and throws an AppError if the condition is falsy.
*/

type AppAssert = (
    condition: any,
    HttpStatusCode: HttpStatusCode,
    message: string,
) => asserts condition

const appAssert : AppAssert= (
    condition,
    HttpStatusCode,
    message,
) => assert( condition, new AppError(HttpStatusCode, message) )

export default appAssert