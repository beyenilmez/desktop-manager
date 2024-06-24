package main

import (
	"log"
	"os"
)

type Logger interface {
	Print(message string)
	Trace(message string)
	Debug(message string)
	Info(message string)
	Warning(message string)
	Error(message string)
	Fatal(message string)
}

// Logger is a utility to log messages to a number of destinations
type FileLogger struct {
	filename string
}

// NewLogger creates a new Logger.
func NewLogger(filename string) Logger {
	return &FileLogger{
		filename: filename,
	}
}

// Print works like Sprintf.
func (l *FileLogger) Print(message string) {
	f, err := os.OpenFile(l.filename, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0o644)
	if err != nil {
		log.Fatal(err)
	}
	if _, err := f.WriteString(message); err != nil {
		f.Close()
		log.Fatal(err)
	}
	f.Close()
}

func (l *FileLogger) Println(message string) {
	l.Print(message + "\n")
}

// Trace level logging. Works like Sprintf.
func (l *FileLogger) Trace(message string) {
	println("TRACE | " + message)
	l.Println("TRACE | " + message)
}

// Debug level logging. Works like Sprintf.
func (l *FileLogger) Debug(message string) {
	println("DEBUG | " + message)
	l.Println("DEBUG | " + message)
}

// Info level logging. Works like Sprintf.
func (l *FileLogger) Info(message string) {
	println("INFO  | " + message)
	l.Println("INFO  | " + message)
}

// Warning level logging. Works like Sprintf.
func (l *FileLogger) Warning(message string) {
	println("WARN  | " + message)
	l.Println("WARN  | " + message)
}

// Error level logging. Works like Sprintf.
func (l *FileLogger) Error(message string) {
	println("ERROR | " + message)
	l.Println("ERROR | " + message)
}

// Fatal level logging. Works like Sprintf.
func (l *FileLogger) Fatal(message string) {
	println("FATAL | " + message)
	l.Println("FATAL | " + message)
	os.Exit(1)
}