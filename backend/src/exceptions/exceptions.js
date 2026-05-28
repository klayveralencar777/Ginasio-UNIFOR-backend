export class Exceptions extends Error {
    constructor(message, status = 400) {
        super(message)
        this.status = status
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

export class EntityNotFound extends Exceptions {
    constructor(message) {
        super(message, 404)
    }
}

export class ForbiddenError extends Exceptions {
    constructor(message) {
        super(message, 403)
    }
}

export class UnauthorizedError extends Exceptions {
    constructor(message) {
        super(message, 401)
    }
}

export class EmailAlreadyExists extends Exceptions {
    constructor(message) {
        super(message, 409)
    }
 }


 export class CpfAlreadyExists extends Exceptions {
    constructor(message) {
        super(message, 409)
    }
 }

 export class BusinessRuleError extends Exceptions {
        constructor(message) {
            super(message, 422)
        }
 }

 export class InvalidCredentials extends Exceptions {
    constructor(message) {
        super(message, 401)
    }
 }
