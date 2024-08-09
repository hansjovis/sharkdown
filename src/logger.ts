export interface Logger {
    log: (...data: any[]) => void,
    warn: (...data: any[]) => void,
    error: (...data: any[]) => void,
    debug: (...data: any[]) => void,
}

export enum LogLevel {
    DEBUG = 3,
    WARN = 2,
    LOG = 1,
    ERROR = 0,
}

export class ConsoleLogger implements Logger {

    public logLevel: LogLevel;

    constructor(logLevel: LogLevel) {
        this.logLevel = logLevel;
    }

    log(...data: any[]) {
        if( this.logLevel >= LogLevel.LOG ) {
            console.log(...data);
        } 
    }

    warn(...data: any[]) {
        if( this.logLevel >= LogLevel.WARN ) {
            console.warn("[WARNING]", ...data);
        } 
    }

    debug(...data: any[]) {
        if( this.logLevel >= LogLevel.DEBUG ) {
            console.debug("[DEBUG]", ...data);
        } 
    }

    error(...data: any[]) {
        if( this.logLevel >= LogLevel.ERROR ) {
            console.error("[ERROR]", ...data);
        } 
    }
}