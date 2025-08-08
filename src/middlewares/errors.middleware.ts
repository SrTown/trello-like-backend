import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from "express-validator"

export const errors = (req: Request, res: Response, next: NextFunction) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ ok: false, message: errorMessages[0] });
  }
  next();
};

export const validateForgotPassword = [
  body('newPassword').notEmpty().withMessage('The password is mandatory.'),
  body('newPassword').isLength({ min: 6 }).withMessage('The new password must contain at least 6 characters.')
];

export const validateUpdatePassword = [
  body('password').notEmpty().withMessage('The password is mandatory.'),
  body('password').isLength({ min: 6 }).withMessage('The password must contain at least 6 characters.'),
  body('newPassword').isLength({ min: 6 }).withMessage('The new password must contain at least 6 characters.')
];

export const createUserValidator = [
  body('name').notEmpty().withMessage('The name is mandatory.'),
  body('email').notEmpty().withMessage('The email is mandatory.'),
  body('email').isEmail().withMessage('Email must be an email.'),
  body('password').notEmpty().withMessage('The passowrd is mandatory.'),
  body('password').isLength({ min: 6 }).withMessage('Password must contain at least 6 characters.')
];


export const tableNameValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { tableName } = req.params;
  if (tableName === 'users') {
    await Promise.all(createUserValidator.map(message => message.run(req)));
    next();
  } else {
    next();
  }
};
export const tableNameValidatorCreate = async (req: Request, res: Response, next: NextFunction) => {
  const { tableName } = req.params;
  if (tableName === 'users') {
    const originalBody = req.body;
    const data = req.body.data;

    for (let i = 0; i < data.length; i++) {
      req.body = data[i];
      await Promise.all(createUserValidator.map(validator => validator.run(req)));
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => `Element ${i + 1} - ${error.msg}`);
        return res.status(400).json({ ok: false, message: errorMessages });
      }
    }
    req.body = originalBody;
    next();
  } else {
    next();
  }
};