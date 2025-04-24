package main

import (
	"net/http"
	"os"

	"github.com/a-h/templ"
)

func serveFileWithOptionalNoCache(path string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if os.Getenv("ENV") == "development" {
			w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
			w.Header().Set("Pragma", "no-cache")
			w.Header().Set("Expires", "0")
		}
		http.ServeFile(w, r, path)
	}
}

func main() {
	http.Handle("/", templ.Handler(ShrimplePomodoroTimer()))
	http.HandleFunc("/shrimple-pomodoro-timer.js", serveFileWithOptionalNoCache("shrimple-pomodoro-timer.js"))
	http.HandleFunc("/output.css", serveFileWithOptionalNoCache("output.css"))
	http.HandleFunc("/work.mp3", serveFileWithOptionalNoCache("work.mp3"))
	http.HandleFunc("/break.mp3", serveFileWithOptionalNoCache("break.mp3"))

	http.ListenAndServe(":3000", nil)
}
