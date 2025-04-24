tailwindcss -i ./input.css -o ./public/output.css --watch &
python3 -m http.server 3000 --directory ./public &
browser-sync start --proxy localhost:3000 --files './public/*.html,./public/*.css,./public/*.js' --no-ui --no-open --port 3001
