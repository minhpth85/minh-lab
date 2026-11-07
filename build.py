#!/usr/bin/env python3
"""Gộp assets/style.css, data/posts.js, assets/app.js vào index.html và post.html
để mở file kiểu nào cũng chạy (file://, preview, Cloudflare Pages).
Sửa nội dung trong src/*.template.html, assets/, data/ rồi chạy: python3 build.py"""
import pathlib, re
root = pathlib.Path(__file__).parent
read = lambda p: (root / p).read_text(encoding="utf-8")
css, data, app = read("assets/style.css"), read("data/posts.js"), read("assets/app.js")
for name in ("index", "post"):
    html = read(f"src/{name}.template.html")
    html = html.replace('<link rel="stylesheet" href="assets/style.css">', f"<style>\n{css}\n</style>")
    html = html.replace('<script src="data/posts.js"></script>', f"<script>\n{data}\n</script>")
    html = html.replace('<script src="assets/app.js"></script>', f"<script>\n{app}\n</script>")
    (root / f"{name}.html").write_text(html, encoding="utf-8")
    print("built", f"{name}.html")
