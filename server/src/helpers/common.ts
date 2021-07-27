/**
 * Common Library
 */
import randomstring from 'randomstring';
import { Err } from '../types';

/**
 * Error 발생기
 * @param message Error Message
 * @param status HTTP Status Code, Default 500
 */
export const throwError = (message: string, status = 500) => {
  const error = new Error(message) as Err;
  error.status = status;
  throw error;
};

/**
 * 랜덤 문자열 발생기
 * @param length 문자열 길이 (prefix 제외)
 * @param prefix 문자열의 prefix
 */
export const createRandomString = (length: number, prefix = ''): string => {
  try {
    return `${prefix}${randomstring.generate(length)}`;
  } catch (e) {
    throw e;
  }
};

/**
 * 데이터 검사 함수
 * 타입검사를 하는 경우 타입 불 일치 시 false 반환 (optional),
 * 타입검사를 안 하는 경우 undefined 또는 null 인 경우 false 반환,
 * 참고: null의 데이터 타입은 object
 */
export const checkData = (data: unknown, type?: string): boolean => {
  try {
    if (type !== undefined) {
      const dataType = typeof data;

      if (dataType !== type) {
        return false;
      }

      return true;
    }

    if (data === undefined || data === null) {
      return false;
    }

    return true;
  } catch (e) {
    throw e;
  }
};
