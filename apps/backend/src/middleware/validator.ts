import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      status: 'error',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  };
};

// Common validation rules
export const commonValidations = {
  id: {
    in: ['params'],
    isMongoId: {
      errorMessage: 'Invalid ID format'
    }
  },
  page: {
    in: ['query'],
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: 'Page must be a positive integer'
    }
  },
  limit: {
    in: ['query'],
    optional: true,
    isInt: {
      options: { min: 1, max: 100 },
      errorMessage: 'Limit must be between 1 and 100'
    }
  },
  search: {
    in: ['query'],
    optional: true,
    isString: {
      errorMessage: 'Search query must be a string'
    },
    isLength: {
      options: { min: 1, max: 100 },
      errorMessage: 'Search query must be between 1 and 100 characters'
    }
  }
}; 