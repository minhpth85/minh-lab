/* Minh's Lab — logic dùng chung cho index và trang chi tiết */
(function () {
  "use strict";

  /* ---------- tiện ích ---------- */
  var KEY = "mlab:v1";
  function load() {
    try { return Object.assign({ fav: {}, read: {}, notes: {}, hl: {}, theme: "" }, JSON.parse(localStorage.getItem(KEY) || "{}")); }
    catch (e) { return { fav: {}, read: {}, notes: {}, hl: {}, theme: "" }; }
  }
  var S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d"); }
  function fmtDate(d) { var t = new Date(d + "T00:00:00"); return isNaN(t) ? d : t.toLocaleDateString("vi-VN"); }
  function stars(n) {
    var h = "";
    for (var i = 1; i <= 5; i++) h += i <= n ? "★" : '<span class="off">★</span>';
    return '<span class="stars" role="img" aria-label="' + n + ' trên 5 sao">' + h + "</span>";
  }
  function href(p) { return p.fullPage || "post.html?id=" + encodeURIComponent(p.id); }
  function byId(id) { return (window.POSTS || []).filter(function (p) { return p.id === id; })[0]; }

  /* ---------- dark mode ---------- */
  function applyTheme() {
    if (S.theme) document.documentElement.setAttribute("data-theme", S.theme);
    else document.documentElement.removeAttribute("data-theme");
    var b = document.getElementById("themeBtn");
    if (b) {
      var dark = S.theme ? S.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
      b.textContent = dark ? "☀" : "☾";
      b.setAttribute("aria-label", dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối");
    }
  }
  function initTheme() {
    applyTheme();
    var b = document.getElementById("themeBtn");
    if (b) b.addEventListener("click", function () {
      var dark = S.theme ? S.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
      S.theme = dark ? "light" : "dark"; save(); applyTheme();
    });
  }

  /* ---------- trang chủ ---------- */
  function initIndex() {
    var posts = window.POSTS || [];
    var f = { q: "", topic: "all", tag: "", status: "all", sort: "new" };
    var grid = document.getElementById("grid");
    var count = document.getElementById("count");

    function pills(el, items, key, allLabel) {
      el.innerHTML = '<button class="pill" data-v="" aria-pressed="true">' + allLabel + "</button>" +
        items.map(function (it) { return '<button class="pill" data-v="' + esc(it.v) + '" aria-pressed="false">' + esc(it.v) + "<small>" + it.n + "</small></button>"; }).join("");
      el.addEventListener("click", function (e) {
        var b = e.target.closest(".pill"); if (!b) return;
        var v = b.getAttribute("data-v");
        f[key] = (key === "tag" && f.tag === v) ? "" : v;
        if (key === "topic" && v === "") f.topic = "all";
        Array.prototype.forEach.call(el.querySelectorAll(".pill"), function (x) {
          var xv = x.getAttribute("data-v");
          x.setAttribute("aria-pressed", String((f[key] === "all" ? "" : f[key]) === xv));
        });
        render();
      });
    }
    function counts(field) {
      var m = {};
      posts.forEach(function (p) { [].concat(p[field]).forEach(function (v) { m[v] = (m[v] || 0) + 1; }); });
      return Object.keys(m).sort().map(function (v) { return { v: v, n: m[v] }; });
    }
    var topicItems = (window.TOPICS || []).map(function (t) { return { v: t, n: posts.filter(function (p) { return p.topic === t; }).length }; });
    pills(document.getElementById("topics"), topicItems, "topic", "Tất cả");
    pills(document.getElementById("tags"), counts("tags"), "tag", "Tất cả");

    document.getElementById("q").addEventListener("input", function (e) { f.q = norm(e.target.value.trim()); render(); });
    document.getElementById("sort").addEventListener("change", function (e) { f.sort = e.target.value; render(); });
    document.getElementById("status").addEventListener("click", function (e) {
      var b = e.target.closest(".pill"); if (!b) return;
      f.status = b.getAttribute("data-v");
      Array.prototype.forEach.call(this.querySelectorAll(".pill"), function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      render();
    });

    function hay(p) {
      return norm([p.title, p.channel, p.topic, p.tags.join(" "), p.summary, p.keyPoints.join(" "),
        p.quotes.map(function (x) { return x.text + " " + (x.vi || ""); }).join(" ")].join(" "));
    }
    function match(p) {
      if (f.topic !== "all" && p.topic !== f.topic) return false;
      if (f.tag && p.tags.indexOf(f.tag) < 0) return false;
      if (f.status === "fav" && !S.fav[p.id]) return false;
      if (f.status === "unread" && S.read[p.id]) return false;
      if (f.status === "read" && !S.read[p.id]) return false;
      if (f.q && hay(p).indexOf(f.q) < 0) return false;
      return true;
    }
    function card(p) {
      var fav = !!S.fav[p.id];
      return '<article class="card">' +
        (S.read[p.id] ? '<span class="badge-read">Đã đọc</span>' : "") +
        '<button class="fav" data-id="' + esc(p.id) + '" aria-pressed="' + fav + '" aria-label="' + (fav ? "Bỏ yêu thích" : "Thêm vào yêu thích") + '">' + (fav ? "♥" : "♡") + "</button>" +
        '<a class="cover" href="' + esc(href(p)) + '" tabindex="-1" aria-hidden="true"><img loading="lazy" alt="" src="https://img.youtube.com/vi/' + esc(p.videoId) + '/hqdefault.jpg"></a>' +
        '<div class="card-body">' +
        '<div class="chips"><span class="chip">' + esc(p.topic) + "</span></div>" +
        '<h3><a href="' + esc(href(p)) + '">' + esc(p.title) + "</a></h3>" +
        '<div class="meta">' + esc(p.channel) + " · " + fmtDate(p.watched) + "</div>" +
        stars(p.rating) +
        '<div class="chips">' + p.tags.slice(0, 4).map(function (t) { return '<span class="chip chip--ghost">#' + esc(t) + "</span>"; }).join("") + "</div>" +
        "</div></article>";
    }
    function render() {
      var list = posts.filter(match).sort(function (a, b) {
        return f.sort === "rating" ? (b.rating - a.rating) || b.watched.localeCompare(a.watched) : b.watched.localeCompare(a.watched);
      });
      count.textContent = list.length + " / " + posts.length + " bài";
      grid.innerHTML = list.length ? list.map(card).join("") :
        '<div class="empty"><b>Chưa có bài nào khớp.</b><br>Thử bỏ bớt bộ lọc hoặc đổi từ khóa tìm kiếm.</div>';
    }
    /* phần homepage: thống kê, chủ đề, bài mới nhất */
    var avg = posts.length ? (posts.reduce(function (s, p) { return s + p.rating; }, 0) / posts.length).toFixed(1) : "–";
    var channels = {}; posts.forEach(function (p) { channels[p.channel] = 1; });
    document.getElementById("stats").innerHTML =
      '<div class="stat"><b>' + posts.length + "</b><span>bài tóm tắt</span></div>" +
      '<div class="stat"><b>' + Object.keys(channels).length + "</b><span>kênh YouTube</span></div>" +
      '<div class="stat"><b>' + avg + " ★</b><span>đánh giá trung bình</span></div>";
    var desc = { "Học nói tiếng Anh": "Khung trả lời, mẫu câu và cách luyện nói mỗi ngày.", "Mindset": "Tư duy và thói quen giúp mình đi đường dài.", "Tâm lý": "Hiểu cảm xúc, hành vi của mình và của người khác." };
    document.getElementById("topicCards").innerHTML = (window.TOPICS || []).map(function (t, i) {
      var n = posts.filter(function (p) { return p.topic === t; }).length;
      return '<button class="tcard" data-t="' + esc(t) + '"><div class="icon">' + (i + 1) + "</div><h3>" + esc(t) + "</h3><p>" + esc(desc[t] || "") + " · " + n + " bài</p></button>";
    }).join("");
    document.getElementById("topicCards").addEventListener("click", function (e) {
      var b = e.target.closest(".tcard"); if (!b) return;
      var pill = Array.prototype.filter.call(document.querySelectorAll("#topics .pill"), function (x) { return x.getAttribute("data-v") === b.getAttribute("data-t"); })[0];
      if (pill) pill.click();
      document.getElementById("library").scrollIntoView({ behavior: "smooth" });
    });
    if (posts.length) {
      var l = posts.slice().sort(function (a, b) { return b.watched.localeCompare(a.watched); })[0];
      document.getElementById("latest").innerHTML = '<div class="feature"><a class="cover" href="' + esc(href(l)) + '"><img alt="" src="https://img.youtube.com/vi/' + esc(l.videoId) + '/hqdefault.jpg"></a><div>' +
        '<span class="chip">' + esc(l.topic) + "</span><h2>" + esc(l.title) + "</h2><p>" + esc(l.summary) + '</p><div class="meta" style="margin-bottom:16px">' + esc(l.channel) + " · " + fmtDate(l.watched) + " · " + stars(l.rating) + '</div><a class="btn btn--primary" href="' + esc(href(l)) + '">Đọc bài học</a></div></div>';
      document.getElementById("latest-wrap").hidden = false;
    }

    grid.addEventListener("click", function (e) {
      var b = e.target.closest(".fav"); if (!b) return;
      var id = b.getAttribute("data-id");
      S.fav[id] = !S.fav[id]; if (!S.fav[id]) delete S.fav[id];
      save(); render();
    });
    render();
  }

  /* ---------- trang chi tiết ---------- */
  function withHl(text, list) {
    var parts = esc(text).split(/(<[^>]+>)/);
    list.forEach(function (s) {
      var e = esc(s);
      parts = parts.map(function (seg) { return seg.charAt(0) === "<" ? seg : seg.split(e).join("<mark>" + e + "</mark>"); });
    });
    return parts.join("");
  }
  function initPost() {
    var id = new URLSearchParams(location.search).get("id");
    var p = byId(id);
    var root = document.getElementById("post");
    if (!p) {
      root.innerHTML = '<div class="wrap wrap--narrow post-head"><a class="back" href="index.html">← Về thư viện</a><h1>Không tìm thấy bài này</h1></div>';
      return;
    }
    document.title = p.title + " · Minh's Lab";
    function draw() {
      var hl = S.hl[p.id] || [];
      var fav = !!S.fav[p.id], read = !!S.read[p.id];
      root.innerHTML =
        '<div class="wrap wrap--narrow"><div class="post-head">' +
        '<a class="back" href="index.html">← Về thư viện</a><br>' +
        '<span class="chip">' + esc(p.topic) + "</span>" +
        "<h1>" + esc(p.title) + "</h1>" +
        '<div class="meta-row"><span>' + esc(p.channel) + "</span><span>Đã xem " + fmtDate(p.watched) + "</span>" + stars(p.rating) + "</div>" +
        '<div class="chips" style="margin-top:14px">' + p.tags.map(function (t) { return '<a class="chip chip--ghost" style="text-decoration:none" href="index.html">#' + esc(t) + "</a>"; }).join("") + "</div>" +
        '<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(p.videoId) + '" title="' + esc(p.title) + '" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>' +
        '<div class="actions">' +
        '<button class="btn btn--secondary" id="favBtn" aria-pressed="' + fav + '">' + (fav ? "♥ Đã yêu thích" : "♡ Yêu thích") + "</button>" +
        '<button class="btn btn--secondary" id="readBtn" aria-pressed="' + read + '">' + (read ? "✓ Đã đọc" : "Đánh dấu đã đọc") + "</button>" +
        '<a class="btn btn--secondary" href="' + esc(p.youtube) + '" target="_blank" rel="noopener">Mở trên YouTube ↗</a>' +
        (p.fullPage ? '<a class="btn btn--primary" href="' + esc(p.fullPage) + '">Xem bài học đầy đủ</a>' : "") +
        "</div></div>" +
        '<div class="block"><p class="lead" style="margin-top:0">' + esc(p.summary) + "</p></div>" +
        '<div class="block reading"><span class="eyebrow">Ý chính</span><ol class="points">' +
        p.keyPoints.map(function (k) { return "<li><span>" + withHl(k, hl) + "</span></li>"; }).join("") + "</ol>" +
        '<p class="muted" style="margin-top:12px">Mẹo: bôi đen một đoạn chữ để highlight lại.</p></div>' +
        '<div class="block reading"><span class="eyebrow">Trích dẫn hay</span>' +
        p.quotes.map(function (q) { return '<blockquote class="quote"><p>“' + withHl(q.text, hl) + '”</p>' + (q.vi ? '<span class="vi">' + esc(q.vi) + "</span>" : "") + "</blockquote>"; }).join("") + "</div>" +
        '<div class="block notes"><span class="eyebrow">Highlight của bạn</span>' +
        (hl.length ? '<ul class="hl-list">' + hl.map(function (s, i) { return "<li><span>" + esc(s) + '</span><button data-i="' + i + '" aria-label="Xóa highlight">×</button></li>'; }).join("") + "</ul>" : '<p class="muted">Chưa có highlight nào.</p>') +
        '<div style="height:24px"></div><span class="eyebrow">Ghi chú cá nhân</span>' +
        '<textarea id="note" placeholder="Bạn rút ra điều gì? Sẽ áp dụng thế nào?">' + esc(S.notes[p.id] || "") + "</textarea>" +
        '<p class="muted" style="margin-top:8px">Ghi chú, yêu thích và highlight chỉ được lưu trên trình duyệt này.</p></div></div>';

      document.getElementById("favBtn").onclick = function () { S.fav[p.id] = !S.fav[p.id]; if (!S.fav[p.id]) delete S.fav[p.id]; save(); draw(); };
      document.getElementById("readBtn").onclick = function () { S.read[p.id] = !S.read[p.id]; if (!S.read[p.id]) delete S.read[p.id]; save(); draw(); };
      document.getElementById("note").addEventListener("input", function (e) { S.notes[p.id] = e.target.value; save(); });
      Array.prototype.forEach.call(root.querySelectorAll(".hl-list button"), function (b) {
        b.onclick = function () { S.hl[p.id].splice(+b.getAttribute("data-i"), 1); save(); draw(); };
      });
    }
    draw();

    /* highlight bằng cách bôi đen */
    var pop = document.createElement("button");
    pop.className = "hl-pop"; pop.textContent = "Highlight"; document.body.appendChild(pop);
    var pending = "";
    document.addEventListener("mouseup", function (e) {
      if (e.target === pop) return;
      setTimeout(function () {
        var sel = window.getSelection(), t = sel ? sel.toString().trim() : "";
        var node = sel && sel.anchorNode && (sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode);
        if (t.length >= 3 && t.indexOf("\n") < 0 && node && node.closest && node.closest(".reading")) {
          var r = sel.getRangeAt(0).getBoundingClientRect();
          pending = t;
          pop.style.display = "block";
          pop.style.top = (window.scrollY + r.top - 44) + "px";
          pop.style.left = Math.max(8, window.scrollX + r.left) + "px";
        } else { pop.style.display = "none"; pending = ""; }
      }, 0);
    });
    pop.addEventListener("mousedown", function (e) { e.preventDefault(); });
    pop.addEventListener("click", function () {
      if (!pending) return;
      S.hl[p.id] = S.hl[p.id] || [];
      if (S.hl[p.id].indexOf(pending) < 0) S.hl[p.id].push(pending);
      save(); pop.style.display = "none"; pending = ""; window.getSelection().removeAllRanges(); draw();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    if (document.getElementById("grid")) initIndex();
    if (document.getElementById("post")) initPost();
  });
})();
