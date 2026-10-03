document.addEventListener("DOMContentLoaded", function () {
  if (!window.mermaid) return;

  // Diagrams use class "mermaid-diagram" (not mermaid's own auto-detected
  // "mermaid" class) and are rendered manually here, exactly once. Mermaid's
  // built-in startOnLoad auto-render races its own DOMContentLoaded listener
  // against an immediate synchronous check of document.readyState when the
  // script is loaded after the DOM is already parsed (as extra_javascript
  // does) — it can fire twice, with the second pass trying to re-parse the
  // first pass's rendered SVG output as mermaid source, breaking every
  // diagram with "No diagram type detected" / "Syntax error in text". Never
  // rely on startOnLoad here; always render manually via this class instead.
  mermaid.initialize({ startOnLoad: false });

  var diagrams = document.querySelectorAll(".mermaid-diagram");
  diagrams.forEach(function (el, i) {
    var source = el.textContent;
    mermaid
      .render("mermaid-diagram-" + i, source)
      .then(function (result) {
        el.innerHTML = result.svg;
      })
      .catch(function (err) {
        console.error("Mermaid render failed:", err);
      });
  });
});
