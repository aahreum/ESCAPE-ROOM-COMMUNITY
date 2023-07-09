/* 회원가입 유효성 검사 정규식 */
export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{6,}$/
export const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣]{1,6}$/
