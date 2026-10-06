"""Dependency-free local preview with Vercel-style clean page URLs."""
import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        route = urlsplit(self.path).path
        if route in ("/projects", "/resume"):
            self.path = route + ".html"
        super().do_GET()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    print(f"Preview: http://127.0.0.1:{args.port}", flush=True)
    ThreadingHTTPServer(("127.0.0.1", args.port), Handler).serve_forever()
